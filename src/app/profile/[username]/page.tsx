'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from '../../../components/profile-feed/Profile.module.css';
import PostList from '../../../components/profile-feed/PostList';

interface ProfileUser {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  role: 'VIEWER' | 'STREAMER' | 'ADMIN';
  starsGifted: number;
  starsEarned: number;
  starBalance: number;
}

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const username = params.username as string;

  const [profileUser, setProfileUser] = useState<ProfileUser | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (username) {
      loadProfileData();
    }
  }, [username]);

  const loadProfileData = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Tải thông tin profile của user được xem
      const resProfile = await fetch(`/api/users/${username}`);
      const profileData = await resProfile.json();

      if (!resProfile.ok || !profileData.success) {
        setError(profileData.error || 'Không thể tải thông tin cá nhân!');
        setLoading(false);
        return;
      }

      setProfileUser(profileData.data);

      // 2. Tải thông tin user hiện tại đang đăng nhập
      const resMe = await fetch('/api/auth/me');
      const meData = await resMe.json();

      if (resMe.ok && meData.authenticated) {
        setCurrentUser(meData.user);
      }
    } catch (err) {
      console.error(err);
      setError('Đã xảy ra lỗi kết nối khi tải trang cá nhân!');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingScreen}>
        <div className="spinner"></div>
        <p>Đang tải trang cá nhân của @{username}...</p>
      </div>
    );
  }

  if (error || !profileUser) {
    return (
      <div className={styles.loadingScreen}>
        <p style={{ color: '#ef4444' }}>❌ {error || 'Không tìm thấy người dùng!'}</p>
        <button className={styles.homeBtn} onClick={() => router.push('/')}>
          Về Trang Chủ 🏠
        </button>
      </div>
    );
  }

  const isOwnProfile = currentUser?.username === profileUser.username;

  return (
    <div className={styles.profileContainer}>
      {/* Navigation Header */}
      <nav className={styles.navbar}>
        <div className={styles.logo} onClick={() => router.push('/')}>
          🌟 LiveStar Space
        </div>
        <button className={styles.homeBtn} onClick={() => router.push('/')}>
          Trở về Trang Chủ 🏠
        </button>
      </nav>

      {/* Banner / Card thông tin cá nhân */}
      <div className={styles.profileHeaderCard}>
        <div className={styles.profileMeta}>
          <img
            src={profileUser.avatarUrl || '/avatars/default.png'}
            alt={profileUser.displayName}
            className={styles.largeAvatar}
          />
          <div className={styles.userInfo}>
            <h1 className={styles.displayName}>
              {profileUser.displayName}
              <span className={styles.roleBadge}>{profileUser.role}</span>
            </h1>
            <p className={styles.username}>@{profileUser.username}</p>
          </div>
        </div>

        {/* Dashboard thống kê số sao */}
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>🪙 {profileUser.starBalance.toLocaleString()}</span>
            <span className={styles.statLabel}>Sao khả dụng</span>
          </div>

          <div className={styles.statItem}>
            <span className={styles.statValue}>📤 {profileUser.starsGifted.toLocaleString()}</span>
            <span className={styles.statLabel}>Đã tặng (Gifted)</span>
          </div>

          <div className={styles.statItem}>
            <span className={styles.statValue}>📥 {profileUser.starsEarned.toLocaleString()}</span>
            <span className={styles.statLabel}>Đã nhận (Earned)</span>
          </div>
        </div>
      </div>

      <h2 className={styles.feedTitle}>
        {isOwnProfile ? '📝 Bảng tin của bạn' : `💬 Bảng tin của ${profileUser.displayName}`}
      </h2>

      {/* Danh sách bài đăng & tương tác */}
      <PostList
        username={username}
        currentUserId={currentUser?.id}
        isOwnProfile={isOwnProfile}
      />
    </div>
  );
}
