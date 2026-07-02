// Thư viện thuật toán tính Cấp độ (Level) cho Viewer và Streamer (KOL)

export interface LevelInfo {
  level: number;
  title: string;
  color: string;      // Mã màu hex
  badgeClass: string; // Tên CSS class
}

/**
 * Tính Cấp độ của Viewer dựa trên tổng số sao đã tặng (starsGifted)
 */
export function getViewerLevel(starsGifted: number = 0): LevelInfo {
  if (starsGifted >= 5000) {
    return { level: 6, title: "Thần Thoại 👑", color: "#ef4444", badgeClass: "lvl-6" };
  }
  if (starsGifted >= 1000) {
    return { level: 5, title: "Huyền Thoại 💎", color: "#ffb703", badgeClass: "lvl-5" };
  }
  if (starsGifted >= 500) {
    return { level: 4, title: "Đại Phú Hộ 🚀", color: "#9d4edd", badgeClass: "lvl-4" };
  }
  if (starsGifted >= 100) {
    return { level: 3, title: "Đại Gia 🌟", color: "#3b82f6", badgeClass: "lvl-3" };
  }
  if (starsGifted >= 10) {
    return { level: 2, title: "Tích Cực ✨", color: "#10b981", badgeClass: "lvl-2" };
  }
  return { level: 1, title: "Thành Viên 🌱", color: "#6b7280", badgeClass: "lvl-1" };
}

/**
 * Tính Cấp độ của Streamer/KOL dựa trên tổng số sao tích lũy đã nhận được (starsEarned)
 */
export function getStreamerLevel(starsEarned: number = 0): LevelInfo {
  if (starsEarned >= 10000) {
    return { level: 6, title: "Vương Miện Vàng 👑", color: "#ff007f", badgeClass: "lvl-6" };
  }
  if (starsEarned >= 5000) {
    return { level: 5, title: "Siêu KOL 🌟", color: "#ffb703", badgeClass: "lvl-5" };
  }
  if (starsEarned >= 2000) {
    return { level: 4, title: "Ngôi Sao Đang Lên ⚡", color: "#9d4edd", badgeClass: "lvl-4" };
  }
  if (starsEarned >= 500) {
    return { level: 3, title: "Idol Chuyên Nghiệp 🎵", color: "#3b82f6", badgeClass: "lvl-3" };
  }
  if (starsEarned >= 100) {
    return { level: 2, title: "KOL Tập Sự 🎤", color: "#10b981", badgeClass: "lvl-2" };
  }
  return { level: 1, title: "Tân Binh 🌱", color: "#6b7280", badgeClass: "lvl-1" };
}
