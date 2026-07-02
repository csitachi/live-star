// API xử lý Đăng nhập bằng Username & Password.
// Endpoint: POST /api/auth/login

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/backend/shared/database/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // 1. KIỂM TRA ĐẦU VÀO CƠ BẢN
    if (!username || !password) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ tên đăng nhập và mật khẩu!" },
        { status: 400 }
      );
    }

    const trimmedUsername = username.trim().toLowerCase();

    // 2. TRUY VẤN NGƯỜI DÙNG TRONG DATABASE
    // Sử dụng Parameterized Query an toàn chống SQL Injection qua Prisma ORM.
    const user = await prisma.user.findUnique({
      where: { username: trimmedUsername },
    });

    // 3. XÁC THỰC MẬT KHẨU
    // Cảnh báo: Kẻ tấn công có thể lợi dụng sự khác biệt về thông báo lỗi (ví dụ: "Tài khoản không tồn tại" vs "Sai mật khẩu") 
    // để dò quét (Username Enumeration) danh sách tên đăng nhập hợp lệ.
    // BIỆN PHÁP BẢO MẬT: Sử dụng chung một thông báo lỗi duy nhất "Tên đăng nhập hoặc mật khẩu không chính xác"
    // cho tất cả các trường hợp thất bại.
    if (!user || !user.passwordHash) {
      // Trường hợp user không tồn tại hoặc user đó chỉ có tài khoản Google (không có mật khẩu)
      return NextResponse.json(
        { error: "Tên đăng nhập hoặc mật khẩu không chính xác." },
        { status: 401 }
      );
    }

    // So sánh mật khẩu băm (Bcrypt so sánh plaintext password với chuỗi hash đã lưu)
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Tên đăng nhập hoặc mật khẩu không chính xác." },
        { status: 401 }
      );
    }

    // 4. KHỞI TẠO PHIÊN ĐĂNG NHẬP (DATABASE SESSION)
    const sessionExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 ngày
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        expiresAt: sessionExpiry,
      },
    });

    // 5. THIẾT LẬP COOKIE AN TOÀN (HTTP-ONLY)
    // - httpOnly: Ngăn Javascript của Client đọc cookie (Chống XSS đánh cắp Session ID).
    // - secure: Chỉ truyền cookie qua HTTPS trên môi trường Production.
    // - sameSite: "strict" để tránh hoàn toàn tấn công CSRF.
    const cookieStore = await cookies();
    cookieStore.set("session_id", session.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: sessionExpiry,
      sameSite: "strict",
      path: "/",
    });

    console.log(`🔓 Người dùng đăng nhập thành công bằng mật khẩu: ${user.username}`);

    // Trả về thông tin an toàn của User (loại bỏ passwordHash)
    return NextResponse.json({
      success: true,
      message: "Đăng nhập thành công!",
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        role: user.role,
        starBalance: user.starBalance,
      },
    });
  } catch (error) {
    console.error("❌ Lỗi API Login:", error);
    return NextResponse.json(
      { error: "Lỗi xử lý đăng nhập trên máy chủ!" },
      { status: 500 }
    );
  }
}
