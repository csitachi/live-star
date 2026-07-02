import { cookies } from 'next/headers';
import { prisma } from '@/backend/shared/database/prisma';

/**
 * Lấy thông tin User hiện tại từ Session cookie
 * 
 * @returns User object nếu đã đăng nhập và session hợp lệ, ngược lại return null
 */
export async function getSessionUser() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('session_id')?.value;

    if (!sessionId) return null;

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { user: true },
    });

    if (!session) return null;

    // Kiểm tra hết hạn session
    if (session.expiresAt < new Date()) {
      // Dọn dẹp session hết hạn
      await prisma.session.delete({ where: { id: sessionId } }).catch(() => {});
      cookieStore.delete('session_id');
      return null;
    }

    return session.user;
  } catch (error) {
    console.error('❌ [Auth Helper] Lỗi getSessionUser:', error);
    return null;
  }
}
