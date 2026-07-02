// API Đăng xuất (Logout API).
// Endpoint: POST /api/auth/logout

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/backend/shared/database/prisma";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session_id")?.value;

    // 1. Xóa bản ghi session khỏi DB nếu có
    if (sessionId) {
      await prisma.session.delete({
        where: { id: sessionId },
      }).catch(() => {
        // Bắt lỗi nếu session đã bị xóa trước đó để tránh dừng chương trình
      });
    }

    // 2. Xóa Cookie session_id ở Client bằng cách thiết lập Max-Age = 0
    cookieStore.delete("session_id");

    return NextResponse.json({
      success: true,
      message: "Đăng xuất thành công!",
    });
  } catch (error) {
    console.error("❌ Lỗi API Logout:", error);
    return NextResponse.json(
      { error: "Lỗi xử lý đăng xuất!" },
      { status: 500 }
    );
  }
}
