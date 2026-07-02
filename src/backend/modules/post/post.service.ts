import { prisma } from '@/backend/shared/database/prisma';
import { storageService } from '@/backend/modules/storage/storage.service';
import { PostType } from '@/generated/client';

export class PostService {
  /**
   * Tạo bài viết mới
   */
  async createPost(data: {
    content: string;
    type: PostType;
    mediaUrl?: string;
    authorId: string;
  }) {
    const { content, type, mediaUrl, authorId } = data;

    if (!content || content.trim().length === 0) {
      throw new Error('Nội dung bài viết không được trống!');
    }

    if (type !== 'STATUS' && !mediaUrl) {
      throw new Error('Bài viết dạng hình ảnh/video cần có đường dẫn tệp phương tiện!');
    }

    return prisma.post.create({
      data: {
        content: content.trim(),
        type,
        mediaUrl: mediaUrl || null,
        authorId,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
          },
        },
      },
    });
  }

  /**
   * Xóa bài viết (chỉ cho phép tác giả bài viết xóa)
   */
  async deletePost(postId: string, userId: string) {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new Error('Bài viết không tồn tại!');
    }

    if (post.authorId !== userId) {
      throw new Error('Bạn không có quyền xóa bài viết này!');
    }

    // Xóa file đính kèm nếu có
    if (post.mediaUrl) {
      await storageService.deleteFile(post.mediaUrl);
    }

    // Xóa bài viết khỏi cơ sở dữ liệu (likes và comments tự động Cascade delete)
    await prisma.post.delete({
      where: { id: postId },
    });

    return { success: true };
  }

  /**
   * Lấy feed bài viết của một Profile (hỗ trợ cursor-based pagination)
   */
  async getProfilePosts(username: string, limit = 10, cursor?: string, currentUserId?: string) {
    // 1. Tìm ID của user từ username
    const user = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    if (!user) {
      throw new Error('Không tìm thấy người dùng!');
    }

    const whereClause: any = { authorId: user.id };

    // 2. Xử lý Cursor pagination
    if (cursor) {
      // Định dạng cursor: "ISOStringTimestamp_postId"
      const parts = cursor.split('_');
      if (parts.length === 2) {
        const cursorDate = new Date(parts[0]);
        const cursorId = parts[1];

        // Lấy các bài đăng cũ hơn con trỏ hiện tại
        whereClause.OR = [
          {
            createdAt: { lt: cursorDate },
          },
          {
            createdAt: cursorDate,
            id: { lt: cursorId },
          },
        ];
      }
    }

    // 3. Thực hiện truy vấn DB
    const posts = await prisma.post.findMany({
      where: whereClause,
      take: limit + 1, // Lấy dư thêm 1 bản ghi để xác định có trang tiếp theo hay không
      orderBy: [
        { createdAt: 'desc' },
        { id: 'desc' },
      ],
      include: {
        author: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
          },
        },
        // Thêm thông tin xem currentUserId đã like post này chưa
        likes: currentUserId ? {
          where: { userId: currentUserId },
          select: { userId: true },
        } : false,
      },
    });

    let hasNextPage = false;
    let nextCursor: string | undefined = undefined;

    if (posts.length > limit) {
      hasNextPage = true;
      const nextPost = posts[limit - 1]; // Lấy phần tử cuối cùng của trang hiện tại làm cursor
      nextCursor = `${nextPost.createdAt.toISOString()}_${nextPost.id}`;
      // Xóa phần tử dư thừa ra khỏi danh sách trả về
      posts.pop();
    }

    // Biến đổi cấu trúc likes để trả về flag `isLiked` cho frontend tiện sử dụng
    const formattedPosts = posts.map(p => {
      const isLiked = p.likes && p.likes.length > 0;
      // Tránh trả về mảng likes thô để giảm băng thông tải
      const { likes, ...rest } = p as any;
      return {
        ...rest,
        isLiked,
      };
    });

    return {
      posts: formattedPosts,
      nextCursor,
      hasNextPage,
    };
  }

  /**
   * Lấy toàn bộ feed bài viết trên hệ thống (Bảng tin chung)
   */
  async getGlobalPosts(limit = 10, cursor?: string, currentUserId?: string) {
    const whereClause: any = {};

    // Xử lý Cursor pagination
    if (cursor) {
      const parts = cursor.split('_');
      if (parts.length === 2) {
        const cursorDate = new Date(parts[0]);
        const cursorId = parts[1];

        whereClause.OR = [
          {
            createdAt: { lt: cursorDate },
          },
          {
            createdAt: cursorDate,
            id: { lt: cursorId },
          },
        ];
      }
    }

    // Thực hiện truy vấn DB
    const posts = await prisma.post.findMany({
      where: whereClause,
      take: limit + 1,
      orderBy: [
        { createdAt: 'desc' },
        { id: 'desc' },
      ],
      include: {
        author: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
          },
        },
        likes: currentUserId ? {
          where: { userId: currentUserId },
          select: { userId: true },
        } : false,
      },
    });

    let hasNextPage = false;
    let nextCursor: string | undefined = undefined;

    if (posts.length > limit) {
      hasNextPage = true;
      const nextPost = posts[limit - 1];
      nextCursor = `${nextPost.createdAt.toISOString()}_${nextPost.id}`;
      posts.pop();
    }

    const formattedPosts = posts.map(p => {
      const isLiked = p.likes && p.likes.length > 0;
      const { likes, ...rest } = p as any;
      return {
        ...rest,
        isLiked,
      };
    });

    return {
      posts: formattedPosts,
      nextCursor,
      hasNextPage,
    };
  }
}

export const postService = new PostService();
export default postService;
