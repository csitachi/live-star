import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { redis } from "@/backend/shared/cache/redis";
import { signJWT } from "@/backend/shared/security/jwt";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
  const blockKey = `backoffice:bruteforce:block:${ip}`;
  const attemptsKey = `backoffice:bruteforce:attempts:${ip}`;

  try {
    // 1. KIỂM TRA BỊ KHÓA (REDIS BRUTE-FORCE PROTECTION)
    const isBlocked = await redis.get(blockKey);
    if (isBlocked) {
      return NextResponse.json(
        { error: "Bạn đã đăng nhập sai quá nhiều lần. Vui lòng thử lại sau 15 phút!" },
        { status: 429 } // Too Many Requests
      );
    }

    const { secretKey } = await request.json();
    const secret = process.env.BACKOFFICE_SECRET || "livestar-backoffice-dev-2026";

    // 2. SO SÁNH ĐỒNG THÌ (CONSTANT-TIME PASSWORD COMPARISON)
    // Tránh lỗ hổng Timing Attack bằng cách băm SHA-256 rồi dùng crypto.timingSafeEqual
    const hashInput = crypto.createHash("sha256").update(secretKey || "").digest();
    const hashSecret = crypto.createHash("sha256").update(secret).digest();
    const isMatch = crypto.timingSafeEqual(hashInput, hashSecret);

    if (isMatch) {
      // Đăng nhập thành công -> Xóa bộ đếm sai của IP này
      await redis.del(attemptsKey);

      // Tạo JWT tự ký với thời hạn 1 giờ
      const payload = {
        role: "backoffice_admin",
        exp: Math.floor(Date.now() / 1000) + 3600, // 1 giờ
      };
      const token = signJWT(payload, secret);

      const cookieStore = await cookies();
      cookieStore.set("backoffice_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60, // 1 giờ
        path: "/",
        sameSite: "lax",
      });

      return NextResponse.json({ success: true });
    }

    // 3. ĐĂNG NHẬP THẤT BẠI -> TĂNG TIẾN TRÌNH KHÓA IP
    const attempts = await redis.incr(attemptsKey);
    if (attempts === 1) {
      await redis.expire(attemptsKey, 600); // 10 phút lưu trữ bộ đếm
    }

    if (attempts >= 5) {
      // Sai 5 lần liên tiếp -> Khóa IP 15 phút
      await redis.set(blockKey, "1", "EX", 900);
      await redis.del(attemptsKey);
      return NextResponse.json(
        { error: "Đăng nhập sai quá 5 lần. IP của bạn đã bị khóa 15 phút!" },
        { status: 429 }
      );
    }

    // Làm trễ phản hồi (Artificial Delay) 1.2 giây để làm chậm hành vi Brute-force tự động
    await new Promise((resolve) => setTimeout(resolve, 1200));

    return NextResponse.json(
      { error: `Mã bảo mật BackOffice không chính xác! (Còn ${5 - attempts} lượt thử)` },
      { status: 401 }
    );
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Lỗi hệ thống!";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("backoffice_token");
  return NextResponse.json({ success: true });
}
