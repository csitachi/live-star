// API xử lý Đăng ký tài khoản bằng Username & Password.
// Endpoint: POST /api/auth/register

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/backend/shared/database/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password, displayName } = body;

    // 1. KIỂM TRA BẮT BUỘC ĐẦU VÀO
    if (!username || !password || !displayName) {
      return NextResponse.json(
        { error: "Vui lòng nhập đầy đủ thông tin: Tên đăng nhập, Mật khẩu và Tên hiển thị!" },
        { status: 400 }
      );
    }

    // 2. XÁC THỰC ĐỊNH DẠNG USERNAME (INPUT VALIDATION)
    // Tên đăng nhập: 3-20 ký tự, chỉ chứa chữ cái, chữ số và dấu gạch dưới
    const trimmedUsername = username.trim().toLowerCase();
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(trimmedUsername)) {
      return NextResponse.json(
        { error: "Tên đăng nhập từ 3-20 ký tự, không chứa dấu cách hoặc ký tự đặc biệt (chỉ cho phép chữ, số và dấu gạch dưới)!" },
        { status: 400 }
      );
    }

    // 3. XÁC THỰC ĐỊNH DẠNG PASSWORD (PASSWORD COMPLEXITY)
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Mật khẩu phải có độ dài tối thiểu là 6 ký tự!" },
        { status: 400 }
      );
    }

    // 4. XÁC THỰC TÊN HIỂN THỊ
    const trimmedDisplayName = displayName.trim();
    if (trimmedDisplayName.length < 2 || trimmedDisplayName.length > 50) {
      return NextResponse.json(
        { error: "Tên hiển thị phải dài từ 2 đến 50 ký tự!" },
        { status: 400 }
      );
    }

    // 5. KIỂM TRA TRÙNG LẶP USERNAME TRONG CƠ SỞ DỮ LIỆU
    // Dữ liệu được tìm kiếm an toàn qua Parameterized Query của Prisma
    const existingUser = await prisma.user.findUnique({
      where: { username: trimmedUsername },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Tên đăng nhập này đã tồn tại trong hệ thống. Vui lòng chọn tên khác!" },
        { status: 400 }
      );
    }

    // 6. MÃ HÓA MẬT KHẨU (PASSWORD HASHING)
    // Salt rounds = 10 đảm bảo thời gian mã hóa đủ lâu để chống Brute Force bằng phần cứng mà không làm nghẽn CPU server.
    const passwordHash = await bcrypt.hash(password, 10);

    // 7. CHỌN ẢNH ĐẠI DIỆN MẶC ĐỊNH NGẪU NHIÊN CHO USER MỚI
    const defaultAvatars = [
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
    ];
    const avatarUrl = defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];

    // 8. LƯU THÔNG TIN USER MỚI VÀO DATABASE
    const newUser = await prisma.user.create({
      data: {
        username: trimmedUsername,
        passwordHash: passwordHash,
        displayName: trimmedDisplayName,
        avatarUrl: avatarUrl,
        starBalance: 1000, // Tặng sẵn 1000 sao trải nghiệm ban đầu
      },
    });

    console.log(`🆕 Đã đăng ký thành công người dùng mới: ${newUser.username}`);

    // 9. TẠO PHIÊN ĐĂNG NHẬP (SESSION)
    const sessionExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 ngày
    const session = await prisma.session.create({
      data: {
        userId: newUser.id,
        expiresAt: sessionExpiry,
      },
    });

    // 10. THIẾT LẬP COOKIE AN TOÀN (HTTP-ONLY)
    const cookieStore = await cookies();
    cookieStore.set("session_id", session.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: sessionExpiry,
      sameSite: "strict",
      path: "/",
    });

    // Trả về thông tin an toàn (loại bỏ passwordHash)
    return NextResponse.json({
      success: true,
      message: "Đăng ký tài khoản thành công!",
      user: {
        id: newUser.id,
        username: newUser.username,
        displayName: newUser.displayName,
        avatarUrl: newUser.avatarUrl,
        role: newUser.role,
        starBalance: newUser.starBalance,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error("❌ Lỗi API Register:", error);
    return NextResponse.json(
      { error: "Lỗi xử lý đăng ký tài khoản trên máy chủ!" },
      { status: 500 }
    );
  }
}
