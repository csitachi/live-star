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
    const { streamId } = body;

    if (!streamId) {
      return NextResponse.json({ error: "Thiếu ID phòng livestream!" }, { status: 400 });
    }

    // Bảo mật: Xác thực xem phòng stream có đang LIVE thực sự hay không để tránh hack ping
    const stream = await prisma.stream.findUnique({
      where: { id: streamId },
      select: { status: true },
    });

    if (!stream || stream.status !== "LIVE") {
      return NextResponse.json(
        { error: "Phòng livestream đã kết thúc hoặc không tồn tại!" },
        { status: 400 }
      );
    }

    // Cộng dồn 1 phút xem live cho các nhiệm vụ WATCH_5 và WATCH_15
    const q5 = await QuestService.incrementProgress(user.id, "WATCH_5", 1);
    const q15 = await QuestService.incrementProgress(user.id, "WATCH_15", 1);

    return NextResponse.json({ success: true, q5, q15 });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Lỗi cập nhật thời gian xem!";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
