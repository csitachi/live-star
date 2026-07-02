// API xử lý Đăng nhập giả lập (Mock Session API).
// Ở dự án này, để đơn giản và tập trung vào nghiệp vụ Livestream, ta sẽ cho phép người dùng
// tự chọn một tài khoản từ DB (Alice, Bob, Charlie) để đăng nhập và lưu trạng thái vào cookie/localStorage.

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

/**
 * GET: Lấy thông tin tài khoản hiện tại từ database bằng ID.
 * Điều này mô phỏng việc xác thực JWT/Session ở các dự án thực tế.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // Nếu không truyền userId, mặc định trả về danh sách Top 5 KOL nhận nhiều sao nhất
    if (!userId) {
      const topKOLs = await prisma.user.findMany({
        orderBy: {
          starsEarned: "desc",
        },
        take: 5,
      });
      return NextResponse.json(topKOLs);
    }

    // Truy vấn thông tin người dùng từ PostgreSQL
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Không tìm thấy người dùng này!" },
        { status: 404 } // Not Found
      );
    }

    // Trả về dữ liệu người dùng (bao gồm số dư sao cập nhật mới nhất)
    return NextResponse.json(user);
  } catch (error) {
    console.error("❌ Lỗi API Get Auth:", error);
    return NextResponse.json(
      { error: "Lỗi máy chủ nội bộ!" },
      { status: 500 } // Internal Server Error
    );
  }
}

/**
 * POST: Cho phép đăng nhập/lựa chọn một User bằng username.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username } = body;

    // KIẾN THỨC BẢO MẬT: CHỐNG SQL INJECTION
    // Tên đăng nhập được truyền thẳng vào Prisma query.
    // Prisma tự động tham số hóa tên đăng nhập (Parameterized query) để ngăn chặn kẻ tấn công chèn mã độc dạng:
    // `username: "' OR '1'='1"`
    if (!username || typeof username !== "string") {
      return NextResponse.json(
        { error: "Tên đăng nhập không hợp lệ!" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { username: username.trim().toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Tên đăng nhập không tồn tại!" },
        { status: 401 } // Unauthorized - Không đúng tài khoản
      );
    }

    // TẠO PHIÊN ĐĂNG NHẬP (SESSION) TRONG DB CHO PROFILE CHUYỂN ĐỔI
    const sessionExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        expiresAt: sessionExpiry,
      }
    });

    // SET HTTP-ONLY COOKIE CHO TRÌNH DUYỆT
    const cookieStore = await cookies();
    cookieStore.set("session_id", session.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: sessionExpiry,
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("❌ Lỗi API Post Auth:", error);
    return NextResponse.json(
      { error: "Lỗi xử lý yêu cầu!" },
      { status: 500 }
    );
  }
}
