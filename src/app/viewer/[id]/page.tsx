// Trang Viewer Room (Giao diện người xem).
// Hỗ trợ xem trực tiếp qua WebRTC/Canvas, chat thời gian thực, nạp sao, chơi vòng quay may mắn, chọn quà và gửi tặng sao với hiệu ứng đặc biệt.

"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./page.module.css";

// Nhập các Component đã chia tách độc lập
import LiveChat, { ChatMessage } from "@/components/LiveChat";
import Leaderboard, { LeaderboardEntry } from "@/components/Leaderboard";
import GiftSelector, { GiftTier } from "@/components/GiftSelector";
import GiftAnimationCanvas from "@/components/GiftAnimationCanvas";
import { getViewerLevel, getStreamerLevel } from "@/lib/level";

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
  streamer: {
    displayName: string;
    avatarUrl: string;
    starsGifted: number;
    starsEarned: number;
  };
}

// STUN Server của Google để hỗ trợ xác lập đường truyền WebRTC
const WEBRTC_ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
  ],
};

// Định nghĩa 5 gói quà tặng sao mẫu
const GIFT_TIERS: GiftTier[] = [
  { amount: 1, icon: "⭐", label: "Sao Lẻ", price: 1 },
  { amount: 10, icon: "✨", label: "Bão Sao", price: 10 },
  { amount: 100, icon: "💎", label: "Kim Cương", price: 100 },
  { amount: 500, icon: "🚀", label: "Tên Lửa", price: 500 },
  { amount: 1000, icon: "👑", label: "Vương Miện", price: 1000 },
];

export default function ViewerPage() {
  const router = useRouter();
  const params = useParams();
  const streamId = params.id as string;

  // State quản lý thông tin tải trang
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [stream, setStream] = useState<Stream | null>(null);
  const [loading, setLoading] = useState(true);
  
  // State cập nhật thời gian thực
  const [viewerCount, setViewerCount] = useState(0);
  const [totalStars, setTotalStars] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  
  // State Gửi chat & Tặng sao
  const [inputMsg, setInputMsg] = useState("");
  const [selectedGiftIndex, setSelectedGiftIndex] = useState(0);
  const [giftMessage, setGiftMessage] = useState("");
  const [gifting, setGifting] = useState(false);
  const [activeGiftToast, setActiveGiftToast] = useState<any | null>(null);

  // Trạng thái Minigame Vòng quay may mắn
  const [showWheel, setShowWheel] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [isWheelSpinning, setIsWheelSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState<{ stars: number; label: string } | null>(null);

  // Lưu trữ sự kiện quà tặng cuối cùng để kích hoạt hoạt họa Canvas bay sao reactive
  const [lastGiftEvent, setLastGiftEvent] = useState<{ id: string; amount: number } | null>(null);

  // Refs WebSockets, WebRTC và Canvas hoạt họa
  const wsRef = useRef<WebSocket | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Canvas hiển thị luồng giả lập
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // 1. Khởi chạy trang: Xác thực danh tính bằng Cookie và lấy dữ liệu ban đầu
  useEffect(() => {
    const initViewer = async () => {
      try {
        // Tải thông tin người dùng xem bằng Session Cookie
        const userRes = await fetch("/api/auth/me");
        if (!userRes.ok) throw new Error();
        const authData = await userRes.json();
        
        if (!authData.authenticated || !authData.user) {
          alert("Vui lòng đăng nhập tại Trang chủ trước!");
          router.push("/");
          return;
        }

        const userData = authData.user;
        setCurrentUser(userData);

        // Tải chi tiết stream, bình luận cũ và bảng xếp hạng từ PostgreSQL
        const detailRes = await fetch(`/api/streams/${streamId}`);
        if (!detailRes.ok) {
          alert("Không tìm thấy thông tin livestream này!");
          router.push("/");
          return;
        }

        const detailData = await detailRes.json();
        setStream(detailData.stream);
        setTotalStars(detailData.stream.totalStars);
        setViewerCount(detailData.stream.viewerCount);
        setMessages(detailData.comments);
        setLeaderboard(detailData.leaderboard);
        setLoading(false);

        // Chỉ thiết lập kết nối thời gian thực nếu stream đang LIVE
        if (detailData.stream.status === "LIVE") {
          connectWebSocket(userData, streamId);
        }
      } catch (err) {
        console.error("Lỗi khởi tạo viewer page:", err);
        router.push("/");
      }
    };

    initViewer();

    return () => {
      if (wsRef.current) wsRef.current.close();
      if (pcRef.current) pcRef.current.close();
      stopCanvasAnimation();
    };
  }, [streamId]);

  // 2. Kết nối WebSocket phục vụ Real-time
  const connectWebSocket = (user: User, roomId: string) => {
    if (wsRef.current) {
      wsRef.current.close();
    }
    // Cấu hình linh hoạt URL WebSocket động theo Host hiện tại của trình duyệt để tránh lỗi kết nối chéo IP
    const protocol = typeof window !== "undefined" && window.location.protocol === "https:" ? "wss:" : "ws:";
    const host = typeof window !== "undefined" ? window.location.hostname : "localhost";
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || `${protocol}//${host}:3001`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("🟢 Viewer đã kết nối tới WebSocket Gateway");
      ws.send(JSON.stringify({
        type: "join-room",
        payload: {
          streamId: roomId,
          isStreamer: false,
          user: {
            id: user.id,
            username: user.username,
            displayName: user.displayName,
            avatarUrl: user.avatarUrl,
            starsGifted: user.starsGifted,
            starsEarned: user.starsEarned
          }
        }
      }));
    };

    ws.onmessage = async (event) => {
      try {
        const { type, payload } = JSON.parse(event.data);
        console.log(`📩 Nhận sự kiện [${type}]:`, payload);

        switch (type) {
          case "room-stats":
            setViewerCount(payload.viewerCount);
            break;

          case "star-update":
            setTotalStars(payload.totalStars);
            break;

          case "chat-message":
            // Thêm bình luận mới vào danh sách hiển thị
            setMessages((prev) => [...prev, payload]);
            scrollToBottom();
            break;

          case "gift-broadcast":
            // 1. Cập nhật tổng số sao nhận được của streamer
            setTotalStars(payload.totalStars);
            
            // 2. Hiển thị toast tặng quà bay lên ở góc
            setActiveGiftToast({
              senderName: payload.sender.displayName,
              avatarUrl: payload.sender.avatarUrl,
              starAmount: payload.starAmount,
              message: payload.message
            });

            // 3. Thêm bản ghi chat đặc biệt vào luồng bình luận
            setMessages((prev) => [...prev, {
              id: payload.id,
              sender: payload.sender,
              text: payload.message 
                ? `Đã tặng ${payload.starAmount} sao! 🌟 "${payload.message}"` 
                : `Đã tặng ${payload.starAmount} sao! 🌟`,
              createdAt: payload.createdAt,
              isGift: true,
              giftStars: payload.starAmount
            }]);
            scrollToBottom();

            // 4. KÍCH HOẠT HIỆU ỨNG HẠT HOẠT HỌA BAY LÊN TRÊN CANVAS QUA STATE
            setLastGiftEvent({ id: payload.id, amount: payload.starAmount });

            // 5. Cập nhật Bảng xếp hạng Leaderboard thời gian thực (tránh reload trang)
            updateLeaderboardInRealtime(payload.sender, payload.starAmount);
            break;

          // ==========================================
          // KIẾN THỨC BE: XÁC LẬP KẾT NỐI WEBRTC VIEWER
          // ==========================================
          case "webrtc-offer":
            console.log("📡 Nhận WebRTC Offer từ Streamer. Đang thiết lập PeerConnection...");
            handleWebRTCOffer(payload.sdp, payload.senderSocketId);
            break;

          case "webrtc-candidate":
            if (pcRef.current) {
              await pcRef.current.addIceCandidate(new RTCIceCandidate(payload.candidate));
            }
            break;

          case "stream-ended":
            alert("Streamer đã kết thúc buổi phát trực tiếp!");
            setStream((prev) => prev ? { ...prev, status: "ENDED" } : null);
            if (pcRef.current) pcRef.current.close();
            stopCanvasAnimation();
            break;

          case "stream-disconnected":
            console.warn("Streamer tạm thời ngắt kết nối.");
            if (videoRef.current) videoRef.current.srcObject = null;
            startCanvasAnimation();
            break;
        }
      } catch (err) {
        console.error("Lỗi xử lý WebSocket:", err);
      }
    };
  };

  // Cuộn khung chat xuống dưới cùng
  const scrollToBottom = () => {
    setTimeout(() => {
      const chatMessages = document.getElementById("chat-messages-container");
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    }, 100);
  };

  // Cập nhật BXH người tặng sao cục bộ thời gian thực
  const updateLeaderboardInRealtime = (sender: any, starAmount: number) => {
    setLeaderboard((prev) => {
      const copy = [...prev];
      const exist = copy.find((e) => e.senderId === sender.id);
      
      if (exist) {
        exist.totalStars += starAmount;
      } else {
        copy.push({
          senderId: sender.id,
          displayName: sender.displayName,
          avatarUrl: sender.avatarUrl,
          totalStars: starAmount
        });
      }
      
      return copy.sort((a, b) => b.totalStars - a.totalStars).slice(0, 5);
    });
  };

  // 3. Xử lý bắt tay WebRTC phía Viewer
  const handleWebRTCOffer = async (sdp: RTCSessionDescriptionInit, streamerSocketId: string) => {
    try {
      if (pcRef.current) {
        pcRef.current.close();
      }

      // Tắt visualizer canvas hoạt họa dự phòng vì sắp có luồng video thực tế
      stopCanvasAnimation();

      const pc = new RTCPeerConnection(WEBRTC_ICE_SERVERS);
      pcRef.current = pc;

      // Lắng nghe track video từ streamer
      pc.ontrack = (event) => {
        console.log("📺 WebRTC track video nhận được thành công!");
        if (videoRef.current) {
          videoRef.current.srcObject = event.streams[0];
        }
      };

      pc.onicecandidate = (event) => {
        if (event.candidate && wsRef.current) {
          wsRef.current.send(JSON.stringify({
            type: "webrtc-candidate",
            payload: {
              candidate: event.candidate,
              targetSocketId: streamerSocketId
            }
          }));
        }
      };

      await pc.setRemoteDescription(new RTCSessionDescription(sdp));

      // Tạo Answer đồng ý kết nối
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      // Gửi Answer ngược lại cho streamer qua Signaling server (WS)
      if (wsRef.current) {
        wsRef.current.send(JSON.stringify({
          type: "webrtc-answer",
          payload: {
            sdp: answer,
            targetSocketId: streamerSocketId
          }
        }));
      }
    } catch (err) {
      console.error("Lỗi thiết lập WebRTC Viewer:", err);
      startCanvasAnimation();
    }
  };

  // 4. Phát bình luận từ Viewer
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || !wsRef.current || !currentUser) return;

    wsRef.current.send(JSON.stringify({
      type: "chat-message",
      payload: {
        id: Math.random().toString(),
        sender: currentUser,
        text: inputMsg
      }
    }));
    setInputMsg("");
  };

  // 5. Thao tác Tặng Sao (Gift Transaction)
  const handleSendGiftSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || gifting) return;

    const gift = GIFT_TIERS[selectedGiftIndex];
    
    if (currentUser.starBalance < gift.amount) {
      alert("❌ Số dư sao của bạn không đủ! Vui lòng nhấn nút 'Nạp Sao' giả lập ở đầu trang.");
      return;
    }

    try {
      setGifting(true);

      // Gọi API POST /api/gifts để thực hiện ACID Transaction trong PostgreSQL
      const res = await fetch("/api/gifts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          streamId,
          senderId: currentUser.id,
          starAmount: gift.amount,
          message: giftMessage.trim() || null
        })
      });

      const resData = await res.json();

      if (res.ok) {
        const { updatedSenderBalance, totalStars: newStreamStars, transactionId } = resData.data;

        // A. Cập nhật số dư sao hiển thị và tổng số sao đã tặng của Viewer
        setCurrentUser(prev => prev ? { 
          ...prev, 
          starBalance: updatedSenderBalance,
          starsGifted: prev.starsGifted + gift.amount 
        } : null);

        // B. Phát tán sự kiện tặng quà qua WebSocket để đồng bộ tới Streamer và toàn bộ Viewers khác
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({
            type: "gift-sent",
            payload: {
              id: transactionId,
              user: {
                id: currentUser.id,
                username: currentUser.username,
                displayName: currentUser.displayName,
                avatarUrl: currentUser.avatarUrl,
                starsGifted: currentUser.starsGifted + gift.amount,
                starsEarned: currentUser.starsEarned
              },
              starAmount: gift.amount,
              message: giftMessage.trim() || null,
              totalStars: newStreamStars
            }
          }));
        }

        setGiftMessage("");
      } else {
        alert(resData.error || "Giao dịch tặng sao không thành công!");
      }
    } catch (err) {
      console.error("Lỗi tặng sao:", err);
      alert("Đã xảy ra lỗi giao dịch!");
    } finally {
      setGifting(false);
    }
  };

  // Nạp thêm sao giả lập (+1000 sao)
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

  // Chơi minigame Vòng quay may mắn (Lucky Wheel)
  const handleSpinWheel = async () => {
    if (!currentUser || isWheelSpinning) return;

    if (currentUser.starBalance < 50) {
      alert("❌ Số dư không đủ! Cần tối thiểu 50 sao để quay vòng quay may mắn.");
      return;
    }

    try {
      setIsWheelSpinning(true);
      setWonPrize(null);

      // Gọi API thực tế để trừ 50 sao và lấy thưởng ngẫu nhiên bảo mật từ Postgres
      const res = await fetch("/api/games/lucky-wheel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser.id })
      });

      const resData = await res.json();

      if (res.ok) {
        const { newBalance, prizeStars, prizeLabel, prizeIndex } = resData.data;

        // Tính góc quay land chính xác vào slice target: 330 - (index * 60)
        const currentBase = Math.floor(wheelRotation / 360) * 360;
        const targetAngle = 330 - prizeIndex * 60;
        const newRotation = currentBase + 360 * 5 + targetAngle; // Quay 5 vòng + góc target

        setWheelRotation(newRotation);

        // Chờ hiệu ứng CSS xoay hoàn tất trong 4s
        setTimeout(() => {
          setIsWheelSpinning(false);
          setWonPrize({ stars: prizeStars, label: prizeLabel });

          // Cập nhật số dư sao của Viewer hiện tại
          setCurrentUser(prev => prev ? { ...prev, starBalance: newBalance } : null);
        }, 4000);

      } else {
        alert(resData.error || "Giao dịch minigame thất bại!");
        setIsWheelSpinning(false);
      }
    } catch (e) {
      console.error("Lỗi spin minigame:", e);
      alert("Lỗi hệ thống minigame!");
      setIsWheelSpinning(false);
    }
  };

  // 6. Hoạt họa canvas visualizer dự phòng (Trùng khớp visualizer bên Streamer)
  const startCanvasAnimation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1280;
    canvas.height = 720;

    let time = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, "#0b0813");
      grad.addColorStop(1, "#030206");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.05;
      ctx.strokeStyle = "rgba(157, 78, 221, 0.6)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 10) {
        const y = canvas.height / 2 + Math.sin(x * 0.01 + time) * 80 * Math.cos(x * 0.002 + time * 0.5);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.strokeStyle = "rgba(255, 0, 127, 0.3)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 10) {
        const y = canvas.height / 2 + Math.cos(x * 0.008 + time * 1.2) * 50 * Math.sin(x * 0.004 - time);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.font = "bold 24px Outfit, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("🔴 IDOL PHÁT VIRTUAL MODE", canvas.width / 2, 80);

      ctx.fillStyle = "rgba(156, 163, 175, 0.6)";
      ctx.font = "16px Outfit, sans-serif";
      ctx.fillText("Bạn đang xem trực tuyến luồng giả lập âm thanh từ Streamer.", canvas.width / 2, 110);

      animationFrameIdRef.current = requestAnimationFrame(draw);
    };

    draw();
  };

  const stopCanvasAnimation = () => {
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }
  };

  // Tắt hiển thị Toast sau 4 giây
  useEffect(() => {
    if (activeGiftToast) {
      const timer = setTimeout(() => {
        setActiveGiftToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [activeGiftToast]);

  // Điều khiển visualizer khi page đã load xong
  useEffect(() => {
    if (!loading && stream?.status === "LIVE") {
      const fallbackTimer = setTimeout(() => {
        if (videoRef.current && !videoRef.current.srcObject) {
          startCanvasAnimation();
        }
      }, 2000);
      return () => clearTimeout(fallbackTimer);
    }
  }, [loading]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        🔄 Đang kết nối tới phòng livestream...
      </div>
    );
  }

  // NẾU PHÒNG STREAM ĐÃ KẾT THÚC (ENDED SCREEN)
  if (stream?.status === "ENDED") {
    return (
      <div className={styles.endedScreen}>
        <div style={{ fontSize: "5rem" }}>📺</div>
        <h1 className={styles.endedTitle}>Buổi Livestream đã kết thúc</h1>
        <p style={{ color: "var(--text-secondary)", maxWidth: "500px" }}>
          Cảm ơn bạn đã quan tâm theo dõi! Streamer <strong>{stream?.streamer?.displayName}</strong> đã đóng buổi phát sóng này.
        </p>

        <div className={styles.endedStats}>
          <div className={styles.endedStatCard}>
            <div className={styles.endedStatVal}>✨ {totalStars}</div>
            <div className={styles.endedStatLabel}>Tổng sao nhận được</div>
          </div>
          <div className={styles.endedStatCard}>
            <div className={styles.endedStatVal}>💬 {messages.length}</div>
            <div className={styles.endedStatLabel}>Số lượt bình luận</div>
          </div>
        </div>

        <div style={{ width: "100%", maxWidth: "400px", marginTop: "20px" }}>
          <h3 style={{ marginBottom: "15px", fontSize: "1.1rem" }}>🏆 Top 3 Cổ Động Viên phòng phát:</h3>
          {leaderboard.slice(0, 3).map((gifter, i) => (
            <div key={gifter.senderId} style={{ display: "flex", justifyContent: "space-between", padding: "10px 16px", background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: "10px", marginBottom: "8px" }}>
              <span>{i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"} {gifter.displayName}</span>
              <span style={{ color: "var(--color-accent)", fontWeight: "700" }}>{gifter.totalStars} sao</span>
            </div>
          ))}
        </div>

        <button className="glow-btn-primary" onClick={() => router.push("/")} style={{ marginTop: "20px" }}>
          ➔ Về Trang chủ
        </button>
      </div>
    );
  }

  // Tính level động của Streamer & Viewer
  const streamerStars = (stream?.streamer?.starsEarned || 0) + totalStars;
  const streamerLevel = getStreamerLevel(streamerStars);
  const viewerLevel = getViewerLevel(currentUser?.starsGifted || 0);

  return (
    <div className={styles.container}>
      {/* Cột trái: Player, Gửi quà tặng và mô tả */}
      <div className={styles.mainContent}>
        {/* Header phòng live */}
        <div className={`${styles.streamHeader} premium-card`}>
          <div className={styles.streamerDetail}>
            <button 
              className={styles.backHomeBtn} 
              onClick={() => router.push("/")}
              title="Quay lại trang chủ"
            >
              ←
            </button>
            <img src={stream?.streamer?.avatarUrl} alt={stream?.streamer?.displayName || "Idol Streamer"} className={styles.streamerAvatar} />
            <div className={styles.streamInfoText}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h2 className={styles.streamTitle}>{stream?.title}</h2>
                <span
                  style={{
                    backgroundColor: streamerLevel.color,
                    color: "#fff",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontSize: "0.65rem",
                    fontWeight: "bold",
                    marginLeft: "10px",
                    textShadow: "0 1px 2px rgba(0,0,0,0.4)",
                    boxShadow: `0 0 6px ${streamerLevel.color}44`
                  }}
                  title={streamerLevel.title}
                >
                  Idol Lv.{streamerLevel.level}
                </span>
              </div>
              <span className={styles.streamerName}>
                Idol Streamer: <strong>{stream?.streamer?.displayName}</strong>
              </span>
            </div>
          </div>

          {currentUser && (
            <div className={styles.viewerUserPanel}>
              {/* Huy hiệu Cấp độ của Viewer */}
              <span
                style={{
                  backgroundColor: viewerLevel.color,
                  color: "#fff",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  textShadow: "0 1px 2px rgba(0,0,0,0.4)",
                  boxShadow: `0 0 8px ${viewerLevel.color}33`
                }}
                title={viewerLevel.title}
              >
                Viewer Lv.{viewerLevel.level}
              </span>

              <div className={styles.viewerBalance}>
                🪙 {currentUser.starBalance.toLocaleString()} sao khả dụng
              </div>
              
              <button className={styles.rechargeBtn} onClick={handleRecharge}>
                + Nạp Sao
              </button>

              {/* Nút mở Vòng quay may mắn */}
              <button className={styles.luckyWheelBtn} onClick={() => setShowWheel(true)}>
                🎰 Minigame
              </button>
            </div>
          )}
        </div>

        {/* Màn hình phát video và canvas hiệu ứng bay sao */}
        <div className={styles.videoSection}>
          {/* Component Canvas hoạt họa bay sao độc lập */}
          <GiftAnimationCanvas giftEvent={lastGiftEvent} styles={styles} />

          {/* Player hiển thị webcam WebRTC */}
          <video ref={videoRef} autoPlay playsInline className={styles.videoFeed} style={{ display: videoRef.current?.srcObject ? "block" : "none" }} />
          
          {/* Canvas vẽ visualizer dự phòng */}
          <canvas ref={canvasRef} className={styles.virtualCanvas} style={{ display: videoRef.current?.srcObject ? "none" : "block" }} />

          {/* Lớp thông số phủ lên video */}
          <div className={styles.overlayTop}>
            <span className="live-badge">TRỰC TIẾP</span>
            <div className={styles.statsGroup}>
              <span className={styles.statBadge}>👤 {viewerCount} người xem</span>
              <span className={`${styles.statBadge} ${styles.starBadge}`}>🪙 {totalStars} sao nhận được</span>
            </div>
          </div>

          {/* Hiệu ứng Toast tặng quà của bản thân hoặc người khác */}
          <div className={styles.overlayGift}>
            {activeGiftToast && (
              <div className={styles.giftToast}>
                <img src={activeGiftToast.avatarUrl} alt={activeGiftToast.senderName} className={styles.giftAvatar} />
                <div className={styles.giftDetails}>
                  <span className={styles.giftSender}>{activeGiftToast.senderName}</span>
                  <span className={styles.giftAction}>Đã tặng +{activeGiftToast.starAmount} sao! 🌟</span>
                  {activeGiftToast.message && (
                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontStyle: "italic" }}>
                      "{activeGiftToast.message}"
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Component bảng chọn quà tặng chia tách */}
        <GiftSelector
          giftTiers={GIFT_TIERS}
          selectedGiftIndex={selectedGiftIndex}
          onSelectGift={setSelectedGiftIndex}
          giftMessage={giftMessage}
          onGiftMessageChange={setGiftMessage}
          onSendGift={handleSendGiftSubmit}
          gifting={gifting}
          styles={styles}
        />
      </div>

      {/* Cột phải: Live Chat và Gifter Leaderboard sử dụng Component chia tách */}
      <div className={`${styles.sidebar} glass`}>
        <LiveChat
          messages={messages}
          inputMsg={inputMsg}
          onInputChange={setInputMsg}
          onSendMessage={handleSendChat}
          styles={styles}
        />
        
        <Leaderboard
          leaderboard={leaderboard}
          styles={styles}
        />
      </div>

      {/* MODAL VÒNG QUAY MAY MẮN (LUCKY WHEEL) */}
      {showWheel && (
        <div className={styles.wheelModalOverlay} onClick={() => !isWheelSpinning && setShowWheel(false)}>
          <div className={styles.wheelModalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "800", color: "var(--color-accent)", display: "flex", alignItems: "center", gap: "6px" }}>
              <span>🎰</span> Vòng Quay May Mắn (Idol Wheel)
            </h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", textAlign: "center" }}>
              Chi <strong>50 sao</strong> mỗi lượt để có cơ hội trúng giải thưởng Jackpot lên tới <strong>500 sao</strong>!
            </p>

            {/* Container Vòng quay */}
            <div className={styles.wheelContainer}>
              {/* Kim pointer chỉ hướng trên cùng */}
              <svg className={styles.wheelPointer} viewBox="0 0 30 40">
                <path d="M 15 40 L 0 0 L 30 0 Z" />
              </svg>

              {/* Bánh xe tròn SVG vẽ 6 phần */}
              <svg
                viewBox="0 0 200 200"
                className={styles.svgWheel}
                style={{
                  transform: `rotate(${wheelRotation}deg)`,
                  transition: isWheelSpinning ? "transform 4s cubic-bezier(0.15, 0.85, 0.15, 1)" : "none"
                }}
              >
                <defs>
                  <linearGradient id="grad-0" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#b5179e"/>
                    <stop offset="100%" stopColor="#7209b7"/>
                  </linearGradient>
                  <linearGradient id="grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff006e"/>
                    <stop offset="100%" stopColor="#f72585"/>
                  </linearGradient>
                  <linearGradient id="grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffbe0b"/>
                    <stop offset="100%" stopColor="#fb5607"/>
                  </linearGradient>
                  <linearGradient id="grad-3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3a86c8"/>
                    <stop offset="100%" stopColor="#4361ee"/>
                  </linearGradient>
                  <linearGradient id="grad-4" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38b000"/>
                    <stop offset="100%" stopColor="#007200"/>
                  </linearGradient>
                  <linearGradient id="grad-5" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff002b"/>
                    <stop offset="100%" stopColor="#9e0018"/>
                  </linearGradient>
                </defs>

                {/* Slice 0: 10 sao */}
                <path d="M 100 100 L 100 10 A 90 90 0 0 1 177.94 55 Z" fill="url(#grad-0)" />
                {/* Slice 1: 30 sao */}
                <path d="M 100 100 L 177.94 55 A 90 90 0 0 1 177.94 145 Z" fill="url(#grad-1)" />
                {/* Slice 2: 50 sao */}
                <path d="M 100 100 L 177.94 145 A 90 90 0 0 1 100 190 Z" fill="url(#grad-2)" />
                {/* Slice 3: 100 sao */}
                <path d="M 100 100 L 100 190 A 90 90 0 0 1 22.06 145 Z" fill="url(#grad-3)" />
                {/* Slice 4: 200 sao */}
                <path d="M 100 100 L 22.06 145 A 90 90 0 0 1 22.06 55 Z" fill="url(#grad-4)" />
                {/* Slice 5: 500 sao */}
                <path d="M 100 100 L 22.06 55 A 90 90 0 0 1 100 10 Z" fill="url(#grad-5)" />

                {/* Outer borders and glowing rings */}
                <circle cx="100" cy="100" r="90" fill="none" stroke="#ffd700" strokeWidth="3" opacity="0.9" />
                <circle cx="100" cy="100" r="93" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />

                {/* Blinking casino lights on outer ring */}
                <circle cx="100" cy="10" r="3" fill="#fff" className={styles.wheelLightDot} />
                <circle cx="178" cy="55" r="3" fill="#fff" className={styles.wheelLightDot} />
                <circle cx="178" cy="145" r="3" fill="#fff" className={styles.wheelLightDot} />
                <circle cx="100" cy="190" r="3" fill="#fff" className={styles.wheelLightDot} />
                <circle cx="22" cy="145" r="3" fill="#fff" className={styles.wheelLightDot} />
                <circle cx="22" cy="55" r="3" fill="#fff" className={styles.wheelLightDot} />

                {/* Nhãn chữ xoay tương ứng từng slice */}
                <text x="100" y="40" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle" transform="rotate(30, 100, 100)" letterSpacing="0.5">10 SAO</text>
                <text x="100" y="40" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle" transform="rotate(90, 100, 100)" letterSpacing="0.5">30 SAO</text>
                <text x="100" y="40" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle" transform="rotate(150, 100, 100)" letterSpacing="0.5">50 SAO</text>
                <text x="100" y="40" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle" transform="rotate(210, 100, 100)" letterSpacing="0.5">100 SAO</text>
                <text x="100" y="40" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle" transform="rotate(270, 100, 100)" letterSpacing="0.5">200 SAO</text>
                <text x="100" y="40" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle" transform="rotate(330, 100, 100)" letterSpacing="0.5">🚀 500 sao</text>
              </svg>

              {/* Nút bấm quay ở trung tâm vòng quay */}
              <button
                className={`${styles.spinBtnCenter} ${isWheelSpinning ? styles.spinBtnCenterDisabled : ""}`}
                onClick={handleSpinWheel}
                disabled={isWheelSpinning}
              >
                QUAY
              </button>
            </div>

            {/* Hiển thị Giải thưởng khi quay xong */}
            {wonPrize && (
              <div className={styles.prizePopup}>
                🎁 {wonPrize.label} (+{wonPrize.stars} sao)
              </div>
            )}

            <div style={{ width: "100%", display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "10px" }}>
              <span>Số dư khả dụng:</span>
              <span style={{ color: "var(--color-accent)", fontWeight: "700" }}>🪙 {currentUser?.starBalance.toLocaleString()} sao</span>
            </div>

            <button
              className="glow-btn-secondary"
              onClick={() => setShowWheel(false)}
              disabled={isWheelSpinning}
              style={{ width: "100%", padding: "10px", marginTop: "10px", fontSize: "0.85rem" }}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
