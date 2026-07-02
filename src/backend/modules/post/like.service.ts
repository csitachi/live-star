import { prisma } from '@/backend/shared/database/prisma';
import { redis } from '@/backend/shared/cache/redis';

export class LikeService {
  /**
   * Thích hoặc Bỏ thích bài viết (Toggle Like)
   * 
   * ÁP DỤNG TRÁNH RACE CONDITION:
   * - Sử dụng Prisma Transaction để đảm bảo khi tạo bản ghi Like
   *   và tăng bộ đếm `likesCount` ở Post luôn đồng bộ và nguyên tử.
   * - Sử dụng Redis Cache để kiểm tra nhanh lượt Like và tối ưu hóa
   *   các lượt đọc tiếp theo mà không cần đụng tới PostgreSQL.
   */
  async toggleLike(postId: string, userId: string) {
    // 1. Kiểm tra bài viết tồn tại
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { id: true, authorId: true },
    });

    if (!post) {
      throw new Error('Bài viết không tồn tại!');
    }

    const cacheKey = `post:${postId}:likes:users`;
    
    // 2. Chạy transaction toggle like trong database
    const result = await prisma.$transaction(async (tx) => {
      // Tìm xem user đã like post này chưa
      const existingLike = await tx.postLike.findUnique({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      });

      if (existingLike) {
        // Nếu đã like -> Bỏ thích
        await tx.postLike.delete({
          where: { id: existingLike.id },
        });

        // Giảm số lượt likes
        const updatedPost = await tx.post.update({
          where: { id: postId },
          data: {
            likesCount: {
              decrement: 1, // SQL: SET likesCount = likesCount - 1
            },
          },
          select: { likesCount: true },
        });

        return { isLiked: false, likesCount: updatedPost.likesCount };
      } else {
        // Nếu chưa like -> Thích bài đăng
        await tx.postLike.create({
          data: {
            postId,
            userId,
          },
        });

        // Tăng số lượt likes
        const updatedPost = await tx.post.update({
          where: { id: postId },
          data: {
            likesCount: {
              increment: 1, // SQL: SET likesCount = likesCount + 1
            },
          },
          select: { likesCount: true },
        });

        return { isLiked: true, likesCount: updatedPost.likesCount };
      }
    });

    // 3. Cập nhật Redis cache ở background để đồng bộ hóa nhanh các lượt đọc
    try {
      if (result.isLiked) {
        await redis.sadd(cacheKey, userId);
      } else {
        await redis.srem(cacheKey, userId);
      }
      // Set TTL 24h để dọn dẹp cache rác tự động
      await redis.expire(cacheKey, 86400);
    } catch (cacheErr: any) {
      console.warn('⚠️ [Like Service] Không thể cập nhật Redis cache:', cacheErr.message);
    }

    return result;
  }

  /**
   * Kiểm tra xem user đã like bài viết chưa (Đọc nhanh từ Redis cache, fallback DB)
   */
  async isLikedByUser(postId: string, userId: string): Promise<boolean> {
    const cacheKey = `post:${postId}:likes:users`;
    try {
      // 1. Kiểm tra trong Redis cache Set
      const isMember = await redis.sismember(cacheKey, userId);
      if (isMember === 1) return true;
      
      // Nếu Redis chưa cache hoặc user không có trong Set
      // Có thể Redis key chưa được khởi tạo, check DB
    } catch (e) {
      // Fail-silent, check DB tiếp
    }

    // 2. Fallback DB check
    const like = await prisma.postLike.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    // 3. Tái thiết lập cache nếu có
    if (like) {
      try {
        await redis.sadd(cacheKey, userId);
        await redis.expire(cacheKey, 86400);
      } catch (err) {}
      return true;
    }

    return false;
  }
}

export const likeService = new LikeService();
export default likeService;
