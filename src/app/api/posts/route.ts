import { NextResponse } from 'next/server';
import { getSessionUser } from '@/backend/shared/middleware/auth';
import { postService } from '@/backend/modules/post/post.service';
import { PostType } from '@/generated/client';

export const dynamic = 'force-dynamic';

/**
 * API Tạo Bài Viết Mới
 * Endpoint: POST /api/posts
 */
export async function POST(request: Request) {
  try {
    // 1. Kiểm tra xác thực
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Bạn phải đăng nhập để thực hiện chức năng này!' },
        { status: 401 }
      );
    }

    // 2. Parse body
    const body = await request.json();
    const { content, type, mediaUrl } = body;

    // 3. Validation cơ bản
    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Nội dung bài viết không được trống!' },
        { status: 400 }
      );
    }

    const validTypes: PostType[] = ['STATUS', 'PHOTO', 'VIDEO'];
    if (!type || !validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Loại bài đăng không hợp lệ!' },
        { status: 400 }
      );
    }

    // 4. Tạo bài viết
    const post = await postService.createPost({
      content,
      type,
      mediaUrl,
      authorId: user.id,
    });

    return NextResponse.json({
      success: true,
      message: 'Đăng bài viết thành công!',
      data: post,
    });
  } catch (error: any) {
    console.error('❌ [POST /api/posts] Lỗi:', error.message);
    return NextResponse.json(
      { error: error.message || 'Lỗi hệ thống khi tạo bài đăng!' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
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

    const currentUser = await getSessionUser();
    const currentUserId = currentUser?.id;

    const result = await postService.getGlobalPosts(limit, cursor, currentUserId);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('❌ [GET /api/posts] Lỗi:', error.message);
    return NextResponse.json(
      { error: 'Lỗi hệ thống khi tải bảng tin!' },
      { status: 500 }
    );
  }
}
