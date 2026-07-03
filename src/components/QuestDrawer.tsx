"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./QuestDrawer.module.css";

interface Quest {
  id: string;
  questType: string;
  progress: number;
  target: number;
  rewardStars: number;
  isCompleted: boolean;
  isClaimed: boolean;
  definition: {
    title: string;
    description: string | null;
  };
}

interface QuestDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onBalanceUpdate?: (newBalance: number) => void;
}

export default function QuestDrawer({ isOpen, onClose, onBalanceUpdate }: QuestDrawerProps) {
  const router = useRouter();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string; delay: number; scale: number }[]>([]);

  // 1. Tải danh sách nhiệm vụ từ API
  useEffect(() => {
    if (!isOpen) return;

    let active = true;
    const loadQuests = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("/api/quests");
        if (!active) return;
        if (res.ok) {
          const data = await res.json();
          setQuests(data.quests || []);
        } else {
          const err = await res.json();
          setError(err.error || "Không thể tải danh sách nhiệm vụ!");
        }
      } catch (err) {
        console.error(err);
        if (active) setError("Lỗi kết nối máy chủ!");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadQuests();
    return () => {
      active = false;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // 2. Kích hoạt hiệu ứng bắn Confetti màu sắc
  const triggerConfetti = () => {
    const colors = ["#F43F5E", "#3B82F6", "#F59E0B", "#10B981", "#8B5CF6", "#EC4899"];
    const particles = Array.from({ length: 45 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: Math.random() * 90 + 5, // Tỷ lệ phần trăm từ bên trái màn hình
      y: -10, // Rơi từ trên cùng xuống
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.8, // Trễ ngẫu nhiên để rơi tự nhiên hơn
      scale: Math.random() * 0.6 + 0.6,
    }));
    setConfetti(particles);
    setTimeout(() => {
      setConfetti([]);
    }, 3500);
  };

  // 3. Xử lý Điểm danh hàng ngày
  const handleCheckin = async () => {
    try {
      const res = await fetch("/api/quests/checkin", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        triggerConfetti();
        // Cập nhật state UI
        setQuests(
          quests.map((q) =>
            q.questType === "CHECKIN"
              ? { ...q, progress: q.target, isCompleted: true, isClaimed: true }
              : q
          )
        );
        if (onBalanceUpdate && data.newBalance !== undefined) {
          onBalanceUpdate(data.newBalance);
        }
        router.refresh();
      } else {
        const err = await res.json();
        alert(err.error || "Điểm danh thất bại!");
      }
    } catch (err) {
      console.error(err);
      alert("Đã xảy ra lỗi hệ thống!");
    }
  };

  // 4. Xử lý nhận thưởng cho từng nhiệm vụ khác
  const handleClaimReward = async (questType: string) => {
    try {
      const res = await fetch("/api/quests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questType }),
      });

      if (res.ok) {
        const data = await res.json();
        triggerConfetti();
        // Cập nhật state UI
        setQuests(
          quests.map((q) => (q.questType === questType ? { ...q, isClaimed: true } : q))
        );
        if (onBalanceUpdate && data.newBalance !== undefined) {
          onBalanceUpdate(data.newBalance);
        }
        router.refresh();
      } else {
        const err = await res.json();
        alert(err.error || "Nhận thưởng thất bại!");
      }
    } catch (err) {
      console.error(err);
      alert("Đã xảy ra lỗi hệ thống!");
    }
  };

  // Lấy nhiệm vụ Check-in riêng biệt
  const checkinQuest = quests.find((q) => q.questType === "CHECKIN");
  // Lấy các nhiệm vụ khác
  const otherQuests = quests.filter((q) => q.questType !== "CHECKIN");

  // Hàm render Icon SVG tương ứng từng loại nhiệm vụ
  const renderQuestIcon = (type: string) => {
    switch (type) {
      case "WATCH_5":
      case "WATCH_15":
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        );
      case "CHAT_3":
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        );
      case "GIFT_1":
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        );
      default:
        return (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
    }
  };

  return (
    <>
      {/* Container hạt giấy Confetti bắn tung tóe */}
      {confetti.map((particle) => (
        <div
          key={particle.id}
          className={styles.confettiParticle}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}px`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            transform: `scale(${particle.scale})`,
          }}
        />
      ))}

      {/* Overlay và Drawer */}
      <div className={styles.drawerOverlay} onClick={onClose}>
        <div className={styles.drawerContainer} onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className={styles.drawerHeader}>
            <h2 className={styles.drawerTitle}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              Nhiệm vụ hôm nay
            </h2>
            <button className={styles.closeButton} onClick={onClose} aria-label="Đóng bảng nhiệm vụ">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className={styles.drawerContent}>
            {loading ? (
              <div style={{ textAlign: "center", color: "#94a3b8", padding: "40px 0" }}>
                Đang tải nhiệm vụ...
              </div>
            ) : error ? (
              <div style={{ color: "#ef4444", textAlign: "center", padding: "20px 0" }}>
                ⚠️ {error}
              </div>
            ) : (
              <>
                {/* 1. Khu vực Điểm danh */}
                {checkinQuest && (
                  <div className={styles.checkinCard}>
                    <div className={styles.checkinTitle}>{checkinQuest.definition.title}</div>
                    <div className={styles.checkinReward}>
                      <span>+{checkinQuest.rewardStars}</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#fbbf24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                    {checkinQuest.isClaimed ? (
                      <button className={styles.checkinButtonDisabled} disabled>
                        ✓ Đã điểm danh hôm nay
                      </button>
                    ) : (
                      <button className={styles.checkinButton} onClick={handleCheckin}>
                        Điểm danh nhận thưởng 🚀
                      </button>
                    )}
                  </div>
                )}

                {/* 2. Danh sách nhiệm vụ khác */}
                <div className={styles.questSectionTitle}>Nhiệm vụ tương tác</div>

                <div className={styles.questList}>
                  {otherQuests.length === 0 ? (
                    <div style={{ color: "#64748b", fontSize: "13px", textAlign: "center", padding: "20px 0" }}>
                      Không có nhiệm vụ tương tác nào hoạt động hôm nay.
                    </div>
                  ) : (
                    otherQuests.map((quest) => {
                      const percent = Math.min(
                        Math.round((quest.progress / quest.target) * 100),
                        100
                      );

                      return (
                        <div key={quest.id} className={styles.questCard}>
                          <div className={styles.questHeader}>
                            <div className={styles.questInfo}>
                              <div className={styles.questIconWrapper}>
                                {renderQuestIcon(quest.questType)}
                              </div>
                              <div className={styles.questMeta}>
                                <span className={styles.questTitle}>
                                  {quest.definition.title}
                                </span>
                                <span className={styles.questDesc}>
                                  {quest.definition.description}
                                </span>
                              </div>
                            </div>
                            <span className={styles.questReward}>+{quest.rewardStars} ⭐</span>
                          </div>

                          {/* Progress bar */}
                          <div className={styles.progressContainer}>
                            <div className={styles.progressBarBg}>
                              <div
                                className={`${styles.progressBarFill} ${
                                  quest.isCompleted ? styles.progressBarFillCompleted : ""
                                }`}
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                            <div className={styles.progressLabel}>
                              <span>Tiến trình</span>
                              <span>
                                {quest.progress} / {quest.target}
                              </span>
                            </div>
                          </div>

                          {/* Action Button */}
                          {quest.isClaimed ? (
                            <div className={styles.completedText}>
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              Đã nhận thưởng
                            </div>
                          ) : quest.isCompleted ? (
                            <button
                              className={styles.claimButton}
                              onClick={() => handleClaimReward(quest.questType)}
                            >
                              Nhận {quest.rewardStars} ⭐ thưởng
                            </button>
                          ) : (
                            <div className={styles.inProgressText}>Đang thực hiện ({percent}%)</div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
