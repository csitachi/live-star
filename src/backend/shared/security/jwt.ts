import crypto from "crypto";

export interface JWTPayload {
  role: string;
  exp?: number;
  [key: string]: unknown;
}

/**
 * Tạo token JWT tự ký bằng thuật toán HS256 sử dụng thư viện crypto nội bộ.
 */
export function signJWT(payload: JWTPayload, secret: string): string {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64url");
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");

  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64url");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Xác minh chữ ký JWT và kiểm tra thời gian hết hạn.
 * Trả về payload giải mã nếu hợp lệ, hoặc null nếu không hợp lệ.
 */
export function verifyJWT(token: string, secret: string): JWTPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, signature] = parts;

    // Tính toán lại chữ ký để đối chiếu
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest("base64url");

    // KIẾN THỨC BẢO MẬT: CHỐNG TIMING ATTACK QUA CHỮ KÝ JWT
    const signatureBuffer = Buffer.from(signature);
    const expectedSignatureBuffer = Buffer.from(expectedSignature);

    if (signatureBuffer.length !== expectedSignatureBuffer.length) {
      return null;
    }

    if (!crypto.timingSafeEqual(signatureBuffer, expectedSignatureBuffer)) {
      return null;
    }

    // Giải mã Payload
    const payloadJson = Buffer.from(encodedPayload, "base64url").toString("utf-8");
    const payload = JSON.parse(payloadJson) as JWTPayload;

    // Kiểm tra thời hạn hết hạn (exp)
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      return null; // Token đã quá hạn
    }

    return payload;
  } catch (error) {
    console.error("❌ [JWT Verification Error]:", error);
    return null;
  }
}
