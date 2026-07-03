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

export async function GET(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Chưa đăng nhập!" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "20";
    const type = searchParams.get("type") || "ALL";
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const where: any = { userId: user.id };

    // Lọc theo loại giao dịch
    if (type !== "ALL") {
      if (type === "SPEND") {
        where.amount = { lt: 0 };
      } else if (type === "RECEIVE") {
        where.amount = { gt: 0 };
      } else {
        where.type = type;
      }
    }

    // Lọc theo ngày bắt đầu và kết thúc
    if (from || to) {
      where.createdAt = {};
      if (from) {
        const fromDate = new Date(from);
        fromDate.setHours(0, 0, 0, 0);
        where.createdAt.gte = fromDate;
      }
      if (to) {
        const toDate = new Date(to);
        toDate.setHours(23, 59, 59, 999);
        where.createdAt.lte = toDate;
      }
    }

    // Thực hiện truy vấn song song lấy tổng số dòng và danh sách phân trang
    const [transactions, total] = await prisma.$transaction([
      prisma.starLedger.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limitNum,
      }),
      prisma.starLedger.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        transactions,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum),
        },
      },
    }, {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      }
    });
  } catch (error: any) {
    console.error("❌ Error in GET /api/dashboard/transactions:", error);
    return NextResponse.json({ error: error.message || "Lỗi hệ thống!" }, { status: 500 });
  }
}
