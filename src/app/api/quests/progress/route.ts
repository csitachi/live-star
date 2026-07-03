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

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Chưa đăng nhập!" }, { status: 401 });
    }

    const body = await request.json();
    const { questType, amount = 1 } = body;

    if (!questType) {
      return NextResponse.json({ error: "Thiếu mã nhiệm vụ (questType)!" }, { status: 400 });
    }

    // Bảo mật: Chỉ cho phép client cập nhật các nhiệm vụ tương tác an toàn (như CHAT_3).
    // Các nhiệm vụ nhạy cảm liên quan đến tài sản/sao (như GIFT_1) phải chạy ở backend/worker.
    if (questType !== "CHAT_3") {
      return NextResponse.json(
        { error: "Nhiệm vụ này không thể cập nhật trực tiếp qua API client!" },
        { status: 400 }
      );
    }

    const quest = await QuestService.incrementProgress(user.id, questType, amount);
    return NextResponse.json({ success: true, quest });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Lỗi cập nhật tiến trình!";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
