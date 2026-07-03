import React, { useState } from 'react';
import styles from './ProfileFeed.module.css';
import CommentSection from './CommentSection';
import { HeartIcon, CommentIcon, TrashIcon } from '@/components/Icons';

export interface Post {
  id: string;
  content: string;
  type: 'STATUS' | 'PHOTO' | 'VIDEO';
  mediaUrl: string | null;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  isLiked: boolean;
  author: {
    id: string;
    username: string;
    displayName: string;
    avatarUrl: string;
  };
}

interface PostCardProps {
  post: Post;
  currentUserId?: string;
  onDelete: (postId: string) => void;
}

export default function PostCard({ post, currentUserId, onDelete }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [commentsCount, setCommentsCount] = useState(post.commentsCount);
  const [showComments, setShowComments] = useState(false);
  const [liking, setLiking] = useState(false);

  const isAuthor = currentUserId === post.author.id;

  // Xử lý click Like (Optimistic UI)
  const handleLike = async () => {
    if (!currentUserId) {
      alert('Bạn phải đăng nhập để thích bài viết!');
      return;
    }
    if (liking) return;

    // Optimistic UI updates
    const originalIsLiked = isLiked;
    const originalLikesCount = likesCount;

    setIsLiked(!originalIsLiked);
    setLikesCount(originalLikesCount + (originalIsLiked ? -1 : 1));
    setLiking(true);

    try {
      const res = await fetch(`/api/posts/${post.id}/like`, { method: 'POST' });
      const data = await res.json();

      if (!res.ok || !data.success) {
        // Rollback on fail
        setIsLiked(originalIsLiked);
        setLikesCount(originalLikesCount);
      } else {
        // Sync with exact DB value
        setLikesCount(data.data.likesCount);
        setIsLiked(data.data.isLiked);
      }
    } catch (err) {
      console.error(err);
      // Rollback on connection error
      setIsLiked(originalIsLiked);
      setLikesCount(originalLikesCount);
    } finally {
      setLiking(false);
    }
  };

  // Xử lý click xóa bài đăng
  const handleDelete = async () => {
    if (!confirm('Bạn có chắc chắn muốn xóa bài đăng này không?')) return;

    try {
      const res = await fetch(`/api/posts/${post.id}`, { method: 'DELETE' });
      const data = await res.json();

      if (res.ok && data.success) {
        onDelete(post.id);
      } else {
        alert(data.error || 'Xóa bài viết thất bại!');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi kết nối khi xóa bài viết!');
    }
  };

  return (
    <div className={styles.card}>
      {/* Header bài đăng */}
      <div className={styles.postHeader}>
        <div className={styles.authorMeta}>
          <img
            src={post.author.avatarUrl || '/avatars/default.png'}
            alt={post.author.displayName}
            className={styles.avatar}
          />
          <div className={styles.nameContainer}>
            <span className={styles.displayName}>{post.author.displayName}</span>
            <span className={styles.username}>@{post.author.username}</span>
            <span className={styles.postTime}>
              {new Date(post.createdAt).toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>

        {/* Nút xóa bài đăng */}
        {isAuthor && (
          <button className={styles.deletePostBtn} onClick={handleDelete} title="Xóa bài viết">
            <TrashIcon size={16} />
          </button>
        )}
      </div>

      {/* Nội dung text */}
      <div className={styles.postContent}>{post.content}</div>

      {/* Phương tiện đính kèm (Ảnh/Video) */}
      {post.mediaUrl && (
        <div className={styles.mediaContent}>
          {post.type === 'VIDEO' ? (
            <video src={post.mediaUrl} controls className={styles.postVideo} preload="metadata" />
          ) : (
            <img src={post.mediaUrl} alt="Post media" className={styles.postImg} loading="lazy" />
          )}
        </div>
      )}

      {/* Thanh hành động (Like, Comment) */}
      <div className={styles.postActions}>
        <button
          className={`${styles.actionBtn} ${isLiked ? styles.liked : ''}`}
          onClick={handleLike}
        >
          <HeartIcon size={18} fill={isLiked ? "var(--color-secondary)" : "none"} className={`${styles.actionIconSvg} ${isLiked ? styles.likedIcon : ''}`} />
          <span>{likesCount} Likes</span>
        </button>

        <button className={styles.actionBtn} onClick={() => setShowComments(!showComments)}>
          <CommentIcon size={18} className={styles.actionIconSvg} />
          <span>{commentsCount} Phản hồi</span>
        </button>
      </div>

      {/* Khung bình luận */}
      {showComments && (
        <CommentSection
          postId={post.id}
          currentUserId={currentUserId}
          onCommentsCountChange={setCommentsCount}
        />
      )}
    </div>
  );
}
