import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/backend/shared/database/prisma";

async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value;
  if (!sessionId) return null;

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    return null;
  }
  return session.user;
}

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Chưa đăng nhập!" }, { status: 401 });
    }

    // 1. Lấy thông tin số dư hiện tại của User
    const userStats = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        starBalance: true,
        displayName: true,
        avatarUrl: true,
      },
    });

    if (!userStats) {
      return NextResponse.json({ error: "Người dùng không tồn tại!" }, { status: 404 });
    }

    // 2. Aggregate thống kê tổng nạp, tổng chi quà, tổng nhận từ live
    const aggregates = await prisma.starLedger.groupBy({
      by: ["type"],
      where: { userId: user.id },
      _sum: {
        amount: true,
      },
    });

    let totalRecharged = 0;
    let totalGiftSent = 0;
    let totalGiftReceived = 0;

    for (const agg of aggregates) {
      const sumVal = agg._sum.amount || 0;
      if (agg.type === "RECHARGE") {
        totalRecharged = sumVal;
      } else if (agg.type === "GIFT_SENT" || agg.type === "FILTER_BOMB") {
        totalGiftSent += Math.abs(sumVal);
      } else if (agg.type === "GIFT_RECEIVED") {
        totalGiftReceived = sumVal;
      }
    }

    // 3. Lấy dữ liệu biến động sao 30 ngày gần đây cho biểu đồ
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const recentLedgers = await prisma.starLedger.findMany({
      where: {
        userId: user.id,
        createdAt: { gte: thirtyDaysAgo },
      },
      select: {
        amount: true,
        createdAt: true,
      },
      orderBy: { createdAt: "asc" },
    });

    // Gom nhóm trong Javascript (database-agnostic)
    const chartMap = new Map<string, { date: string; in: number; out: number }>();
    
    // Khởi tạo trước 30 ngày bằng 0 để biểu đồ hiển thị liên tục
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
      chartMap.set(dateStr, { date: dateStr, in: 0, out: 0 });
    }

    for (const item of recentLedgers) {
      const dateStr = item.createdAt.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
      const entry = chartMap.get(dateStr) || { date: dateStr, in: 0, out: 0 };
      if (item.amount > 0) {
        entry.in += item.amount;
      } else {
        entry.out += Math.abs(item.amount);
      }
      chartMap.set(dateStr, entry);
    }

    const chartData = Array.from(chartMap.values());

    // 4. Lấy cơ cấu nguồn sao nhận được (Donut chart nguồn sao)
    const positiveAgg = await prisma.starLedger.groupBy({
      by: ["type"],
      where: {
        userId: user.id,
        amount: { gt: 0 },
      },
      _sum: {
        amount: true,
      },
    });

    const typeLabels: Record<string, string> = {
      RECHARGE: "Nạp tiền",
      GIFT_RECEIVED: "Nhận quà Live",
      QUEST_REWARD: "Nhiệm vụ",
      CHEST_CLAIM: "Giật rương",
      PREDICTION_WIN: "Thắng cược",
      PREDICTION_REFUND: "Hoàn cược",
    };

    const donutData = positiveAgg
      .map((agg) => ({
        type: agg.type,
        label: typeLabels[agg.type] || agg.type,
        value: agg._sum.amount || 0,
      }))
      .filter((d) => d.value > 0);

    return NextResponse.json({
      success: true,
      data: {
        balance: userStats.starBalance,
        displayName: userStats.displayName,
        avatarUrl: userStats.avatarUrl,
        totalRecharged,
        totalGiftSent,
        totalGiftReceived,
        chartData,
        donutData,
      },
    }, {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      }
    });
  } catch (error: any) {
    console.error("❌ Error in GET /api/dashboard/wallet:", error);
    return NextResponse.json({ error: error.message || "Lỗi hệ thống!" }, { status: 500 });
  }
}
