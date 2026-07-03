import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/backend/shared/database/prisma";
import { getTodayDateString } from "@/backend/modules/quest/quest.service";
import { verifyJWT } from "@/backend/shared/security/jwt";

async function isAuthorized() {
  const secret = process.env.BACKOFFICE_SECRET || "livestar-backoffice-dev-2026";
  const cookieStore = await cookies();
  const token = cookieStore.get("backoffice_token")?.value;
  if (!token) return false;

  const payload = verifyJWT(token, secret);
  return payload?.role === "backoffice_admin";
}

export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Không có quyền truy cập!" }, { status: 401 });
  }

  try {
    const todayStr = getTodayDateString();

    // 1. Lấy tất cả định nghĩa nhiệm vụ
    const definitions = await prisma.questDefinition.findMany({
      orderBy: { questType: "asc" },
    });

    // 2. Thống kê tiến trình làm nhiệm vụ của ngày hôm nay
    const stats = await prisma.userQuest.groupBy({
      by: ["questType", "isCompleted", "isClaimed"],
      where: { date: todayStr },
      _count: {
        id: true,
      },
    });

    return NextResponse.json({ definitions, stats });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Lỗi hệ thống!";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Không có quyền truy cập!" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { questType, title, description, target, rewardStars, isActive } = body;

    if (!questType) {
      return NextResponse.json({ error: "Thiếu mã nhiệm vụ (questType)!" }, { status: 400 });
    }

    const updated = await prisma.questDefinition.update({
      where: { questType },
      data: {
        title,
        description,
        target: target !== undefined ? parseInt(target, 10) : undefined,
        rewardStars: rewardStars !== undefined ? parseInt(rewardStars, 10) : undefined,
        isActive,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Lỗi hệ thống!";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
