// Trang Viewer Room (Giao diện người xem).
// Hỗ trợ xem trực tiếp qua WebRTC/Canvas, chat thời gian thực, nạp sao, chơi vòng quay may mắn, chọn quà và gửi tặng sao với hiệu ứng đặc biệt.

"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./page.module.css";

// Nhập các Component đã chia tách độc lập
import LiveChat, { ChatMessage } from "@/features/stream/components/LiveChat";
import Leaderboard, { LeaderboardEntry } from "@/features/stream/components/Leaderboard";
import GiftSelector, { GiftTier } from "@/features/gift/components/GiftSelector";
import GiftAnimationCanvas from "@/features/gift/components/GiftAnimationCanvas";
import { getViewerLevel, getStreamerLevel } from "@/lib/level";
import PredictionWidget from "@/features/stream/components/PredictionWidget";
import QuestDrawer from "@/components/QuestDrawer";

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
  goalTitle?: string | null;
  goalTarget: number;
  goalCurrent: number;
  streamer: {
    id: string;
    username: string;
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

  // Trạng thái PK Battles
  const [pkBattle, setPkBattle] = useState<any | null>(null);
  const [pkTimeLeft, setPkTimeLeft] = useState<number | null>(null);
  const [bigGiftEffect, setBigGiftEffect] = useState<{ senderName: string; avatarUrl: string; starAmount: number; streamName: string } | null>(null);

  // Trạng thái Rương Quà May Mắn
  const [activeChest, setActiveChest] = useState<any | null>(null);
  const [chestTimeLeft, setChestTimeLeft] = useState<number | null>(null);
  const [showChestModal, setShowChestModal] = useState(false);
  const [claimAmount, setClaimAmount] = useState<number | null>(null);
  const [claiming, setClaiming] = useState(false);

  // Trạng thái Đóng góp mục tiêu nhóm
  const [goalAchieved, setGoalAchieved] = useState(false);

  // Trạng thái Dự Đoán và VIP Entry
  const [activePrediction, setActivePrediction] = useState<any | null>(null);
  const [betting, setBetting] = useState(false);
  const [vipEntryNotification, setVipEntryNotification] = useState<any | null>(null);

  // Trạng thái hiển thị Nhiệm vụ hàng ngày
  const [showQuests, setShowQuests] = useState(false);

  // Refs WebSockets, WebRTC và Canvas hoạt họa
  const wsRef = useRef<WebSocket | null>(null);

  // Heartbeat Ping để tích lũy thời gian xem live (nhiệm vụ WATCH_5, WATCH_15)
  useEffect(() => {
    if (!currentUser || !streamId) return;

    // Lập lịch gửi ping mỗi 60 giây (1 phút)
    const interval = setInterval(async () => {
      try {
        await fetch("/api/quests/watch-ping", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ streamId }),
        });
      } catch (err) {
        console.error("Lỗi gửi ping xem stream:", err);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [currentUser, streamId]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Canvas hiển thị luồng giả lập
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // 1.1 Khởi chạy các đồng hồ đếm ngược
  useEffect(() => {
    if (pkBattle && pkBattle.status === "LIVE" && pkBattle.endTime) {
      const targetTime = new Date(pkBattle.endTime).getTime();
      const interval = setInterval(() => {
        const diff = Math.max(0, Math.floor((targetTime - Date.now()) / 1000));
        setPkTimeLeft(diff);
        if (diff <= 0) {
          clearInterval(interval);
          fetchPKStatus();
        }
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setPkTimeLeft(null);
    }
  }, [pkBattle]);

  useEffect(() => {
    if (activeChest && activeChest.expiresAt) {
      const targetTime = new Date(activeChest.expiresAt).getTime();
      const interval = setInterval(() => {
        const diff = Math.max(0, Math.floor((targetTime - Date.now()) / 1000));
        setChestTimeLeft(diff);
        if (diff <= 0) {
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setChestTimeLeft(null);
    }
  }, [activeChest]);

  const fetchPKStatus = async () => {
    if (!stream) return;
    try {
      const res = await fetch(`/api/pk/status?streamerId=${stream.streamerId}`);
      if (res.ok) {
        const data = await res.json();
        setPkBattle(data);
      }
    } catch (err) {
      console.error("Lỗi lấy trạng thái PK:", err);
    }
  };

  const handleClaimChest = async () => {
    if (!currentUser || !activeChest || claiming) return;
    try {
      setClaiming(true);
      const res = await fetch("/api/chests/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chestId: activeChest.id, userId: currentUser.id }),
      });
      const data = await res.json();
      if (res.ok) {
        setClaimAmount(data.amount);
        // Cập nhật số dư sao cục bộ
        setCurrentUser(prev => prev ? { ...prev, starBalance: prev.starBalance + data.amount } : null);
        // Đồng bộ lên WebSocket
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({
            type: "chest-claimed",
            payload: {
              remainingSlots: data.remainingSlots,
              remainingStars: data.remainingStars,
            }
          }));
        }
      } else {
        alert(data.error || "Không thể mở rương!");
      }
    } catch (err) {
      console.error("Lỗi mở rương:", err);
      alert("Đã xảy ra lỗi khi mở rương!");
    } finally {
      setClaiming(false);
    }
  };

  const handleDropChest = async () => {
    if (!currentUser || !stream) return;
    const totalStars = prompt("Nhập tổng số sao muốn thả (ví dụ: 1000):", "200");
    if (!totalStars) return;
    const slots = prompt("Nhập số lượt mở tối đa (ví dụ: 10 người):", "5");
    if (!slots) return;

    const starsNum = parseInt(totalStars);
    const slotsNum = parseInt(slots);

    if (isNaN(starsNum) || starsNum <= 0 || isNaN(slotsNum) || slotsNum <= 0) {
      alert("Vui lòng nhập số hợp lệ!");
      return;
    }

    if (currentUser.starBalance < starsNum) {
      alert("Số dư của bạn không đủ!");
      return;
    }

    try {
      const res = await fetch("/api/chests/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          streamId,
          creatorId: currentUser.id,
          totalStars: starsNum,
          totalSlots: slotsNum,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Đã thả rương quà thành công!");
        // Trừ sao cục bộ
        setCurrentUser(prev => prev ? { ...prev, starBalance: prev.starBalance - starsNum } : null);
        // Đồng bộ lên WebSocket
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({
            type: "chest-spawned",
            payload: { chest: data }
          }));
        }
      } else {
        alert(data.error || "Không thể thả rương!");
      }
    } catch (err) {
      console.error("Lỗi tạo rương:", err);
    }
  };

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

        // Kiểm tra xem viewer hiện tại có phải streamer chủ phòng hay không
        if (userData && detailData.stream.streamerId === userData.id && detailData.stream.status === "LIVE") {
          router.replace(`/streamer/live/${streamId}`);
          return;
        }

        setStream(detailData.stream);
        setTotalStars(detailData.stream.totalStars);
        setViewerCount(detailData.stream.viewerCount);
        setMessages(detailData.comments);
        setLeaderboard(detailData.leaderboard);
        setLoading(false);

        // Lấy trạng thái PK khởi chạy
        try {
          const pkRes = await fetch(`/api/pk/status?streamerId=${detailData.stream.streamerId}`);
          if (pkRes.ok) {
            const pkData = await pkRes.json();
            if (pkData) {
              setPkBattle(pkData);
            }
          }
        } catch (pkErr) {
          console.error("Lỗi lấy trạng thái PK khởi chạy:", pkErr);
        }

        // Lấy trạng thái Dự đoán khởi chạy
        try {
          const predRes = await fetch(`/api/predictions/active?streamId=${streamId}`);
          if (predRes.ok) {
            const predData = await predRes.json();
            if (predData.success && predData.prediction) {
              setActivePrediction(predData.prediction);
            }
          }
        } catch (predErr) {
          console.error("Lỗi lấy trạng thái Dự đoán khởi chạy:", predErr);
        }

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

            // 5. Trigger hiệu ứng quà lớn nếu tặng từ 100 sao trở lên
            if (payload.starAmount >= 100) {
              setBigGiftEffect({
                senderName: payload.sender.displayName,
                avatarUrl: payload.sender.avatarUrl,
                starAmount: payload.starAmount,
                streamName: stream?.title || ""
              });
              setTimeout(() => setBigGiftEffect(null), 3000);
            }

            // 6. Cập nhật Bảng xếp hạng Leaderboard thời gian thực (tránh reload trang)
            updateLeaderboardInRealtime(payload.sender, payload.starAmount);
            break;

          case "gift-batch": {
            const { gifts, totalStars: newStars, activeGoal, pkBattle: updatedPkBattle } = payload;
            
            if (newStars !== undefined) setTotalStars(newStars);
            
            if (activeGoal && stream) {
              setStream(prev => prev ? {
                ...prev,
                goalCurrent: activeGoal.currentStars,
                goalTitle: activeGoal.title,
                goalTarget: activeGoal.targetStars
              } : null);
            }
            
            if (updatedPkBattle) {
              setPkBattle((prev: any) => prev ? {
                ...prev,
                score1: updatedPkBattle.score1,
                score2: updatedPkBattle.score2
              } : null);
            }
            
            const newChatMessages = gifts.map((g: any) => ({
              id: g.id,
              sender: g.sender,
              text: g.message 
                ? `Đã tặng ${g.starAmount} sao! 🌟 "${g.message}"` 
                : `Đã tặng ${g.starAmount} sao! 🌟`,
              createdAt: g.createdAt,
              isGift: true,
              giftStars: g.starAmount
            }));

            setMessages((prev) => [...prev, ...newChatMessages]);
            setTimeout(scrollToBottom, 50);

            if (gifts.length > 0) {
              const maxGift = gifts.reduce((p: any, c: any) => 
                (p.starAmount > c.starAmount) ? p : c
              );

              setActiveGiftToast({
                senderName: maxGift.sender.displayName,
                avatarUrl: maxGift.sender.avatarUrl,
                starAmount: maxGift.starAmount,
                message: maxGift.message
              });

              const lastGift = gifts[gifts.length - 1];
              setLastGiftEvent({ id: lastGift.id, amount: lastGift.starAmount });

              const bigGift = gifts.find((g: any) => g.starAmount >= 100);
              if (bigGift) {
                setBigGiftEffect({
                  senderName: bigGift.sender.displayName,
                  avatarUrl: bigGift.sender.avatarUrl,
                  starAmount: bigGift.starAmount,
                  streamName: stream?.title || ""
                });
                setTimeout(() => setBigGiftEffect(null), 3000);
              }

              gifts.forEach((g: any) => {
                updateLeaderboardInRealtime(g.sender, g.starAmount);
              });
            }
            break;
          }

          case "pk-start-broadcast":
            const battleData = payload.battle;
            const isStream1 = battleData.streamId1 === streamId;
            const opponentStream = isStream1 ? battleData.stream2 : battleData.stream1;
            const resolvedOpponent = opponentStream?.streamer ? {
              id: opponentStream.streamer.id,
              displayName: opponentStream.streamer.displayName,
              avatarUrl: opponentStream.streamer.avatarUrl
            } : null;
            setPkBattle({
              ...battleData,
              opponent: resolvedOpponent || battleData.opponent
            });
            setMessages((prev) => [...prev, {
              id: Math.random().toString(),
              sender: { displayName: "Hệ thống" } as any,
              text: `⚔️ Trận chiến PK thời gian thực đã bắt đầu! Hãy tặng sao cổ vũ!`,
              createdAt: new Date().toISOString(),
              isGift: true
            }]);
            scrollToBottom();
            break;

          case "pk-score-broadcast":
            setPkBattle((prev: any) => prev ? { ...prev, score1: payload.score1, score2: payload.score2 } : null);
            break;

          case "pk-forfeit-broadcast": {
            const { forfeitedByStreamId, forfeitedByUser, reason } = payload;
            const reasonText = reason === "DISCONNECT" ? "mất kết nối" : "tự ý rời khỏi";
            // Viewer cần biết ai bỏ cuộc và kết quả
            setMessages((prev) => [...prev, {
              id: Math.random().toString(),
              sender: { displayName: "Hệ thống" } as any,
              text: `❌ PK kết thúc sớm! ${forfeitedByUser?.displayName || "Một streamer"} đã ${reasonText} trước khi hết giờ.`,
              createdAt: new Date().toISOString(),
              isGift: true
            }]);
            scrollToBottom();
            setPkBattle(null);
            setPkTimeLeft(null);
            break;
          }

          case "pk-big-gift-broadcast": {
            setBigGiftEffect({
              senderName: payload.senderName,
              avatarUrl: payload.avatarUrl,
              starAmount: payload.starAmount,
              streamName: payload.streamName || ""
            });
            setTimeout(() => setBigGiftEffect(null), 3000);
            break;
          }

          case "goal-broadcast":
            setStream((prev: any) => prev ? { ...prev, goalTitle: payload.goalTitle, goalTarget: payload.goalTarget, goalCurrent: payload.goalCurrent } : null);
            if (payload.goalCurrent >= payload.goalTarget && payload.goalTarget > 0) {
              setGoalAchieved(true);
              // Kích hoạt pháo hoa canvas hoạt họa chúc mừng
              setLastGiftEvent({ id: Math.random().toString(), amount: 1000 });
            }
            break;

          case "chest-broadcast":
            setActiveChest(payload.chest);
            setClaimAmount(null); // reset claim result
            setMessages((prev) => [...prev, {
              id: Math.random().toString(),
              sender: { displayName: "Hệ thống" } as any,
              text: `🎁 Rương Quà May Mắn trị giá ${payload.chest.totalStars} sao đã được thả! Rương sẽ mở sau ${Math.ceil((new Date(payload.chest.expiresAt).getTime() - Date.now()) / 1000)} giây.`,
              createdAt: new Date().toISOString(),
              isGift: true
            }]);
            scrollToBottom();
            break;

          case "chest-claim-broadcast":
            setActiveChest((prev: any) => prev ? { ...prev, remainingSlots: payload.remainingSlots, remainingStars: payload.remainingStars } : null);
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

          case "prediction-created":
            setActivePrediction(payload.prediction);
            setMessages((prev) => [...prev, {
              id: Math.random().toString(),
              sender: { displayName: "Hệ thống" } as any,
              text: `🔮 Kèo dự đoán bắt đầu: "${payload.prediction.title}". Lựa chọn [A]: ${payload.prediction.optionA} | [B]: ${payload.prediction.optionB}. Hãy đặt cược ngay!`,
              createdAt: new Date().toISOString(),
              isGift: true
            }]);
            scrollToBottom();
            break;

          case "prediction-locked": {
            const lockedPred = payload.prediction;
            setActivePrediction((prev: any) =>
              prev ? { ...prev, ...lockedPred, status: "LOCKED" } : null
            );
            setMessages((prev) => [...prev, {
              id: Math.random().toString(),
              sender: { displayName: "Hệ thống" } as any,
              text: `🔒 Kèo dự đoán: "${lockedPred?.title || "Dự đoán"}" đã đóng cửa cược! Đang đợi kết quả...`,
              createdAt: new Date().toISOString(),
              isGift: true
            }]);
            scrollToBottom();
            break;
          }

          case "prediction-resolved": {
            const resolvedPred = payload.prediction;
            const resolvedPayouts = payload.payouts || [];
            const winOpt = resolvedPred?.winOption || payload.winOption;

            // 1. Cập nhật toàn bộ prediction kèm theo bets để widget hiển thị thắng/thua chính xác
            setActivePrediction(resolvedPred || null);

            // 2. Cộng thưởng sã trực tiếp vào số dư của viewer nếu họ có trong danh sách thắng
            if (currentUser && resolvedPayouts.length > 0) {
              const myPayout = resolvedPayouts.find((p: any) => p.userId === currentUser.id);
              if (myPayout) {
                setCurrentUser((prev: any) => prev ? { ...prev, starBalance: prev.starBalance + myPayout.amount } : null);
              }
            }

            // 3. Đẩy thông báo kết quả vào chat
            if (resolvedPred) {
              const chatText = winOpt === "CANCELLED"
                ? `🚫 Kèo dự đoán "${resolvedPred.title}" đã bị HUỶ. Toàn bộ số sao đặt cược đã được hoàn lại!`
                : `🏆 Kèo dự đoán "${resolvedPred.title}" đã kết thúc! Kết quả đúng: [${winOpt === "A" ? resolvedPred.optionA : resolvedPred.optionB}]. Phần thưởng đã được phát!`;
              setMessages((prev) => [...prev, {
                id: Math.random().toString(),
                sender: { displayName: "Hệ thống" } as any,
                text: chatText,
                createdAt: new Date().toISOString(),
                isGift: true
              }]);
              scrollToBottom();
            }

            // 4. Ẩn widget sau 15 giây để người xem kịp ăn mừng kết quả
            setTimeout(() => setActivePrediction(null), 15000);
            break;
          }

          case "prediction-bet": {
            const { prediction } = payload;
            setActivePrediction((prev: any) => {
              if (!prev || prev.id !== prediction.id) return prev;
              return {
                ...prev,
                totalStarsA: prediction.totalStarsA,
                totalStarsB: prediction.totalStarsB,
                bets: prediction.bets || prev.bets
              };
            });
            break;
          }

          case "vip-entry": {
            const { user: vipUser, level: vipLevel, title: vipTitle } = payload;
            setVipEntryNotification({
              displayName: vipUser.displayName,
              title: vipTitle,
              level: vipLevel
            });
            setTimeout(() => setVipEntryNotification(null), 4000);

            setMessages((prev) => [...prev, {
              id: Math.random().toString(),
              sender: { displayName: "Hệ thống" } as any,
              text: `💎 VIP [${vipTitle}] ${vipUser.displayName} đã cưỡi rồng tiến vào phòng live!`,
              createdAt: new Date().toISOString(),
              isGift: true
            }]);
            setTimeout(scrollToBottom, 50);
            break;
          }
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

    // Tích lũy tiến trình nhiệm vụ Chat (CHAT_3)
    fetch("/api/quests/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questType: "CHAT_3", amount: 1 }),
    }).catch(err => console.error("Lỗi cập nhật nhiệm vụ chat:", err));

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
        const { updatedSenderBalance, totalStars: newStreamStars, goalCurrent, transactionId, pkBattle: newPkBattle } = resData.data;

        // A. Cập nhật số dư sao hiển thị và tổng số sao đã tặng của Viewer
        setCurrentUser(prev => prev ? { 
          ...prev, 
          starBalance: updatedSenderBalance,
          starsGifted: prev.starsGifted + gift.amount 
        } : null);

        if (goalCurrent !== undefined && stream) {
          setStream(prev => prev ? { ...prev, goalCurrent } : null);
        }

        if (newPkBattle) {
          setPkBattle(newPkBattle);
        }

        if (res.status === 202) {
          setGiftMessage("");
          return;
        }

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

          // Đồng bộ tiến trình mục tiêu nhóm
          if (goalCurrent !== undefined && stream && stream.goalTarget > 0) {
            wsRef.current.send(JSON.stringify({
              type: "goal-updated",
              payload: {
                goalTitle: stream.goalTitle,
                goalTarget: stream.goalTarget,
                goalCurrent
              }
            }));
          }

          // Đồng bộ điểm PK Battle nếu có
          if (newPkBattle) {
            const opponentStreamId = newPkBattle.streamId1 === streamId ? newPkBattle.streamId2 : newPkBattle.streamId1;
            wsRef.current.send(JSON.stringify({
              type: "pk-score-update",
              payload: {
                battleId: newPkBattle.id,
                score1: newPkBattle.score1,
                score2: newPkBattle.score2,
                opponentStreamId
              }
            }));
          }
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

  // Đặt cược dự đoán trực tiếp
  const handleBet = async (option: "A" | "B", amount: number) => {
    if (!currentUser || !activePrediction) return;
    setBetting(true);
    try {
      const res = await fetch("/api/predictions/bet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          predictionId: activePrediction.id,
          userId: currentUser.id,
          option,
          starAmount: amount,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setCurrentUser((prev) => prev ? { ...prev, starBalance: data.newBalance } : null);
        setActivePrediction(data.prediction);
      } else {
        throw new Error(data.error || "Đặt cược thất bại!");
      }
    } catch (err: any) {
      console.error("Lỗi khi đặt cược:", err);
      throw err;
    } finally {
      setBetting(false);
    }
  };  // Chơi minigame Vòng quay may mắn (Lucky Wheel)
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
      {/* CSS Keyframes cho thông báo VIP Entry */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideDownFade {
          0% { transform: translate(-50%, -20px); opacity: 0; }
          100% { transform: translate(-50%, 0); opacity: 1; }
        }
      `}} />

      {/* Banner thông báo VIP gia nhập */}
      {vipEntryNotification && (
        <div
          style={{
            position: "absolute",
            top: "80px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(90deg, rgba(255, 0, 127, 0.95), rgba(157, 78, 221, 0.95))",
            border: "2px solid var(--color-accent)",
            boxShadow: "0 0 20px var(--color-accent-glow)",
            borderRadius: "50px",
            padding: "10px 24px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            zIndex: 9999,
            animation: "slideDownFade 0.4s ease-out forwards",
          }}
        >
          <span style={{ fontSize: "1.5rem" }}>💎</span>
          <div style={{ color: "#fff", fontWeight: "800", fontSize: "0.95rem", whiteSpace: "nowrap" }}>
            VIP <span style={{ color: "var(--color-accent)" }}>[{vipEntryNotification.title}]</span> {vipEntryNotification.displayName} đã tiến vào phòng!
          </div>
        </div>
      )}
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
            <img 
              src={stream?.streamer?.avatarUrl} 
              alt={stream?.streamer?.displayName || "Idol Streamer"} 
              className={styles.streamerAvatar} 
              onClick={() => router.push(`/profile/${stream?.streamer?.username}`)}
              style={{ cursor: "pointer" }}
            />
            <div className={styles.streamInfoText}>
              <div className={styles.streamTitleContainer}>
                <h2 className={styles.streamTitle}>{stream?.title}</h2>
                <span
                  className={styles.levelBadge}
                  style={{
                    backgroundColor: streamerLevel.color,
                    boxShadow: `0 0 6px ${streamerLevel.color}44`
                  }}
                  title={streamerLevel.title}
                >
                  Idol Lv.{streamerLevel.level}
                </span>
              </div>
              <span 
                className={styles.streamerName}
                onClick={() => router.push(`/profile/${stream?.streamer?.username}`)}
                style={{ cursor: "pointer" }}
              >
                Idol Streamer: <strong>{stream?.streamer?.displayName}</strong>
              </span>
            </div>
          </div>

          {currentUser && (
            <div className={styles.viewerUserPanel}>
              {/* Huy hiệu Cấp độ của Viewer */}
              <span
                className={styles.viewerLevelBadge}
                style={{
                  backgroundColor: viewerLevel.color,
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

              {/* Nút thả rương quà */}
              <button
                onClick={handleDropChest}
                className={styles.dropChestBtn}
              >
                🎁 Thả Rương
              </button>

              {/* Nút mở bảng nhiệm vụ */}
              <button
                onClick={() => setShowQuests(true)}
                className={styles.luckyWheelBtn}
                style={{
                  background: "linear-gradient(135deg, #f43f5e 0%, #d946ef 100%)",
                  boxShadow: "0 4px 10px rgba(244, 63, 94, 0.2)"
                }}
              >
                🏆 Nhiệm vụ
              </button>
            </div>
          )}
        </div>

        {/* Thanh mục tiêu nhóm phòng live */}
        {stream && stream.goalTarget > 0 && (
          <div className={styles.goalContainer}>
            <div className={styles.goalHeader}>
              <span className={styles.goalTitle}>🎯 Mục tiêu phòng: {stream.goalTitle || "Mục tiêu chung"}</span>
              <span className={styles.goalProgress}>
                {stream.goalCurrent} / {stream.goalTarget} sao {goalAchieved ? "🎉 ĐÃ ĐẠT MỐC!" : ""}
              </span>
            </div>
            <div className={styles.goalProgressBar}>
              <div
                className={`${styles.goalProgressFill} ${goalAchieved ? styles.goalProgressFillAchieved : ""}`}
                style={{ width: `${Math.min(100, (stream.goalCurrent / stream.goalTarget) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Màn hình phát video và canvas hiệu ứng bay sao */}
        <div className={styles.videoSection} style={{ display: "flex", flexDirection: "row", overflow: "hidden", position: "relative" }}>
          {/* Component Canvas hoạt họa bay sao độc lập */}
          <GiftAnimationCanvas giftEvent={lastGiftEvent} styles={styles} />

          {/* Left panel: Streamer chính */}
          <div style={{ flex: 1, position: "relative", height: "100%" }}>
            {/* Player hiển thị webcam WebRTC */}
            <video ref={videoRef} autoPlay playsInline className={styles.videoFeed} style={{ display: videoRef.current?.srcObject ? "block" : "none", width: "100%", height: "100%", objectFit: "cover" }} />
            
            {/* Canvas vẽ visualizer dự phòng */}
            <canvas ref={canvasRef} className={styles.virtualCanvas} style={{ display: videoRef.current?.srcObject ? "none" : "block", width: "100%", height: "100%" }} />
            
            {pkBattle && pkBattle.status === "LIVE" && (
              <span style={{ position: "absolute", bottom: "10px", left: "10px", background: "rgba(0,0,0,0.6)", padding: "4px 8px", borderRadius: "6px", fontSize: "0.8rem", fontWeight: "bold", zIndex: 10 }}>
                {stream?.streamer?.displayName} (Phe Ta)
              </span>
            )}
          </div>

          {/* Right panel: Streamer đối thủ (chỉ hiển thị khi PK LIVE) */}
          {pkBattle && pkBattle.status === "LIVE" && (
            <div className={styles.opponentPanel}>
              {/* Giả lập video đối thủ bằng ảnh avatar hoạt họa */}
              <img src={pkBattle.opponent?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"} alt={pkBattle.opponent?.displayName} className={styles.opponentAvatar} />
              <span style={{ marginTop: "12px", fontSize: "0.95rem", fontWeight: "700", color: "var(--color-secondary)" }}>{pkBattle.opponent?.displayName}</span>
              <span className={`live-badge ${styles.opponentBadge}`}>ĐỐI THỦ PK</span>
              
              <span className={styles.opponentLabel}>
                {pkBattle.opponent?.displayName} (Phe Bạn)
              </span>
            </div>
          )}

          {/* PK Battle Score Bar */}
          {pkBattle && pkBattle.status === "LIVE" && (() => {
            // Tính đúng "Phe Ta" = streamer đang xem (theo streamId), "Phe Địch" = đối thủ
            const isStream1 = pkBattle.streamId1 === streamId;
            const myScore = isStream1 ? pkBattle.score1 : pkBattle.score2;
            const opScore = isStream1 ? pkBattle.score2 : pkBattle.score1;
            const total = myScore + opScore;
            const myPct = total > 0 ? (myScore / total) * 100 : 50;
            return (
              <div className={styles.pkContainer}>
                <div className={styles.pkHeader}>
                  <span style={{ color: "var(--color-primary)" }}>⭐ {stream?.streamer?.displayName || "Phe Ta"}: {myScore} sao</span>
                  <span className={styles.pkTitle}>⚔️ PK SONG ĐẤU ⚔️</span>
                  <span style={{ color: "var(--color-secondary)" }}>{pkBattle.opponent?.displayName || "Phe Địch"}: {opScore} sao ⭐</span>
                </div>
                <div className={styles.pkScoreBar}>
                  <div className={styles.pkScoreFillLeft} style={{ width: `${myPct}%`, transition: "width 0.5s ease" }} />
                  <div className={styles.pkScoreFillRight} />
                </div>
                {/* Nhãn % phần trăm ưu thế */}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                  <span style={{ color: myScore > opScore ? "var(--color-primary)" : "var(--text-secondary)" }}>
                    {myPct.toFixed(0)}% {myScore > opScore ? "🔥 Dẫn trước!" : ""}
                  </span>
                  {pkTimeLeft !== null && (
                    <span>⏱ {Math.floor(pkTimeLeft / 60)}:{(pkTimeLeft % 60).toString().padStart(2, "0")}</span>
                  )}
                  <span style={{ color: opScore > myScore ? "var(--color-secondary)" : "var(--text-secondary)" }}>
                    {opScore > myScore ? "🔥 Dẫn trước!" : ""} {(100 - myPct).toFixed(0)}%
                  </span>
                </div>
              </div>
            );
          })()}

          {/* Lớp thông số phủ lên video */}
          <div className={styles.overlayTop}>
            <span className="live-badge">TRỰC TIẾP</span>
            <div className={styles.statsGroup}>
              <span className={styles.statBadge}>👤 {viewerCount} người xem</span>
              <span className={`${styles.statBadge} ${styles.starBadge}`}>🪙 {totalStars} sao nhận được</span>
            </div>
          </div>

          {/* Nút Rương kho báu nổi (Floating Treasure Chest) */}
          {activeChest && (
            <div
              onClick={() => setShowChestModal(true)}
              style={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
                width: "60px",
                height: "60px",
                background: "rgba(20,20,28,0.85)",
                borderRadius: "50%",
                border: "2px solid var(--color-accent)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 0 15px var(--color-accent)",
                zIndex: 12,
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>🎁</span>
              <span style={{ fontSize: "0.65rem", fontWeight: "bold", color: "#fff" }}>
                {chestTimeLeft !== null && chestTimeLeft > 0 ? `${chestTimeLeft}s` : "MỞ!"}
              </span>
            </div>
          )}

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

        {/* BIG GIFT OVERLAY - toàn màn hình khi viewer tặng quà lớn >=100 sao */}
        {bigGiftEffect && (
          <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            zIndex: 999, pointerEvents: "none",
            background: "radial-gradient(ellipse at center, rgba(255, 200, 0, 0.18) 0%, transparent 70%)",
            animation: "fadeInOut 3s ease forwards"
          }}>
            <div style={{
              position: "absolute", width: "340px", height: "340px", borderRadius: "50%",
              border: "4px solid rgba(255, 200, 0, 0.5)",
              boxShadow: "0 0 60px rgba(255, 200, 0, 0.4), 0 0 120px rgba(255, 100, 0, 0.2)",
              animation: "pulseRing 1s ease-in-out infinite"
            }} />
            <img src={bigGiftEffect.avatarUrl} alt={bigGiftEffect.senderName}
              style={{ width: "100px", height: "100px", borderRadius: "50%", border: "4px solid #ffd700", boxShadow: "0 0 30px #ffd700", zIndex: 1 }} />
            <div style={{ marginTop: "16px", textAlign: "center", zIndex: 1 }}>
              <div style={{ fontSize: "1.5rem", fontWeight: "900", color: "#ffd700", textShadow: "0 0 20px #ff8800", letterSpacing: "1px" }}>
                {bigGiftEffect.senderName}
              </div>
              <div style={{ fontSize: "2.5rem", fontWeight: "900", color: "#fff", textShadow: "0 0 30px #ffd700", margin: "8px 0" }}>
                +{bigGiftEffect.starAmount} ⭐
              </div>
              <div style={{ fontSize: "1rem", color: "rgba(255,255,255,0.8)" }}>đã tặng sao cho {bigGiftEffect.streamName || "phòng này"}!</div>
            </div>
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{
                position: "absolute", fontSize: "1.5rem",
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
                opacity: 0.8,
                animation: `floatStar ${1 + Math.random()}s ease-out forwards`,
                animationDelay: `${Math.random() * 0.5}s`
              }}>⭐</div>
            ))}
          </div>
        )}

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

        {/* Widget Dự Đoán Thời Gian Thực */}
        <PredictionWidget
          prediction={activePrediction}
          currentUser={currentUser}
          onBet={handleBet}
          betting={betting}
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

      {/* MODAL MỞ RƯƠNG QUÀ MAY MẮN (TREASURE CHEST MODAL) */}
      {showChestModal && activeChest && (
        <div className={styles.wheelModalOverlay} onClick={() => setShowChestModal(false)}>
          <div className={styles.wheelModalContent} onClick={(e) => e.stopPropagation()} style={{ padding: "30px 20px" }}>
            <h3 style={{ fontSize: "1.4rem", fontWeight: "800", color: "var(--color-accent)", display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
              <span>🎁</span> Rương Quà May Mắn
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", textAlign: "center", margin: "10px 0" }}>
              Chiếc rương chứa đựng <strong style={{ color: "var(--color-accent)" }}>{activeChest.totalStars} sao</strong>.
              <br />
              Còn lại <strong style={{ color: "#fff" }}>{activeChest.remainingSlots} lượt mở</strong> ({activeChest.remainingStars} sao).
            </p>

            {chestTimeLeft !== null && chestTimeLeft > 0 ? (
              <div style={{ textAlign: "center", margin: "20px 0" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Đồng hồ đếm ngược mở rương:</span>
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--color-accent)" }}>{chestTimeLeft} giây</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "20px 0" }}>
                {claimAmount === null ? (
                  <button
                    onClick={handleClaimChest}
                    disabled={claiming}
                    style={{
                      background: "linear-gradient(135deg, var(--color-accent), #f39c12)",
                      border: "none",
                      color: "#fff",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      padding: "15px 30px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      boxShadow: "0 0 15px var(--color-accent)",
                      width: "100%",
                      animation: claiming ? "none" : "pulse 1.5s infinite"
                    }}
                  >
                    {claiming ? "Đang mở rương..." : "MỞ RƯƠNG NGAY! 🪙"}
                  </button>
                ) : (
                  <div style={{ textAlign: "center", padding: "10px", background: "rgba(0,0,0,0.6)", borderRadius: "8px", border: "1px solid var(--color-accent)", width: "100%" }}>
                    <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "var(--color-accent)" }}>+{claimAmount} Sao! 🎉</div>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "4px" }}>Số sao đã được chuyển vào số dư của bạn.</p>
                  </div>
                )}
              </div>
            )}

            <button
              className="glow-btn-secondary"
              onClick={() => setShowChestModal(false)}
              style={{ width: "100%", padding: "10px", marginTop: "10px", fontSize: "0.85rem" }}
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Bảng Nhiệm Vụ Hàng Ngày */}
      {currentUser && (
        <QuestDrawer
          isOpen={showQuests}
          onClose={() => setShowQuests(false)}
          onBalanceUpdate={(newBalance) => {
            setCurrentUser(prev => prev ? { ...prev, starBalance: newBalance } : null);
          }}
        />
      )}
    </div>
  );
}
