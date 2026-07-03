import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/backend/shared/database/prisma";
import { QuestService } from "@/backend/modules/quest/quest.service";

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

    const quests = await QuestService.getOrCreateTodayQuests(user.id);
    return NextResponse.json({ quests });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Lỗi tải danh sách nhiệm vụ!";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Chưa đăng nhập!" }, { status: 401 });
    }

    const body = await request.json();
    const { questType } = body;

    if (!questType) {
      return NextResponse.json({ error: "Thiếu mã nhiệm vụ (questType)!" }, { status: 400 });
    }

    const result = await QuestService.claimReward(user.id, questType);
    return NextResponse.json(result);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Lỗi khi nhận thưởng!";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
