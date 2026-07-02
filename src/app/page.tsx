// Trang chủ hệ thống LiveStar - Entertainment Portal.
// Hỗ trợ chọn danh tính trải nghiệm, xem danh sách phòng Live theo danh mục, xem BXH KOL, và tạo phòng livestream mới.

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { getStreamerLevel } from "@/lib/level";

// Khai báo kiểu dữ liệu cho User và Stream (Đồng bộ với Prisma Schema)
interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  starBalance: number;
  starsGifted: number;
  starsEarned: number;
}

interface Stream {
  id: string;
  title: string;
  description: string | null;
  category: string;
  status: "LIVE" | "ENDED";
  viewerCount: number;
  totalStars: number;
  streamerId: string;
  createdAt: string;
  streamer: {
    username: string;
    displayName: string;
    avatarUrl: string;
    starsGifted: number;
    starsEarned: number;
  };
}

const CATEGORIES = [
  { id: "Tất cả", label: "Tất cả 📺" },
  { id: "Talkshow", label: "Trò chuyện 💬" },
  { id: "Music", label: "Âm nhạc 🎵" },
  { id: "Gaming", label: "Trò chơi 🎮" },
  { id: "Comedy", label: "Hài kịch 🎭" }
];

export default function HomePage() {
  const router = useRouter();
  
  // Trạng thái danh sách stream và thông tin tải dữ liệu
  const [streams, setStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Danh sách top KOLs phục vụ bảng xếp hạng
  const [topKOLs, setTopKOLs] = useState<User[]>([]);
  
  // Trạng thái danh mục được chọn để lọc
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  // Danh tính người dùng hiện tại (Giả lập Session)
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Trạng thái Modal Tạo phòng Livestream
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newStreamTitle, setNewStreamTitle] = useState("");
  const [newStreamDesc, setNewStreamDesc] = useState("");
  const [newStreamCategory, setNewStreamCategory] = useState("Talkshow");
  const [submitting, setSubmitting] = useState(false);

  // 1. Tải thông tin người dùng bằng Cookie và tải danh sách phòng
  useEffect(() => {
    fetchStreams(selectedCategory);
    fetchTopKOLs();
    checkSession();
  }, [selectedCategory]);

  // Lấy danh sách stream từ API backend
  const fetchStreams = async (category: string) => {
    try {
      setLoading(true);
      const url = category === "Tất cả" ? "/api/streams" : `/api/streams?category=${category}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setStreams(data);
      }
    } catch (error) {
      console.error("Lỗi lấy danh sách streams:", error);
    } finally {
      setLoading(false);
    }
  };

  // Lấy danh sách Top 5 KOL nhận nhiều sao nhất
  const fetchTopKOLs = async () => {
    try {
      const res = await fetch("/api/auth");
      if (res.ok) {
        const data = await res.json();
        setTopKOLs(data);
      }
    } catch (error) {
      console.error("Lỗi lấy danh sách top KOLs:", error);
    }
  };

  // Kiểm tra Session hiện tại qua Cookie HttpOnly
  const checkSession = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated) {
          setCurrentUser(data.user);
          return data.user;
        }
      }
      return null;
    } catch (error) {
      console.error("Lỗi lấy thông tin session:", error);
      return null;
    }
  };

  // Đăng nhập Google thực tế (Callback từ Google SDK)
  const handleGoogleLoginSuccess = async (response: any) => {
    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: response.credential, isSandbox: false })
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
        alert(`🎉 Đăng nhập Google thành công! Chào mừng ${data.user.displayName}`);
        fetchStreams(selectedCategory);
        fetchTopKOLs();
      } else {
        const err = await res.json();
        alert(err.error || "Xác thực Google thất bại!");
      }
    } catch (e) {
      console.error("Lỗi đăng nhập Google:", e);
    }
  };

  // Đăng nhập Google Sandbox (Mô phỏng)
  const handleGoogleSandboxLogin = async () => {
    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: "dummy_sandbox", isSandbox: true })
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
        alert(`🚀 Đăng nhập Sandbox thành công! Chào mừng ${data.user.displayName}`);
        fetchStreams(selectedCategory);
        fetchTopKOLs();
      } else {
        alert("Đăng nhập Sandbox thất bại!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Khởi động nút Google Sign-In SDK
  useEffect(() => {
    if (currentUser) return; // Nếu đã có session thì không render nút

    const initGoogleBtn = () => {
      const google = (window as any).google;
      if (google && document.getElementById("google-signin-btn")) {
        google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "dummy-client-id.apps.googleusercontent.com",
          callback: handleGoogleLoginSuccess,
        });
        google.accounts.id.renderButton(
          document.getElementById("google-signin-btn"),
          { theme: "filled_blue", size: "large", text: "signin_with", width: 220 }
        );
      }
    };

    const timer = setInterval(() => {
      if ((window as any).google) {
        initGoogleBtn();
        clearInterval(timer);
      }
    }, 500);

    return () => clearInterval(timer);
  }, [currentUser]);

  // Đăng xuất: Xóa session trong DB và clear cookie
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        setCurrentUser(null);
        alert("Đã đăng xuất tài khoản!");
        fetchStreams(selectedCategory);
        fetchTopKOLs();
      }
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    }
  };

  // Nạp sao giả lập (+1000 sao)
  const handleRecharge = async () => {
    if (!currentUser) return;
    try {
      const res = await fetch("/api/user/recharge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser.id, amount: 1000 }),
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(prev => prev ? { ...prev, starBalance: data.starBalance } : null);
        alert(`🎉 Đã nạp thành công 1000 sao! Số dư mới: ${data.starBalance} sao.`);
      }
    } catch (error) {
      console.error("Lỗi nạp sao:", error);
    }
  };

  // Tạo phòng livestream mới
  const handleCreateStream = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    if (!newStreamTitle.trim()) {
      alert("Vui lòng nhập tiêu đề livestream!");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/streams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newStreamTitle,
          description: newStreamDesc,
          streamerId: currentUser.id,
          category: newStreamCategory,
        }),
      });

      if (res.ok) {
        const newStream = await res.json();
        setShowCreateModal(false);
        setNewStreamTitle("");
        router.push(`/streamer?id=${newStream.id}`);
      } else {
        const err = await res.json();
        alert(err.error || "Không thể tạo phòng stream!");
      }
    } catch (error) {
      console.error("Lỗi tạo stream:", error);
      alert("Đã xảy ra lỗi hệ thống!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header chính */}
      <header className={styles.header}>
        <div className={styles.logo} onClick={() => router.push("/")} style={{ cursor: "pointer" }}>
          <span className={styles.logoIcon}>⭐</span>
          <span>LiveStar</span>
        </div>

        {/* Search bar placeholder */}
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <input 
            type="text" 
            placeholder="Tìm kiếm phòng live, idol..." 
            className={styles.searchInput}
            disabled
          />
        </div>

        {currentUser ? (
          <div className={`${styles.userPanel} glass`}>
            <img src={currentUser.avatarUrl} alt={currentUser.displayName} className={styles.avatar} />
            <div className={styles.userInfo}>
              <span className={styles.username}>{currentUser.displayName}</span>
              <span className={styles.balance}>
                🪙 {currentUser.starBalance.toLocaleString()} sao
              </span>
            </div>
            <button className={styles.rechargeBtn} onClick={handleRecharge}>
              + Nạp Sao
            </button>
            <button className="glow-btn-secondary" onClick={handleLogout} style={{ padding: "6px 12px", fontSize: "0.8rem", marginLeft: "10px" }}>
              Đăng xuất
            </button>
          </div>
        ) : (
          <div style={{ width: 220 }} />
        )}
      </header>

      {/* Main Layout Body */}
      <div className={styles.mainLayoutBody}>
        {/* Left Sidebar Menu */}
        <aside className={styles.sidebarMenu}>
          <div className={styles.menuGroup}>
            <button className={`${styles.menuItem} ${styles.menuItemActive}`}>
              <span className={styles.menuIcon}>🏠</span>
              <span className={styles.menuLabel}>Trang chủ</span>
            </button>
            <button className={styles.menuItem} onClick={() => alert("Tính năng Game Center đang phát triển!")} type="button">
              <span className={styles.menuIcon}>🎮</span>
              <span className={styles.menuLabel}>Game Center</span>
            </button>
            <button className={styles.menuItem} onClick={() => {
              const el = document.getElementById("top-kols-section");
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} type="button">
              <span className={styles.menuIcon}>🏆</span>
              <span className={styles.menuLabel}>Siêu sao KOLs</span>
            </button>
            <button className={styles.menuItem} onClick={() => {
              if (!currentUser) {
                alert("Vui lòng đăng nhập trước khi truy cập Kênh của tôi!");
              } else {
                router.push(`/streamer`);
              }
            }} type="button">
              <span className={styles.menuIcon}>👤</span>
              <span className={styles.menuLabel}>Kênh của tôi</span>
            </button>
          </div>
          <div className={styles.sidebarDivider} />
          <div className={styles.menuGroup}>
            <button className={styles.menuItem} onClick={() => alert("Tính năng Cấu hình đang phát triển!")} type="button">
              <span className={styles.menuIcon}>⚙</span>
              <span className={styles.menuLabel}>Cấu hình</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className={styles.mainContentContent}>
          {/* Hero section: Glassmorphism Entertainment Spotlight */}
          <section className={styles.hero} style={{ background: "linear-gradient(135deg, rgba(157, 78, 221, 0.15) 0%, rgba(255, 0, 127, 0.08) 50%, transparent 100%)" }}>
            <div style={{ display: "inline-block", background: "rgba(255, 0, 127, 0.1)", border: "1px solid rgba(255, 0, 127, 0.2)", color: "var(--color-secondary)", padding: "6px 14px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "8px" }}>
              🎭 Cổng Giải Trí KOLs & LiveStream Stars
            </div>
            <h1 className={styles.heroTitle} style={{ background: "linear-gradient(135deg, #fff, #9d4edd, #ff007f)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              KOL Livestream & Nhận Sao Độc Quyền
            </h1>
            <p className={styles.heroSubtitle}>
              Nơi tụ hội của những tài năng âm nhạc, trò chơi và diễn thuyết hàng đầu. Theo dõi thần tượng yêu thích, trò chuyện tương tác trực tuyến và tặng quà kèm hiệu ứng bay sao cực đỉnh!
            </p>

            {/* Cấu phần Google Sign-In & Sandbox */}
            <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              {!currentUser ? (
                <>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                    🔑 Đăng nhập để phát live làm Idol hoặc tặng quà làm Viewer VIP:
                  </p>
                  <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
                    {/* Nút Google thật */}
                    <div id="google-signin-btn"></div>
                    
                    {/* Nút Sandbox */}
                    <button className="glow-btn-primary" onClick={handleGoogleSandboxLogin} style={{ background: "linear-gradient(135deg, #4285F4, #ff007f)" }}>
                      🚀 Đăng nhập Sandbox (Bob/Charlie/Dave)
                    </button>
                  </div>
                </>
              ) : (
                <p style={{ fontSize: "0.95rem", color: "var(--success)", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>✅ Chào mừng Idol/Viewer:</span> <strong>{currentUser.displayName}</strong>
                </p>
              )}
            </div>

            <div style={{ marginTop: "15px" }}>
              <button className="glow-btn-primary" onClick={() => {
                if (!currentUser) {
                  alert("Vui lòng đăng nhập trước khi bắt đầu livestream!");
                  return;
                }
                setShowCreateModal(true);
              }}>
                🎥 Bắt đầu phòng Live mới của bạn
              </button>
            </div>
          </section>

          {/* Main Layout: Thể loại luồng live bên trái + BXH KOL bên phải */}
          <div className={styles.homepageBody} id="top-kols-section">
            {/* Streams container bên trái */}
            <div className={styles.streamsContainer}>
              {/* Thanh lọc thể loại (Category Pill Filters) */}
              <div className={styles.categoryFilterBar}>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    className={`${styles.categoryPill} ${selectedCategory === cat.id ? styles.categoryPillActive : ""}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <h2 className={styles.sectionTitle} style={{ borderBottom: "1px solid var(--border-subtle)", paddingBottom: "12px" }}>
                <span>📺</span> Các phòng đang phát sóng ({selectedCategory})
              </h2>

              {loading ? (
                <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
                  🔄 Đang tải các phòng stream giải trí...
                </div>
              ) : streams.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px", background: "var(--bg-surface)", borderRadius: "16px", color: "var(--text-secondary)", border: "1px dashed var(--border-subtle)" }}>
                  Chưa có phòng stream nào thuộc danh mục này. Hãy là người đầu tiên phát sóng!
                </div>
              ) : (
                <div className={styles.grid}>
                  {streams.map((stream) => {
                    const streamerStars = stream.streamer.starsEarned || 0;
                    const streamerLevelInfo = getStreamerLevel(streamerStars);
                    const categoryLabel = CATEGORIES.find(c => c.id === stream.category)?.label || stream.category;

                    return (
                      <div
                        key={stream.id}
                        className={`${styles.streamCard} premium-card`}
                        style={{
                          borderTop: `3px solid ${stream.status === "LIVE" ? "var(--color-primary)" : "#374151"}`
                        }}
                        onClick={() => {
                          if (stream.status === "LIVE") {
                            router.push(`/viewer/${stream.id}`);
                          } else {
                            alert("Livestream này đã kết thúc. Bạn có thể xem bảng xếp hạng và tạo phòng phát mới.");
                          }
                        }}
                      >
                        <div className={styles.cardTop}>
                          {stream.status === "LIVE" ? (
                            <span className="live-badge">TRỰC TIẾP</span>
                          ) : (
                            <span style={{ background: "#374151", color: "#d1d5db", padding: "4px 10px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: "700" }}>
                              ĐÃ KẾT THÚC
                            </span>
                          )}

                          <span style={{ background: "rgba(157, 78, 221, 0.2)", border: "1px solid var(--color-primary)", color: "var(--color-primary)", padding: "2px 8px", borderRadius: "6px", fontSize: "0.7rem", fontWeight: "700" }}>
                            {categoryLabel}
                          </span>

                          <span className={styles.statsBadge}>
                            {stream.status === "LIVE" ? (
                              <>👤 {stream.viewerCount} xem</>
                            ) : (
                              <>✨ {stream.totalStars} sao</>
                            )}
                          </span>
                        </div>

                        <div className={styles.cardBottom}>
                          <h3 className={styles.streamTitle}>{stream.title}</h3>
                          <div className={styles.streamerInfo}>
                            <img src={stream.streamer.avatarUrl} alt={stream.streamer.displayName} className={styles.streamerAvatar} />
                            <div style={{ display: "flex", flexDirection: "column" }}>
                              <span className={styles.streamerName}>
                                Phát bởi <strong>{stream.streamer.displayName}</strong>
                              </span>
                              <span style={{ fontSize: "0.7rem", color: streamerLevelInfo.color, fontWeight: "bold" }}>
                                {streamerLevelInfo.title} (Lvl {streamerLevelInfo.level})
                              </span>
                            </div>
                          </div>
                          {stream.status === "LIVE" && (
                            <span style={{ color: "var(--color-secondary)", fontSize: "0.85rem", fontWeight: "700", textAlign: "right" }}>
                              Xem ngay ➔
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Sidebar Bảng xếp hạng bên phải (Top KOLs Sidebar) */}
            <aside className={styles.topKOLsSidebar}>
              <div className="premium-card" style={{ background: "linear-gradient(180deg, var(--bg-surface) 0%, rgba(20, 20, 28, 0.4) 100%)" }}>
                <h3 style={{ fontSize: "1.15rem", fontWeight: "800", marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px", color: "var(--color-accent)" }}>
                  <span>🏆</span> SIÊU SAO KOL TUẦN NÀY
                </h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "15px", lineHeight: "1.4" }}>
                  Bảng vinh danh 5 KOL nhận được nhiều sao nhất trên hệ thống LiveStar.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {topKOLs.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "20px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      Chưa có dữ liệu xếp hạng.
                    </div>
                  ) : (
                    topKOLs.map((kol, idx) => {
                      const levelInfo = getStreamerLevel(kol.starsEarned);
                      const isTop3 = idx < 3;
                      const rankClass = idx === 0 ? styles.kolRank1 : idx === 1 ? styles.kolRank2 : idx === 2 ? styles.kolRank3 : "";
                      
                      return (
                        <div key={kol.id} className={styles.topKOLCard}>
                          <span className={`${styles.kolRank} ${rankClass}`}>
                            {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : idx + 1}
                          </span>
                          <div className={styles.kolMeta}>
                            <img src={kol.avatarUrl} alt={kol.displayName} className={styles.kolAvatar} style={{ borderColor: isTop3 ? levelInfo.color : "transparent" }} />
                            <div style={{ display: "flex", flexDirection: "column" }}>
                              <span className={styles.kolName}>{kol.displayName}</span>
                              <span style={{ fontSize: "0.7rem", color: levelInfo.color, fontWeight: "bold" }}>
                                {levelInfo.title}
                              </span>
                            </div>
                          </div>
                          <span className={styles.kolStars}>
                            🪙 {kol.starsEarned.toLocaleString()}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Góc kiến thức */}
              <div className="premium-card" style={{ borderLeft: "4px solid var(--color-secondary)" }}>
                <h4 style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--color-secondary)", marginBottom: "8px" }}>
                  🧠 THÔNG TIN BẢO MẬT HỆ THỐNG
                </h4>
                <ul style={{ fontSize: "0.8rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "8px", paddingLeft: "15px" }}>
                  <li>
                    <strong>ACID Transactions:</strong> Quy trình tặng sao giữa Viewer và Streamer được bọc trong giao dịch cơ sở dữ liệu Postgres để cam đoan số dư của viewer không bị trừ nếu tài khoản của streamer không cộng được sao thành công.
                  </li>
                  <li>
                    <strong>UUID Protection:</strong> Mã phòng live được mã hóa UUID hoàn toàn nhằm ngăn chặn tin tặc quét lộ thông tin ID liên tiếp (ID Enumeration).
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </main>
      </div>

      {/* Modal Tạo Livestream */}
      {showCreateModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCreateModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>🎥 Bắt đầu phòng Livestream</h3>
            <form onSubmit={handleCreateStream}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Tiêu đề Livestream *</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Ví dụ: Alice Live Ca Nhạc Theo Yêu Cầu..."
                  value={newStreamTitle}
                  onChange={(e) => setNewStreamTitle(e.target.value)}
                  maxLength={100}
                  required
                />
              </div>

              <div className={styles.formGroup} style={{ marginTop: "15px" }}>
                <label className={styles.label}>Danh mục chủ đề *</label>
                <select
                  className={styles.input}
                  value={newStreamCategory}
                  onChange={(e) => setNewStreamCategory(e.target.value)}
                  required
                  style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}
                >
                  <option value="Talkshow">Trò chuyện 💬</option>
                  <option value="Music">Âm nhạc 🎵</option>
                  <option value="Gaming">Trò chơi 🎮</option>
                  <option value="Comedy">Hài kịch 🎭</option>
                </select>
              </div>

              <div className={styles.formGroup} style={{ marginTop: "15px" }}>
                <label className={styles.label}>Lời chào / Mô tả phòng live</label>
                <textarea
                  className={styles.textarea}
                  placeholder="Viết một vài mô tả thu hút người xem..."
                  value={newStreamDesc}
                  onChange={(e) => setNewStreamDesc(e.target.value)}
                  maxLength={200}
                />
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className="glow-btn-secondary"
                  onClick={() => setShowCreateModal(false)}
                  disabled={submitting}
                  style={{ padding: "8px 16px" }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="glow-btn-primary"
                  disabled={submitting}
                  style={{ padding: "8px 16px", background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
                >
                  {submitting ? "Đang khởi tạo..." : "Bắt đầu Phát ➔"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Mobile Bottom Navigation Bar */}
      <nav className={styles.bottomNav}>
        <button className={`${styles.bottomNavItem} ${styles.bottomNavItemActive}`} type="button">
          <span className={styles.bottomNavIcon}>🏠</span>
          <span className={styles.bottomNavLabel}>Trang chủ</span>
        </button>
        <button className={styles.bottomNavItem} onClick={() => alert("Tính năng Game Center đang phát triển!")} type="button">
          <span className={styles.bottomNavIcon}>🎮</span>
          <span className={styles.bottomNavLabel}>Games</span>
        </button>
        <button className={styles.bottomNavItem} onClick={() => {
          const el = document.getElementById("top-kols-section");
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} type="button">
          <span className={styles.bottomNavIcon}>🏆</span>
          <span className={styles.bottomNavLabel}>Siêu sao</span>
        </button>
        <button className={styles.bottomNavItem} onClick={() => {
          if (!currentUser) {
            alert("Vui lòng đăng nhập trước khi truy cập Kênh của tôi!");
          } else {
            router.push(`/streamer`);
          }
        }} type="button">
          <span className={styles.bottomNavIcon}>👤</span>
          <span className={styles.bottomNavLabel}>Kênh</span>
        </button>
      </nav>
    </div>
  );
}
