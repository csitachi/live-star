// Trang chủ hệ thống LiveStar - Entertainment Portal.
// Hỗ trợ chọn danh tính trải nghiệm, xem danh sách phòng Live theo danh mục, xem BXH KOL, và tạo phòng livestream mới.

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { getStreamerLevel } from "@/lib/level";
import PostList from "@/features/profile/components/PostList";
import QuestDrawer from "@/components/QuestDrawer";
import { useToast } from "@/components/Toast/ToastContext";
import { 
  HomeIcon, 
  LiveIcon, 
  GameIcon, 
  ProfileIcon, 
  SettingsIcon, 
  LogoutIcon, 
  SearchIcon, 
  CoinIcon, 
  CompassIcon, 
  StarIcon, 
  TrophysIcon,
  PlusIcon
} from "@/components/Icons";

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
  const toast = useToast();
  
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
  const [sandboxUser, setSandboxUser] = useState("bob");
  const [activeTab, setActiveTab] = useState<"feed" | "live">("feed");
  const [feedType, setFeedType] = useState<"explore" | "global">("explore");

  // Trạng thái Modal Đăng nhập / Đăng ký bằng Username & Password
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [authUsername, setAuthUsername] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authDisplayName, setAuthDisplayName] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Trạng thái tìm kiếm phòng live, streamer
  const [searchQuery, setSearchQuery] = useState("");

  // Trạng thái hiển thị ngăn kéo Nhiệm vụ
  const [showQuests, setShowQuests] = useState(false);

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
        toast.success(`Chào mừng ${data.user.displayName}`, "Đăng nhập Google thành công");
        fetchStreams(selectedCategory);
        fetchTopKOLs();
      } else {
        const err = await res.json();
        toast.error(err.error || "Xác thực Google thất bại!");
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
        toast.success(`Chào mừng ${data.user.displayName}`, "Đăng nhập Sandbox thành công");
        fetchStreams(selectedCategory);
        fetchTopKOLs();
      } else {
        toast.error("Đăng nhập Sandbox thất bại!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Đăng nhập Sandbox với Username tùy chọn
  const handleSandboxLoginWithUsername = async () => {
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: sandboxUser })
      });
      if (res.ok) {
        const user = await res.json();
        setCurrentUser(user);
        toast.success(`Chào mừng ${user.displayName}`, "Đăng nhập Sandbox thành công");
        fetchStreams(selectedCategory);
        fetchTopKOLs();
      } else {
        const err = await res.json();
        toast.error(err.error || "Đăng nhập Sandbox thất bại!");
      }
    } catch (e) {
      console.error("Lỗi đăng nhập sandbox:", e);
      toast.error("Đã xảy ra lỗi hệ thống!");
    }
  };

  // Đăng nhập/Đăng ký bằng Username & Password
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      const endpoint = authTab === "login" ? "/api/auth/login" : "/api/auth/register";
      const payload = authTab === "login" 
        ? { username: authUsername, password: authPassword }
        : { username: authUsername, password: authPassword, displayName: authDisplayName };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setCurrentUser(data.user);
        toast.success(
          `Chào mừng ${data.user.displayName}`,
          `${authTab === "login" ? "Đăng nhập" : "Đăng ký"} thành công`
        );
        setShowAuthModal(false);
        // Reset form
        setAuthUsername("");
        setAuthPassword("");
        setAuthDisplayName("");
        fetchStreams(selectedCategory);
        fetchTopKOLs();
      } else {
        setAuthError(data.error || "Có lỗi xảy ra!");
      }
    } catch (err) {
      console.error("Lỗi xác thực:", err);
      setAuthError("Lỗi kết nối máy chủ!");
    } finally {
      setAuthLoading(false);
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
        toast.success("Đã đăng xuất tài khoản!");
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
        toast.success(`Đã nạp thành công 1000 sao! Số dư mới: ${data.starBalance} sao.`, "Nạp sao thành công");
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
      toast.warning("Vui lòng nhập tiêu đề livestream!");
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
        router.push(`/streamer/live/${newStream.id}`);
      } else {
        const err = await res.json();
        toast.error(err.error || "Không thể tạo phòng stream!");
      }
    } catch (error) {
      console.error("Lỗi tạo stream:", error);
      toast.error("Đã xảy ra lỗi hệ thống!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header chính */}
      <header className={styles.header}>
        <div className={styles.logo} onClick={() => router.push("/")} style={{ cursor: "pointer" }}>
          <StarIcon size={24} fill="var(--color-secondary)" className={styles.logoIconSvg} />
          <span>LiveStar</span>
        </div>

        {/* Ô Tìm kiếm Hoạt động Thực tế */}
        <div className={styles.searchBar}>
          <SearchIcon size={18} className={styles.searchIconSvg} />
          <input 
            type="text" 
            placeholder="Tìm phòng live, tên idol..." 
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {currentUser ? (
          <div className={`${styles.userPanel} glass`}>
            <img 
              src={currentUser.avatarUrl} 
              alt={currentUser.displayName} 
              className={styles.avatar} 
              onClick={() => router.push(`/profile/${currentUser.username}`)}
              style={{ cursor: "pointer" }}
            />
            <div 
              className={styles.userInfo}
              onClick={() => router.push(`/profile/${currentUser.username}`)}
              style={{ cursor: "pointer" }}
            >
              <span className={styles.username}>{currentUser.displayName}</span>
              <span className={styles.balance}>
                <CoinIcon size={14} className={styles.coinIconSvg} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '2px' }} /> {currentUser.starBalance.toLocaleString()} sao
              </span>
            </div>
            <button className={styles.rechargeBtn} onClick={handleRecharge}>
              <PlusIcon size={12} style={{ marginRight: '2px' }} /> Nạp Sao
            </button>
            <button className="glow-btn-secondary" onClick={handleLogout} style={{ padding: "6px 12px", fontSize: "0.8rem", marginLeft: "10px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <LogoutIcon size={14} />
              Đăng xuất
            </button>
          </div>
        ) : (
          <button 
            className="glow-btn-primary" 
            onClick={() => {
              setAuthTab("login");
              setAuthError("");
              setShowAuthModal(true);
            }}
            style={{ 
              padding: "10px 20px", 
              fontSize: "0.85rem", 
              margin: 0,
              background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))"
            }}
          >
            🔑 Đăng nhập / Đăng ký
          </button>
        )}
      </header>

      {/* Main Layout Body */}
      <div className={styles.mainLayoutBody}>
        {/* Left Sidebar Menu */}
        <aside className={styles.sidebarMenu}>
          <div className={styles.menuGroup}>
            <button 
              className={`${styles.menuItem} ${activeTab === 'feed' ? styles.menuItemActive : ''}`}
              onClick={() => setActiveTab('feed')}
              type="button"
            >
              <HomeIcon size={20} className={styles.menuIconSvg} />
              <span className={styles.menuLabel}>Bảng tin chung</span>
            </button>
            <button 
              className={`${styles.menuItem} ${activeTab === 'live' ? styles.menuItemActive : ''}`}
              onClick={() => setActiveTab('live')}
              type="button"
            >
              <LiveIcon size={20} className={styles.menuIconSvg} />
              <span className={styles.menuLabel}>Xem Livestream</span>
            </button>
            <button className={styles.menuItem} onClick={() => toast.info("Tính năng Game Center đang phát triển!")} type="button">
              <GameIcon size={20} className={styles.menuIconSvg} />
              <span className={styles.menuLabel}>Game Center</span>
            </button>
            <button className={styles.menuItem} onClick={() => {
              if (!currentUser) {
                toast.warning("Vui lòng đăng nhập trước khi truy cập trang cá nhân!");
              } else {
                router.push(`/profile/${currentUser.username}`);
              }
            }} type="button">
              <ProfileIcon size={20} className={styles.menuIconSvg} />
              <span className={styles.menuLabel}>Trang cá nhân</span>
            </button>
          </div>
          <div className={styles.sidebarDivider} />
          <div className={styles.menuGroup}>
            <button className={styles.menuItem} onClick={() => {
              if (!currentUser) {
                toast.warning("Vui lòng đăng nhập trước khi phát livestream!");
              } else {
                router.push(`/streamer/setup`);
              }
            }} type="button">
              <SettingsIcon size={20} className={styles.menuIconSvg} />
              <span className={styles.menuLabel}>Thiết lập Live</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className={styles.mainContentContent}>
          {/* Hero section: Glassmorphism Entertainment Spotlight */}
          <section className={styles.hero} style={{ background: "linear-gradient(135deg, rgba(157, 78, 221, 0.2) 0%, rgba(255, 0, 127, 0.1) 50%, rgba(11, 11, 15, 0.5) 100%)", padding: "48px 40px", width: "100%", border: "1px solid rgba(255, 255, 255, 0.08)", boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)", borderRadius: "24px", display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
            <div className={styles.heroGrid}>
              
              {/* Cột Trái: Thông tin & CTA */}
              <div className={styles.heroContent}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255, 0, 127, 0.12)", border: "1px solid rgba(255, 0, 127, 0.25)", color: "var(--color-secondary)", padding: "6px 14px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1.5px" }}>
                  <span className="live-dot" style={{ display: 'inline-block', width: '6px', height: '6px', background: 'var(--color-secondary)', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></span>
                  🔥 LIVE ARENA | Nền tảng LiveStream thế hệ mới
                </div>
                <h1 className={styles.heroTitle} style={{ margin: 0, textAlign: "left", lineHeight: "1.25", background: "linear-gradient(135deg, #fff 30%, #d8b4fe 70%, #ff007f 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  KOL Livestream & <br />Nhận Sao Độc Quyền
                </h1>
                <p className={styles.heroSubtitle} style={{ margin: 0, textAlign: "left", fontSize: "1rem", color: "var(--text-secondary)", maxWidth: "100%" }}>
                  Nơi tụ hội của những tài năng âm nhạc, trò chơi và diễn thuyết hàng đầu. Theo dõi thần tượng yêu thích, tương tác thời gian thực và tặng sao nhận quà cực độc!
                </p>

                {/* Các Phương Thức Đăng Nhập / Trạng Thế User */}
                <div style={{ width: "100%", marginTop: "5px" }}>
                  {!currentUser ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
                      <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", margin: 0, fontWeight: "600" }}>
                        🔑 Đăng nhập để nhận ngay 1,000 sao trải nghiệm:
                      </p>
                      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", width: "100%", alignItems: "center" }}>
                        {/* Nút Google thật */}
                        <div id="google-signin-btn"></div>

                        {/* Nút Đăng nhập/Đăng ký Username/Password */}
                        <button 
                          className="glow-btn-secondary" 
                          onClick={() => {
                            setAuthTab("login");
                            setAuthError("");
                            setShowAuthModal(true);
                          }}
                          style={{ 
                            padding: "10px 20px", 
                            fontSize: "0.85rem", 
                            margin: 0, 
                            border: "1px solid rgba(255, 255, 255, 0.12)",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            background: "rgba(255, 255, 255, 0.05)",
                            borderRadius: "12px"
                          }}
                        >
                          🔑 Đăng nhập bằng tài khoản
                        </button>
                        
                        {/* Chọn User Sandbox */}
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(255, 255, 255, 0.04)", padding: "6px 14px", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                          <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "bold" }}>Sandbox:</span>
                          <select 
                            value={sandboxUser} 
                            onChange={(e) => setSandboxUser(e.target.value)}
                            style={{ padding: "6px 10px", background: "#111", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "8px", color: "#fff", cursor: "pointer", fontSize: "0.8rem" }}
                          >
                            <option value="bob">Bob (Viewer)</option>
                            <option value="charlie">Charlie (Fan Cứng)</option>
                            <option value="dave">Dave (Newbie)</option>
                          </select>
                          <button 
                            className="glow-btn-primary" 
                            onClick={handleSandboxLoginWithUsername}
                            style={{ padding: "6px 12px", background: "linear-gradient(135deg, #4285F4, #ff007f)", fontSize: "0.8rem", margin: 0, borderRadius: "8px" }}
                          >
                            🚀 Vào
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <p style={{ fontSize: "0.95rem", color: "var(--success)", display: "flex", alignItems: "center", gap: "6px", margin: 0 }}>
                        <span style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--success)', borderRadius: '50%' }}></span>
                        <span>Đã đăng nhập:</span> <strong>{currentUser.displayName}</strong>
                      </p>
                      <div>
                        <button className="glow-btn-primary" onClick={() => router.push("/streamer/setup")} style={{ padding: "12px 24px", background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", boxShadow: "0 4px 15px rgba(157, 78, 221, 0.4)", margin: 0 }}>
                          🎥 Bắt đầu phòng phát Live của bạn
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Cột Phải: Mockup Stream Promo Card */}
              <div className={styles.heroVisual}>
                <div className={styles.promoCard}>
                  {/* Thumbnail Mockup */}
                  <div className={styles.promoThumbnail}>
                    <div className={styles.promoWaveGlow}></div>
                    <div className={styles.promoLiveBadge}>🔴 Live</div>
                    <div className={styles.promoViewers}>👁️ 1.4K xem</div>
                    <div className={styles.promoOverlayText}>
                      <h4 className={styles.promoTitle}>PK Battle Arena: Top 1 Streamer vs Challenger ⚔️</h4>
                    </div>
                  </div>
                  {/* Streamer Info Footer */}
                  <div className={styles.promoFooter}>
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" 
                      alt="Alice Streamer" 
                      className={styles.promoAvatar} 
                    />
                    <div className={styles.promoInfo}>
                      <span className={styles.promoName}>Alice Streamer 🎥</span>
                      <span className={styles.promoCategory}>Talkshow & Music</span>
                    </div>
                    <div className={styles.promoStarsGlow}>
                      ⭐ 350 sao
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Main Layout: Thể loại luồng live bên trái + BXH KOL bên phải */}
          <div className={styles.homepageBody} id="top-kols-section">
            {/* Streams container bên trái */}
            <div className={styles.streamsContainer}>
              {activeTab === "feed" ? (
                <>
                  {/* Bong bóng Streamer Đang Live (Live Stories style) */}
                  <div className={styles.storiesContainer}>
                    <h3 className={styles.storiesHeader}>
                      <span className={styles.livePulseDot}></span>
                      STREAMERS ĐANG LIVE
                    </h3>
                    <div className={styles.storiesList}>
                      {streams.filter(s => s.status === 'LIVE').length === 0 ? (
                        <div className={styles.emptyStories}>
                          Chưa có ai lên sóng. Hãy bắt đầu live đầu tiên! 🎙️
                        </div>
                      ) : (
                        streams.filter(s => s.status === 'LIVE').map((stream) => (
                          <div 
                            key={stream.id} 
                            onClick={() => router.push(`/viewer/${stream.id}`)}
                            className={styles.storyCard}
                          >
                            <div className={styles.storyAvatarOuter}>
                              <div className={styles.storyAvatarInner}>
                                <img 
                                  src={stream.streamer.avatarUrl} 
                                  alt={stream.streamer.displayName} 
                                  className={styles.storyAvatarImg}
                                />
                              </div>
                              <span className={styles.storyLiveDot}></span>
                            </div>
                            <span className={styles.storyName}>
                              {stream.streamer.displayName}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Thanh tab chọn loại Feed (Mạng xã hội style) */}
                  <div className={styles.feedTabs}>
                    <button
                      className={`${styles.feedTab} ${feedType === 'explore' ? styles.feedTabActive : ''}`}
                      onClick={() => setFeedType('explore')}
                    >
                      <CompassIcon size={18} />
                      <span>Dành cho bạn</span>
                    </button>
                    <button
                      className={`${styles.feedTab} ${feedType === 'global' ? styles.feedTabActive : ''}`}
                      onClick={() => setFeedType('global')}
                    >
                      <HomeIcon size={18} />
                      <span>Mới nhất</span>
                    </button>
                  </div>

                  {/* Bảng tin chung */}
                  <PostList feedType={feedType} currentUserId={currentUser?.id} />
                </>
              ) : (
                <>
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
                  ) : (() => {
                    const filteredStreams = streams.filter(
                      (stream) =>
                        stream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        stream.streamer.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        stream.streamer.username.toLowerCase().includes(searchQuery.toLowerCase())
                    );

                    if (streams.length === 0) {
                      return (
                        <div style={{ textAlign: "center", padding: "60px", background: "var(--bg-surface)", borderRadius: "16px", color: "var(--text-secondary)", border: "1px dashed var(--border-subtle)" }}>
                          Chưa có phòng stream nào thuộc danh mục này. Hãy là người đầu tiên phát sóng!
                        </div>
                      );
                    }

                    if (filteredStreams.length === 0) {
                      return (
                        <div style={{ textAlign: "center", padding: "60px", background: "var(--bg-surface)", borderRadius: "16px", color: "var(--text-secondary)", border: "1px dashed var(--border-subtle)" }}>
                          🔍 Không tìm thấy phòng stream nào phù hợp với từ khóa &quot;{searchQuery}&quot;.
                        </div>
                      );
                    }

                    return (
                      <div className={styles.grid}>
                        {filteredStreams.map((stream) => {
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
                    );
                  })()}
                </>
              )}
            </div>

            {/* Sidebar Bảng xếp hạng bên phải (Top KOLs Sidebar) */}
            <aside className={styles.topKOLsSidebar}>
              <div className="premium-card" style={{ background: "linear-gradient(180deg, var(--bg-surface) 0%, rgba(20, 20, 28, 0.4) 100%)" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "800", marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px", color: "var(--color-accent)" }}>
                  <TrophysIcon size={20} style={{ color: "var(--color-accent)" }} />
                  <span>SIÊU SAO KOL TUẦN NÀY</span>
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
                        <div 
                          key={kol.id} 
                          className={styles.topKOLCard}
                          onClick={() => router.push(`/profile/${kol.username}`)}
                          style={{ cursor: "pointer" }}
                        >
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
                            <CoinIcon size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '2px', color: 'var(--color-accent)' }} /> {kol.starsEarned.toLocaleString()}
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

      {/* Modal Đăng Nhập / Đăng Ký bằng Username & Password */}
      {showAuthModal && (
        <div className={styles.modalOverlay} onClick={() => setShowAuthModal(false)}>
          <div 
            className={styles.modalContent} 
            onClick={(e) => e.stopPropagation()} 
            style={{ 
              maxWidth: "420px", 
              background: "rgba(20, 20, 28, 0.9)", 
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(157, 78, 221, 0.25)"
            }}
          >
            {/* Modal Tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", paddingBottom: "10px", justifyContent: "space-around" }}>
              <button 
                type="button"
                onClick={() => { setAuthTab("login"); setAuthError(""); }}
                style={{ 
                  background: "none", 
                  border: "none", 
                  color: authTab === "login" ? "var(--color-primary)" : "var(--text-secondary)", 
                  fontSize: "1.2rem", 
                  fontWeight: "bold", 
                  cursor: "pointer",
                  paddingBottom: "6px",
                  borderBottom: authTab === "login" ? "3px solid var(--color-primary)" : "none",
                  transition: "all var(--transition-fast)"
                }}
              >
                Đăng Nhập
              </button>
              <button 
                type="button"
                onClick={() => { setAuthTab("register"); setAuthError(""); }}
                style={{ 
                  background: "none", 
                  border: "none", 
                  color: authTab === "register" ? "var(--color-primary)" : "var(--text-secondary)", 
                  fontSize: "1.2rem", 
                  fontWeight: "bold", 
                  cursor: "pointer",
                  paddingBottom: "6px",
                  borderBottom: authTab === "register" ? "3px solid var(--color-primary)" : "none",
                  transition: "all var(--transition-fast)"
                }}
              >
                Đăng Ký
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "10px" }}>
              {authError && (
                <div style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid var(--error)", color: "var(--error)", padding: "10px", borderRadius: "8px", fontSize: "0.85rem", textAlign: "center" }}>
                  ⚠️ {authError}
                </div>
              )}

              <div className={styles.formGroup}>
                <label className={styles.label}>Tên đăng nhập (Username)</label>
                <input 
                  type="text" 
                  className={styles.input} 
                  value={authUsername}
                  onChange={(e) => setAuthUsername(e.target.value)}
                  placeholder="Ví dụ: myusername (3-20 ký tự)..."
                  required
                />
              </div>

              {authTab === "register" && (
                <div className={styles.formGroup}>
                  <label className={styles.label}>Tên hiển thị (Display Name)</label>
                  <input 
                    type="text" 
                    className={styles.input} 
                    value={authDisplayName}
                    onChange={(e) => setAuthDisplayName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Văn A..."
                    required
                  />
                </div>
              )}

              <div className={styles.formGroup}>
                <label className={styles.label}>Mật khẩu (Password)</label>
                <input 
                  type="password" 
                  className={styles.input} 
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)..."
                  required
                />
              </div>

              <div className={styles.modalActions} style={{ marginTop: "15px", justifyContent: "space-between", alignItems: "center" }}>
                <button
                  type="button"
                  className="glow-btn-secondary"
                  onClick={() => setShowAuthModal(false)}
                  disabled={authLoading}
                  style={{ padding: "8px 16px" }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="glow-btn-primary"
                  disabled={authLoading}
                  style={{ 
                    padding: "8px 20px", 
                    background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                    boxShadow: "0 4px 15px rgba(255, 0, 127, 0.3)"
                  }}
                >
                  {authLoading ? "Đang xử lý..." : authTab === "login" ? "Đăng Nhập ➔" : "Đăng Ký ➔"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <nav className={styles.bottomNav}>
        <button className={`${styles.bottomNavItem} ${styles.bottomNavItemActive}`} type="button">
          <HomeIcon size={20} className={styles.bottomNavIconSvg} />
          <span className={styles.bottomNavLabel}>Trang chủ</span>
        </button>
        <button className={styles.bottomNavItem} onClick={() => toast.info("Tính năng Game Center đang phát triển!")} type="button">
          <GameIcon size={20} className={styles.bottomNavIconSvg} />
          <span className={styles.bottomNavLabel}>Games</span>
        </button>
        <button className={styles.bottomNavItem} onClick={() => {
          const el = document.getElementById("top-kols-section");
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} type="button">
          <TrophysIcon size={20} className={styles.bottomNavIconSvg} />
          <span className={styles.bottomNavLabel}>Siêu sao</span>
        </button>
        <button className={styles.bottomNavItem} onClick={() => {
          if (!currentUser) {
            toast.warning("Vui lòng đăng nhập trước khi truy cập Kênh của tôi!");
          } else {
            router.push(`/streamer/setup`);
          }
        }} type="button">
          <ProfileIcon size={20} className={styles.bottomNavIconSvg} />
          <span className={styles.bottomNavLabel}>Kênh</span>
        </button>
      </nav>

      {/* Floating Quest Button */}
      {currentUser && (
        <button
          onClick={() => setShowQuests(true)}
          style={{
            position: "fixed",
            bottom: "80px",
            right: "24px",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #f43f5e 0%, #2563eb 100%)",
            color: "#ffffff",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(244, 63, 94, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 900,
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.1) rotate(5deg)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1) rotate(0deg)";
          }}
          title="Nhiệm vụ hàng ngày"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </button>
      )}

      {/* Quest Drawer Panel */}
      {currentUser && (
        <QuestDrawer
          isOpen={showQuests}
          onClose={() => setShowQuests(false)}
          onBalanceUpdate={(newBalance) => {
            setCurrentUser({ ...currentUser, starBalance: newBalance });
          }}
        />
      )}
    </div>
  );
}
