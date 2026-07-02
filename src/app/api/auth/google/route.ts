// API xử lý đăng nhập bằng Google (Google OAuth2 API).
// Endpoint: POST /api/auth/google

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { OAuth2Client } from "google-auth-library";
import { prisma } from "@/lib/prisma";

// Khởi tạo OAuth2 Client của Google bằng Client ID
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { idToken, isSandbox } = body;

    let googleUser = {
      googleId: "",
      email: "",
      displayName: "",
      avatarUrl: "",
    };

    // ==========================================
    // 1. KIẾN THỨC BẢO MẬT & CHẾ ĐỘ SANDBOX
    // ==========================================
    // Chế độ Sandbox cho phép chạy thử nghiệm giả lập đăng nhập Google không cần Client ID thật.
    if (isSandbox === true) {
      console.log("🛠️ Đang đăng nhập bằng Google Sandbox Mode...");
      googleUser = {
        googleId: "sandbox_google_id_101",
        email: "sandbox@google.com",
        displayName: "Google Sandbox 👤",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      };
    } else {
      // ĐĂNG NHẬP GOOGLE THỰC TẾ
      if (!GOOGLE_CLIENT_ID) {
        return NextResponse.json(
          { error: "Biến môi trường NEXT_PUBLIC_GOOGLE_CLIENT_ID chưa được thiết lập!" },
          { status: 500 }
        );
      }

      if (!idToken) {
        return NextResponse.json(
          { error: "Không nhận được ID Token từ Client!" },
          { status: 400 }
        );
      }

      // ==========================================
      // 2. KIẾN THỨC BẢO MẬT: XÁC THỰC ID TOKEN TRÊN BACKEND (VERY IMPORTANT)
      // ==========================================
      // Khi người dùng đăng nhập Google ở Frontend, Google sẽ trả về một chuỗi JWT ID Token.
      // NGUY CƠ: Client có thể gửi một token giả mạo chứa thông tin email tự chế để đăng nhập làm bất kỳ ai.
      // GIẢI PHÁP: Phía Backend BẮT BUỘC phải xác thực token này với Google.
      // Lệnh `verifyIdToken` sẽ:
      //   - Tải về và xác minh Signature (chữ ký số) của Google để chứng minh token này do chính Google phát hành.
      //   - Kiểm tra xem Token đã hết hạn chưa (Expired).
      //   - Kiểm tra Audience (aud): Token phải được cấp riêng cho Client ID của dự án này, tránh việc hacker lấy token của dự án khác để vượt qua xác thực.
      const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) {
        return NextResponse.json(
          { error: "Mã token Google không hợp lệ!" },
          { status: 400 }
        );
      }

      googleUser = {
        googleId: payload.sub, // ID duy nhất của người dùng Google
        email: payload.email || "",
        displayName: payload.name || "Google User",
        avatarUrl: payload.picture || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      };
    }

    if (!googleUser.email) {
      return NextResponse.json(
        { error: "Tài khoản Google cần phải có email!" },
        { status: 400 }
      );
    }

    // ==========================================
    // 3. ĐĂNG KÝ HOẶC ĐĂNG NHẬP (UPSERT USER IN DB)
    // ==========================================
    // Tìm xem người dùng đã tồn tại trong Postgres chưa (qua googleId hoặc email).
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { googleId: googleUser.googleId },
          { email: googleUser.email }
        ]
      }
    });

    if (!user) {
      // Tạo tài khoản mới tự động (Sign up)
      // Tạo tên đăng nhập tự động dựa trên email
      const generatedUsername = googleUser.email.split("@")[0] + "_" + Math.floor(Math.random() * 1000);
      user = await prisma.user.create({
        data: {
          username: generatedUsername.toLowerCase(),
          displayName: googleUser.displayName,
          avatarUrl: googleUser.avatarUrl,
          email: googleUser.email,
          googleId: googleUser.googleId,
          starBalance: 1000, // Tặng sẵn 1000 sao trải nghiệm
        }
      });
      console.log(`🆕 Đã đăng ký thành viên mới qua Google: ${user.displayName}`);
    } else {
      // Cập nhật lại thông tin mới nhất từ Google (Sign in)
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          displayName: googleUser.displayName,
          avatarUrl: googleUser.avatarUrl,
          // Cập nhật googleId nếu trước đó họ đăng ký thủ công nhưng giờ liên kết Google
          googleId: user.googleId ? undefined : googleUser.googleId,
        }
      });
      console.log(`🔓 Thành viên đăng nhập qua Google: ${user.displayName}`);
    }

    // ==========================================
    // 4. TẠO PHIÊN ĐĂNG NHẬP MỚI (DATABASE SESSION)
    // ==========================================
    const sessionExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Hết hạn sau 7 ngày
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        expiresAt: sessionExpiry,
      }
    });

    // ==========================================
    // 5. KIẾN THỨC BẢO MẬT: THIẾT LẬP COOKIE AN TOÀN (HTTP-ONLY COOKIES)
    // ==========================================
    // Ghi session_id vào Cookie trình duyệt.
    // Các thuộc tính quan trọng:
    //   - httpOnly: true -> Cấm JavaScript truy cập cookie này (Chống ăn cắp session qua lỗi XSS).
    //   - secure: true -> Chỉ truyền cookie qua giao thức mã hóa HTTPS (chống nghe lén).
    //   - sameSite: "strict" -> Cookie chỉ gửi đi khi truy cập cùng tên miền (Ngăn chặn hoàn toàn tấn công CSRF).
    const cookieStore = await cookies();
    cookieStore.set("session_id", session.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: sessionExpiry,
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "Đăng nhập thành công!",
      user
    });
  } catch (error: any) {
    console.error("❌ Lỗi API Google Auth:", error);
    return NextResponse.json(
      { error: error?.message || "Đăng nhập bằng Google thất bại!" },
      { status: 500 }
    );
  }
}
