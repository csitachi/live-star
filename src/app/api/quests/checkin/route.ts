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

export async function POST() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Chưa đăng nhập!" }, { status: 401 });
    }

    const result = await QuestService.checkIn(user.id);
    return NextResponse.json(result);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Lỗi khi điểm danh!";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
