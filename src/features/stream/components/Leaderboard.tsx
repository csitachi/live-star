// Component hiển thị Bảng xếp hạng tặng sao (Leaderboard Component).
// Giúp hiển thị danh sách 5 người tặng sao nhiều nhất trong phòng live hiện tại.

import React from "react";

export interface LeaderboardEntry {
  senderId: string;
  displayName: string;
  avatarUrl: string;
  totalStars: number;
}

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
  styles: any;
}

export default function Leaderboard({ leaderboard, styles }: LeaderboardProps) {
  return (
    <div className={styles.leaderboardSection}>
      <div className={styles.leaderboardHeader}>
        <span>🏆</span> Bảng xếp hạng tặng sao (Leaderboard)
      </div>
      <div className={styles.leaderboardList}>
        {leaderboard.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "30px",
              color: "var(--text-secondary)",
              fontSize: "0.8rem",
            }}
          >
            Chưa có ai tặng sao. Hãy là người đầu tiên! 🌟
          </div>
        ) : (
          leaderboard.map((gifter, index) => (
            <div key={gifter.senderId} className={styles.leaderboardRow}>
              <div className={styles.leaderboardLeft}>
                {/* Đánh dấu thứ hạng 1, 2, 3 bằng các lớp màu sắc khác nhau */}
                <span className={`${styles.rank} ${styles[`rank${index + 1}`] || ""}`}>
                  {index + 1}
                </span>
                <img
                  src={gifter.avatarUrl}
                  alt={gifter.displayName}
                  className={styles.rankAvatar}
                />
                <span className={styles.rankName}>{gifter.displayName}</span>
              </div>
              <span className={styles.rankAmount}>🪙 {gifter.totalStars} sao</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
