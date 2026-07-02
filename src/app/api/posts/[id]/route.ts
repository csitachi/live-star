import { NextResponse } from 'next/server';
import { getSessionUser } from '@/backend/shared/middleware/auth';
import { postService } from '@/backend/modules/post/post.service';

/**
 * API Xóa Bài Viết
 * Endpoint: DELETE /api/posts/[id]
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postId } = await params;

    // 1. Kiểm tra xác thực
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Bạn phải đăng nhập để thực hiện chức năng này!' },
        { status: 401 }
      );
    }

    // 2. Thực hiện xóa
    await postService.deletePost(postId, user.id);

    return NextResponse.json({
      success: true,
      message: 'Xóa bài viết thành công!',
    });
  } catch (error: any) {
    console.error(`❌ [DELETE /api/posts/${error.message}] Lỗi:`, error.message);
    return NextResponse.json(
      { error: error.message || 'Lỗi hệ thống khi xóa bài viết!' },
      { status: 500 }
    );
  }
}
