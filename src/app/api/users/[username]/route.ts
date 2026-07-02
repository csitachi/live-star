import { NextResponse } from 'next/server';
import { prisma } from '@/backend/shared/database/prisma';
import { getSessionUser } from '@/backend/shared/middleware/auth';

export const dynamic = 'force-dynamic';

/**
 * API Lấy thông tin chi tiết của một Profile
 * Endpoint: GET /api/users/[username]
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;

    // Truy vấn thông tin công khai của user từ DB
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        displayName: true,
        avatarUrl: true,
        role: true,
        starsGifted: true,
        starsEarned: true,
        starBalance: true, // Cho phép hiển thị để fan thấy độ giàu có hoặc chỉ cho chủ sở hữu? Ta hiển thị công khai để kích thích nạp.
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Không tìm thấy người dùng!' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    console.error('❌ [GET /api/users/[username]] Lỗi:', error.message);
    return NextResponse.json(
      { error: 'Lỗi hệ thống khi tải profile!' },
      { status: 500 }
    );
  }
}
