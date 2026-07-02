import { NextResponse } from 'next/server';
import { getSessionUser } from '@/backend/shared/middleware/auth';
import { likeService } from '@/backend/modules/post/like.service';

/**
 * API Thích/Bỏ thích bài đăng (Toggle Like)
 * Endpoint: POST /api/posts/[id]/like
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postId } = await params;

    // 1. Kiểm tra xác thực
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Bạn phải đăng nhập để thích bài viết này!' },
        { status: 401 }
      );
    }

    // 2. Thực hiện toggle like
    const result = await likeService.toggleLike(postId, user.id);

    return NextResponse.json({
      success: true,
      message: result.isLiked ? 'Đã thích bài viết!' : 'Đã bỏ thích bài viết!',
      data: result,
    });
  } catch (error: any) {
    console.error('❌ [POST /api/posts/[id]/like] Lỗi:', error.message);
    return NextResponse.json(
      { error: error.message || 'Lỗi hệ thống khi like bài viết!' },
      { status: 500 }
    );
  }
}
