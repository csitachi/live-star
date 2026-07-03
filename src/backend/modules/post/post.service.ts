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

  /**
   * Lấy feed bài viết khám phá (Explore Feed) đan xen ngẫu nhiên giữa các creators
   */
  async getExplorePosts(limit = 10, cursor?: string, currentUserId?: string) {
    // 1. Lấy toàn bộ bài viết mới nhất (tối đa 150 bài) để trộn và phân trang
    const POOL_SIZE = 150;
    const posts = await prisma.post.findMany({
      take: POOL_SIZE,
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

    if (posts.length === 0) {
      return {
        posts: [],
        nextCursor: undefined,
        hasNextPage: false,
      };
    }

    // 2. Phân chia bài viết theo tác giả để đan xen tránh một người chiếm sóng liên tục
    const postsByAuthor: { [authorId: string]: typeof posts } = {};
    for (const post of posts) {
      if (!postsByAuthor[post.authorId]) {
        postsByAuthor[post.authorId] = [];
      }
      postsByAuthor[post.authorId].push(post);
    }

    // 3. Trộn đan xen: lấy lần lượt 1 bài của mỗi tác giả cho đến khi hết
    const authorIds = Object.keys(postsByAuthor);
    
    // Sử dụng ngày hiện tại làm hạt giống để thứ tự ngẫu nhiên được nhất quán trong ngày khi phân trang
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    const seededRandom = (s: number) => {
      const x = Math.sin(s) * 10000;
      return x - Math.floor(x);
    };

    // Shuffle authorIds
    let m = authorIds.length;
    let currentSeed = seed;
    while (m) {
      const i = Math.floor(seededRandom(currentSeed++) * m--);
      const t = authorIds[m];
      authorIds[m] = authorIds[i];
      authorIds[i] = t;
    }

    const interleavedPosts: typeof posts = [];
    let hasMore = true;
    let round = 0;
    
    while (hasMore) {
      hasMore = false;
      for (const authorId of authorIds) {
        const authorPosts = postsByAuthor[authorId];
        if (authorPosts && authorPosts[round]) {
          interleavedPosts.push(authorPosts[round]);
          hasMore = true;
        }
      }
      round++;
    }

    // 4. Phân trang dựa trên mảng đã được trộn đan xen
    let startIndex = 0;
    if (cursor) {
      // Tìm vị trí của cursor (postId) trong mảng đã đan xen
      const cursorIndex = interleavedPosts.findIndex(p => p.id === cursor);
      if (cursorIndex !== -1) {
        startIndex = cursorIndex + 1;
      }
    }

    const paginatedPosts = interleavedPosts.slice(startIndex, startIndex + limit);
    
    const hasNextPage = startIndex + limit < interleavedPosts.length;
    const nextCursor = hasNextPage && paginatedPosts.length > 0
      ? paginatedPosts[paginatedPosts.length - 1].id
      : undefined;

    // 5. Định dạng kết quả (giống getGlobalPosts)
    const formattedPosts = paginatedPosts.map(p => {
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
