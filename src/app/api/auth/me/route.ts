// API Kiểm tra trạng thái phiên người dùng hiện tại (Get Active Session Info).
// Endpoint: GET /api/auth/me

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/backend/shared/database/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 1. Đọc Cookie session_id từ request tự động gửi lên
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session_id")?.value;

    if (!sessionId) {
      // Chưa đăng nhập
      return NextResponse.json({ authenticated: false, user: null });
    }

    // 2. Truy vấn session từ PostgreSQL kèm theo thông tin User liên kết
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        user: true,
      },
    });

    if (!session) {
      // Phiên đăng nhập không tồn tại (có thể đã bị xóa ở DB)
      return NextResponse.json({ authenticated: false, user: null });
    }

    // 3. KIẾN THỨC BE: KIỂM TRA HẾT HẠN CỦA PHIÊN (SESSION EXPIRATION CHECK)
    // Dù DB vẫn có session nhưng nếu đã quá hạn, ta vẫn coi là không hợp lệ.
    if (session.expiresAt < new Date()) {
      // Thực hiện xóa session quá hạn khỏi cơ sở dữ liệu để giải phóng dung lượng DB.
      await prisma.session.delete({ where: { id: sessionId } });
      
      // Xóa cookie của trình duyệt
      cookieStore.delete("session_id");

      return NextResponse.json({ authenticated: false, user: null });
    }

    // Trả về thông tin người dùng được xác thực an toàn
    return NextResponse.json({
      authenticated: true,
      user: {
        id: session.user.id,
        username: session.user.username,
        displayName: session.user.displayName,
        avatarUrl: session.user.avatarUrl,
        email: session.user.email,
        starBalance: session.user.starBalance,
        starsGifted: session.user.starsGifted,
        starsEarned: session.user.starsEarned,
      },
    });
  } catch (error) {
    console.error("❌ Lỗi API Get Me Session:", error);
    return NextResponse.json(
      { error: "Lỗi kiểm tra phiên đăng nhập!" },
      { status: 500 }
    );
  }
}
