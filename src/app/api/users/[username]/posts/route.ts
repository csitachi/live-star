import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { postService } from '@/backend/services/post.service';

export const dynamic = 'force-dynamic';

/**
 * API Lấy danh sách bài đăng của một profile (Cursor-based Pagination)
 * Endpoint: GET /api/users/[username]/posts
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;
    const { searchParams } = new URL(request.url);

    const limitStr = searchParams.get('limit') || '10';
    const cursor = searchParams.get('cursor') || undefined;

    const limit = parseInt(limitStr, 10);
    if (isNaN(limit) || limit <= 0) {
      return NextResponse.json(
        { error: 'Tham số limit không hợp lệ!' },
        { status: 400 }
      );
    }

    // Lấy thông tin user hiện tại (nếu đã đăng nhập) để kiểm tra xem đã like bài đăng chưa
    const currentUser = await getSessionUser();
    const currentUserId = currentUser?.id;

    const result = await postService.getProfilePosts(username, limit, cursor, currentUserId);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('❌ [GET /api/users/[username]/posts] Lỗi:', error.message);
    return NextResponse.json(
      { error: error.message || 'Lỗi hệ thống khi tải bài viết!' },
      { status: 500 }
    );
  }
}
