import { NextResponse } from 'next/server';
import { getSessionUser } from '@/backend/shared/middleware/auth';
import { commentService } from '@/backend/modules/post/comment.service';

export const dynamic = 'force-dynamic';

/**
 * API Lấy danh sách bình luận (GET) & Thêm bình luận mới (POST)
 * Endpoint: /api/posts/[id]/comments
 */

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postId } = await params;
    const { searchParams } = new URL(request.url);

    const limitStr = searchParams.get('limit') || '20';
    const cursor = searchParams.get('cursor') || undefined;

    const limit = parseInt(limitStr, 10);
    if (isNaN(limit) || limit <= 0) {
      return NextResponse.json(
        { error: 'Tham số limit không hợp lệ!' },
        { status: 400 }
      );
    }

    const result = await commentService.getPostComments(postId, limit, cursor);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('❌ [GET /api/posts/[id]/comments] Lỗi:', error.message);
    return NextResponse.json(
      { error: error.message || 'Lỗi hệ thống khi tải bình luận!' },
      { status: 500 }
    );
  }
}

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
        { error: 'Bạn phải đăng nhập để bình luận!' },
        { status: 401 }
      );
    }

    // 2. Parse body
    const body = await request.json();
    const { content } = body;

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Nội dung bình luận không được trống!' },
        { status: 400 }
      );
    }

    // 3. Tạo comment
    const comment = await commentService.createComment({
      postId,
      authorId: user.id,
      content,
    });

    return NextResponse.json({
      success: true,
      message: 'Đăng bình luận thành công!',
      data: comment,
    });
  } catch (error: any) {
    console.error('❌ [POST /api/posts/[id]/comments] Lỗi:', error.message);
    return NextResponse.json(
      { error: error.message || 'Lỗi hệ thống khi gửi bình luận!' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get('commentId');

    if (!commentId) {
      return NextResponse.json(
        { error: 'Thiếu tham số commentId!' },
        { status: 400 }
      );
    }

    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Bạn phải đăng nhập để thực hiện!' },
        { status: 401 }
      );
    }

    await commentService.deleteComment(commentId, user.id);

    return NextResponse.json({
      success: true,
      message: 'Xóa bình luận thành công!',
    });
  } catch (error: any) {
    console.error('❌ [DELETE /api/posts/[id]/comments] Lỗi:', error.message);
    return NextResponse.json(
      { error: error.message || 'Lỗi hệ thống khi xóa bình luận!' },
      { status: 500 }
    );
  }
}
