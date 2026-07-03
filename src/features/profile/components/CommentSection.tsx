import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ProfileFeed.module.css';

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    username: string;
    displayName: string;
    avatarUrl: string;
  };
}

interface CommentSectionProps {
  postId: string;
  currentUserId?: string;
  onCommentsCountChange: (newCount: number) => void;
}

export default function CommentSection({
  postId,
  currentUserId,
  onCommentsCountChange,
}: CommentSectionProps) {
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);

  // Load comments lần đầu
  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async (isLoadMore = false) => {
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const url = `/api/posts/${postId}/comments?limit=10${
        isLoadMore && cursor ? `&cursor=${encodeURIComponent(cursor)}` : ''
      }`;
      const res = await fetch(url);
      const data = await res.json();

      if (res.ok && data.success) {
        const newComments = data.data.comments;
        if (isLoadMore) {
          setComments((prev) => [...prev, ...newComments]);
        } else {
          setComments(newComments);
        }
        setCursor(data.data.nextCursor || null);
        setHasNextPage(data.data.hasNextPage);
      }
    } catch (err) {
      console.error('❌ Lỗi load comments:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Submit comment mới
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || loading) return;

    const textToSend = newCommentText.trim();
    setNewCommentText(''); // Clear input sớm để UX mượt

    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: textToSend }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        // Thêm bình luận mới vào đầu hoặc cuối danh sách (tùy thuộc vào sắp xếp ASC/DESC, ở đây ASC nên append vào cuối)
        setComments((prev) => [...prev, data.data]);
        // Trigger cập nhật tổng count trên PostCard
        onCommentsCountChange(comments.length + 1);
      } else {
        alert(data.error || 'Không thể đăng bình luận!');
        setNewCommentText(textToSend); // Rollback input
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi kết nối khi đăng bình luận!');
      setNewCommentText(textToSend);
    }
  };

  // Xóa comment
  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa bình luận này không?')) return;

    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        // Thực tế route là /api/posts/[id]/comments?commentId=...
        // Hoặc ta có thể viết API xóa comment trực tiếp
        // Đợi đã, hãy check route xoá comment trong backend service:
        // commentService.deleteComment(commentId, userId)
        // Nhưng route handler ta chưa làm API DELETE comment, chỉ có API POST/GET.
        // Hãy check xem ta có cần viết API DELETE comment không?
        // Có chứ! Nhưng để tránh tạo quá nhiều endpoints, ta có thể viết API DELETE comment
        // chung tại /api/posts/[id]/comments bằng phương thức DELETE!
        // Hãy check xem ta đã định nghĩa DELETE trong /api/posts/[id]/comments/route.ts chưa.
        // Chưa, route.ts đó mới chỉ có GET và POST.
        // Ta có thể thêm DELETE trực tiếp vào đó! Rất tiện!
      });
      
      // Chờ một chút, để xóa comment, ta sẽ gọi API:
      const resDelete = await fetch(`/api/posts/${postId}/comments?commentId=${commentId}`, {
        method: 'DELETE',
      });
      const data = await resDelete.json();

      if (resDelete.ok && data.success) {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
        onCommentsCountChange(Math.max(0, comments.length - 1));
      } else {
        alert(data.error || 'Không thể xóa bình luận!');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi kết nối khi xóa bình luận!');
    }
  };

  return (
    <div className={styles.commentSection}>
      {/* Form viết bình luận */}
      {currentUserId && (
        <form onSubmit={handleSubmitComment} className={styles.commentForm}>
          <input
            type="text"
            className={styles.commentInput}
            placeholder="Viết phản hồi công khai..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          />
          <button
            type="submit"
            className={styles.commentSubmitBtn}
            disabled={!newCommentText.trim()}
          >
            ➔
          </button>
        </form>
      )}

      {/* Danh sách bình luận */}
      {loading && comments.length === 0 ? (
        <div className={styles.loader}>Đang tải bình luận...</div>
      ) : (
        <div className={styles.commentList}>
          {hasNextPage && (
            <div className={styles.loadMoreComments} onClick={() => loadComments(true)}>
              {loadingMore ? 'Đang tải thêm...' : 'Xem các bình luận trước...'}
            </div>
          )}

          {comments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '10px', color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem' }}>
              Chưa có bình luận nào. Hãy tương tác cùng Idol! 💬
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className={styles.commentRow}>
                <img
                  src={comment.author.avatarUrl || '/avatars/default.png'}
                  alt={comment.author.displayName}
                  className={styles.commentAvatar}
                  onClick={() => router.push(`/profile/${comment.author.username}`)}
                />
                <div className={styles.commentBody}>
                  <div className={styles.commentHeader} onClick={() => router.push(`/profile/${comment.author.username}`)}>
                    <span className={styles.commentAuthor}>{comment.author.displayName}</span>
                    <span className={styles.commentTime}>
                      {new Date(comment.createdAt).toLocaleDateString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className={styles.commentText}>{comment.content}</div>
                </div>

                {/* Nút xóa comment */}
                {(currentUserId === comment.author.id) && (
                  <button
                    className={styles.deleteCommentBtn}
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
