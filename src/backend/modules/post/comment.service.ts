import { prisma } from '@/backend/shared/database/prisma';

export class CommentService {
  /**
   * Thêm bình luận mới vào bài viết
   */
  async createComment(data: {
    postId: string;
    authorId: string;
    content: string;
  }) {
    const { postId, authorId, content } = data;

    if (!content || content.trim().length === 0) {
      throw new Error('Nội dung bình luận không được trống!');
    }

    // Kiểm tra bài viết có tồn tại hay không
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { id: true },
    });

    if (!post) {
      throw new Error('Bài viết không tồn tại!');
    }

    // Thực hiện tạo comment và cập nhật counter của bài đăng trong transaction
    return prisma.$transaction(async (tx) => {
      const comment = await tx.postComment.create({
        data: {
          content: content.trim(),
          postId,
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

      // Tăng số lượng comment của bài viết
      await tx.post.update({
        where: { id: postId },
        data: {
          commentsCount: {
            increment: 1,
          },
        },
      });

      return comment;
    });
  }

  /**
   * Xóa bình luận
   */
  async deleteComment(commentId: string, userId: string) {
    const comment = await prisma.postComment.findUnique({
      where: { id: commentId },
      include: {
        post: {
          select: { authorId: true }, // Để cho phép chủ bài đăng cũng có quyền xóa comment
        },
      },
    });

    if (!comment) {
      throw new Error('Bình luận không tồn tại!');
    }

    // Chỉ chủ bình luận HOẶC chủ bài đăng mới được quyền xóa comment này
    if (comment.authorId !== userId && comment.post.authorId !== userId) {
      throw new Error('Bạn không có quyền xóa bình luận này!');
    }

    return prisma.$transaction(async (tx) => {
      await tx.postComment.delete({
        where: { id: commentId },
      });

      // Giảm số lượng comment của bài viết
      await tx.post.update({
        where: { id: comment.postId },
        data: {
          commentsCount: {
            decrement: 1,
          },
        },
      });

      return { success: true };
    });
  }

  /**
   * Lấy danh sách bình luận của bài viết (Cursor-based pagination)
   */
  async getPostComments(postId: string, limit = 20, cursor?: string) {
    const whereClause: any = { postId };

    if (cursor) {
      const parts = cursor.split('_');
      if (parts.length === 2) {
        const cursorDate = new Date(parts[0]);
        const cursorId = parts[1];

        // Lấy bình luận tiếp theo (sắp xếp theo thời gian tăng dần Asc)
        whereClause.OR = [
          {
            createdAt: { gt: cursorDate },
          },
          {
            createdAt: cursorDate,
            id: { gt: cursorId },
          },
        ];
      }
    }

    const comments = await prisma.postComment.findMany({
      where: whereClause,
      take: limit + 1,
      orderBy: [
        { createdAt: 'asc' },
        { id: 'asc' },
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
      },
    });

    let hasNextPage = false;
    let nextCursor: string | undefined = undefined;

    if (comments.length > limit) {
      hasNextPage = true;
      const nextComment = comments[limit - 1];
      nextCursor = `${nextComment.createdAt.toISOString()}_${nextComment.id}`;
      comments.pop();
    }

    return {
      comments,
      nextCursor,
      hasNextPage,
    };
  }
}

export const commentService = new CommentService();
export default commentService;
