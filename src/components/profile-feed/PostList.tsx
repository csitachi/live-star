import React, { useState, useEffect, useRef } from 'react';
import styles from './ProfileFeed.module.css';
import PostCard, { Post } from './PostCard';
import CreatePostCard from './CreatePostCard';

interface PostListProps {
  username: string;
  currentUserId?: string;
  isOwnProfile: boolean;
}

export default function PostList({ username, currentUserId, isOwnProfile }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const observerTargetRef = useRef<HTMLDivElement>(null);

  // Load feed ban đầu
  useEffect(() => {
    loadPosts(false);
  }, [username]);

  // Infinite Scroll Observer
  useEffect(() => {
    if (!hasNextPage || loading || loadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadPosts(true);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    const currentTarget = observerTargetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, cursor, loading, loadingMore]);

  const loadPosts = async (isLoadMore = false) => {
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const url = `/api/users/${username}/posts?limit=5${
        isLoadMore && cursor ? `&cursor=${encodeURIComponent(cursor)}` : ''
      }`;
      const res = await fetch(url);
      const data = await res.json();

      if (res.ok && data.success) {
        const fetchedPosts = data.data.posts;
        if (isLoadMore) {
          setPosts((prev) => [...prev, ...fetchedPosts]);
        } else {
          setPosts(fetchedPosts);
        }
        setCursor(data.data.nextCursor || null);
        setHasNextPage(data.data.hasNextPage);
      }
    } catch (err) {
      console.error('❌ [PostList] Lỗi load bài viết:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Callback khi có post mới được tạo thành công
  const handlePostCreated = (newPost: any) => {
    // Thêm bài đăng mới vào đầu danh sách hiển thị
    setPosts((prev) => [newPost, ...prev]);
  };

  // Callback khi xóa post thành công
  const handlePostDeleted = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  return (
    <div className={styles.feedContainer}>
      {/* Ô tạo bài viết mới nếu là chủ trang cá nhân */}
      {isOwnProfile && <CreatePostCard onPostCreated={handlePostCreated} />}

      {/* Danh sách bài đăng */}
      {posts.length === 0 && !loading ? (
        <div className={styles.emptyState}>
          <h3>📭 Chưa có bài viết nào</h3>
          <p>Hãy theo dõi để cập nhật các dòng trạng thái mới nhất!</p>
        </div>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            currentUserId={currentUserId}
            onDelete={handlePostDeleted}
          />
        ))
      )}

      {/* Loading indicator lần đầu */}
      {loading && posts.length === 0 && (
        <div className={styles.loader}>Đang tải bảng tin...</div>
      )}

      {/* Target element để trigger Infinite Scroll */}
      {hasNextPage && (
        <div ref={observerTargetRef} className={styles.loader}>
          {loadingMore ? 'Đang tải thêm...' : ''}
        </div>
      )}
    </div>
  );
}
