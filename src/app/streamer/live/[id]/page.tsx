// Trang Streamer Dashboard (Giao diện phát sóng).
// Hỗ trợ phát Webcam qua WebRTC, chat thời gian thực, hiển thị thông báo tặng sao và giả lập tương tác.

"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "../../page.module.css";
import LiveChat from "@/components/LiveChat";
import { getStreamerLevel } from "@/lib/level";

interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  starsGifted: number;
  starsEarned: number;
}

interface Stream {
  id: string;
  title: string;
  description: string | null;
  category: string;
  status: string;
  viewerCount: number;
  totalStars: number;
  streamerId: string;
  goalTitle?: string | null;
  goalTarget: number;
  goalCurrent: number;
}

interface ChatMessage {
  id: string;
  sender: {
    displayName: string;
    avatarUrl: string;
  };
  text: string;
  createdAt: string;
  isGift: boolean;
  giftStars?: number;
}

interface GiftAlert {
  id: string;
  senderName: string;
  avatarUrl: string;
  starAmount: number;
  message: string | null;
}

const WEBRTC_ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" }, // STUN server miễn phí của Google để vượt NAT
  ],
};

function StreamerContent() {
  const router = useRouter();
  const params = useParams();
  const streamId = params.id as string;

  // State thông tin chung
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [stream, setStream] = useState<Stream | null>(null);
  const [viewerCount, setViewerCount] = useState(0);
  const [totalStars, setTotalStars] = useState(0);
  const [loading, setLoading] = useState(true);

  // State chat và quà tặng
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMsg, setInputMsg] = useState("");
  const [activeGift, setActiveGift] = useState<GiftAlert | null>(null);

  // Chế độ phát sóng & Giả lập tương tác (Bot)
  const [useCamera, setUseCamera] = useState(false);
  const [botSimulator, setBotSimulator] = useState(false);

  // Refs quản lý WebSocket và WebRTC
  const wsRef = useRef<WebSocket | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  
  // KIẾN THỨC BE: LƯU TRỮ TRẠNG THÁI WEBRTC PEERS
  // Streamer cần phát tới nhiều viewer đồng thời (1-to-Many).
  // Vì vậy, ta duy trì một Map lưu các đối tượng `RTCPeerConnection` tương ứng với socketId của từng viewer.
  const peerConnectionsRef = useRef<Map<string, RTCPeerConnection>>(new Map());

  // Refs phục vụ hoạt họa Canvas giả lập
  const animationFrameIdRef = useRef<number | null>(null);

  // Trạng thái PK Battles
  const [pkBattle, setPkBattle] = useState<any | null>(null);
  const [pkTimeLeft, setPkTimeLeft] = useState<number | null>(null);
  const [incomingInvite, setIncomingInvite] = useState<any | null>(null);
  const [activeStreams, setActiveStreams] = useState<any[]>([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [bigGiftEffect, setBigGiftEffect] = useState<{ senderName: string; avatarUrl: string; starAmount: number; streamName: string } | null>(null);
  const pkBattleRef = useRef<any>(null); // Ref để access pkBattle trong handleEndStream (tránh stale closure)

  // Trạng thái Group Goals
  const [showGoalConfig, setShowGoalConfig] = useState(false);
  const [goalTitleInput, setGoalTitleInput] = useState("");
  const [goalTargetInput, setGoalTargetInput] = useState("");
  const [goalAchieved, setGoalAchieved] = useState(false);

  // 1.1 Khởi chạy các đồng hồ đếm ngược và helper
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

  // Sync pkBattle vào ref để dùng trong handleEndStream
  useEffect(() => {
    pkBattleRef.current = pkBattle;
  }, [pkBattle]);

  const fetchPKStatus = async () => {
    if (!currentUser) return;
    try {
      const res = await fetch(`/api/pk/status?streamerId=${currentUser.id}`);
      if (res.ok) {
        const data = await res.json();
        setPkBattle(data);
      }
    } catch (err) {
      console.error("Lỗi lấy PK status:", err);
    }
  };

  const loadActiveStreams = async () => {
    try {
      const res = await fetch("/api/streams");
      if (res.ok) {
        const data = await res.json();
        // Lấy các stream LIVE của streamer khác
        const filtered = data.filter((s: any) => s.status === "LIVE" && s.streamerId !== currentUser?.id);
        setActiveStreams(filtered);
        setShowInviteModal(true);
      }
    } catch (err) {
      console.error("Lỗi tải danh sách stream:", err);
    }
  };

  const handleSendPKInvite = async (opponentStreamerId: string) => {
    if (!currentUser) return;
    try {
      const res = await fetch("/api/pk/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ streamerId1: currentUser.id, streamerId2: opponentStreamerId })
      });
      const data = await res.json();
      if (res.ok) {
        alert("Đã gửi lời mời PK thành công!");
        setShowInviteModal(false);
        // Gửi qua WebSocket
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({
            type: "pk-invite",
            payload: {
              targetStreamerId: opponentStreamerId,
              battle: data
            }
          }));
        }
      } else {
        alert(data.error || "Không thể mời PK!");
      }
    } catch (err) {
      console.error("Lỗi mời PK:", err);
    }
  };

  const handleRespondPKInvite = async (action: "ACCEPT" | "REJECT") => {
    if (!incomingInvite) return;
    try {
      const res = await fetch("/api/pk/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ battleId: incomingInvite.battle.id, action })
      });
      const data = await res.json();
      if (res.ok) {
        setIncomingInvite(null);
        if (action === "ACCEPT") {
          const isStream1 = data.streamId1 === streamId;
          const opponentStream = isStream1 ? data.stream2 : data.stream1;
          const opponent = opponentStream?.streamer ? {
            id: opponentStream.streamer.id,
            displayName: opponentStream.streamer.displayName,
            avatarUrl: opponentStream.streamer.avatarUrl
          } : null;
          const battleWithOpponent = { ...data, opponent };

          setPkBattle(battleWithOpponent);
          // Đồng bộ qua WebSocket
          if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({
              type: "pk-accept",
              payload: {
                battle: battleWithOpponent,
                opponentStreamId: incomingInvite.senderStreamId
              }
            }));
          }
        }
      } else {
        alert(data.error || "Lỗi xử lý phản hồi PK!");
      }
    } catch (err) {
      console.error("Lỗi phản hồi PK:", err);
    }
  };

  const handleSaveGoal = async () => {
    if (!stream) return;
    const targetVal = parseInt(goalTargetInput);
    if (isNaN(targetVal) || targetVal < 0) {
      alert("Mục tiêu phải là số nguyên không âm!");
      return;
    }
    try {
      const res = await fetch("/api/streams/goal", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          streamId: stream.id,
          goalTitle: goalTitleInput,
          goalTarget: targetVal
        })
      });
      const data = await res.json();
      if (res.ok) {
        setStream(data);
        setShowGoalConfig(false);
        setGoalAchieved(false);
        // Đồng bộ lên WebSocket
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({
            type: "goal-updated",
            payload: {
              goalTitle: data.goalTitle,
              goalTarget: data.goalTarget,
              goalCurrent: 0
            }
          }));
        }
      } else {
        alert(data.error || "Không thể thiết lập mục tiêu!");
      }
    } catch (err) {
      console.error("Lỗi lưu mục tiêu:", err);
    }
  };

  // 1. Tải thông tin người dùng bằng Cookie và kiểm tra tính hợp lệ của luồng stream
  useEffect(() => {
    if (!streamId) {
      alert("Không tìm thấy ID phòng phát sóng!");
      router.push("/");
      return;
    }

    const initPage = async () => {
      try {
        // Tải thông tin user đăng nhập từ Session Cookie an toàn
        const authRes = await fetch("/api/auth/me");
        if (!authRes.ok) throw new Error();
        const authData = await authRes.json();
        
        if (!authData.authenticated || !authData.user) {
          alert("Vui lòng đăng nhập tại Trang chủ trước!");
          router.push("/");
          return;
        }
        
        const userData = authData.user;
        setCurrentUser(userData);

        // Tải thông tin stream xem streamer có khớp không và phòng có đang LIVE không
        const streamsRes = await fetch("/api/streams");
        const allStreams: Stream[] = await streamsRes.json();
        const activeStream = allStreams.find((s) => s.id === streamId);

        if (!activeStream) {
          alert("Không tìm thấy thông tin phòng livestream!");
          router.push("/");
          return;
        }

        if (activeStream.streamerId !== userData.id) {
          alert("Bạn không phải chủ sở hữu của phòng livestream này!");
          router.push("/");
          return;
        }

        if (activeStream.status !== "LIVE") {
          alert("Livestream này đã kết thúc.");
          router.push("/");
          return;
        }

        setStream(activeStream);
        setTotalStars(activeStream.totalStars);
        setViewerCount(activeStream.viewerCount);
        setLoading(false);

        // Tải trạng thái PK Battle
        try {
          const pkRes = await fetch(`/api/pk/status?streamerId=${userData.id}`);
          if (pkRes.ok) {
            const pkData = await pkRes.json();
            if (pkData) {
              setPkBattle(pkData);
            }
          }
        } catch (pkErr) {
          console.error("Lỗi lấy PK status ban đầu:", pkErr);
        }

        // Bắt đầu kết nối cổng WebSockets thời gian thực
        connectWebSocket(userData, activeStream.id);
      } catch (err) {
        console.error(err);
        router.push("/");
      }
    };

    initPage();

    return () => {
      // Dọn dẹp kết nối khi thoát trang
      if (wsRef.current) wsRef.current.close();
      stopCamera();
      stopCanvasAnimation();
      // Đóng tất cả kết nối WebRTC Peer
      peerConnectionsRef.current.forEach((pc) => pc.close());
      peerConnectionsRef.current.clear();
    };
  }, [streamId]);

  // 2. Thiết lập Camera / Canvas hoạt họa
  useEffect(() => {
    if (loading) return;

    if (useCamera) {
      stopCanvasAnimation();
      startCamera();
    } else {
      stopCamera();
      startCanvasAnimation();
    }
  }, [useCamera, loading]);

  // 3. Khởi tạo kết nối WebSocket (Thời gian thực)
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
      console.log("🟢 Đã kết nối tới WebSocket Server");
      // Gửi bản tin tham gia phòng với vai trò là Streamer
      ws.send(
        JSON.stringify({
          type: "join-room",
          payload: {
            streamId: roomId,
            isStreamer: true,
            user: {
              id: user.id,
              username: user.username,
              displayName: user.displayName,
              avatarUrl: user.avatarUrl,
            },
          },
        })
      );
    };

    ws.onmessage = async (event) => {
      try {
        const message = JSON.parse(event.data);
        const { type, payload } = message;

        switch (type) {
          case "room-stats":
            setViewerCount(payload.viewerCount);
            break;

          case "chat-message":
            setMessages((prev) => [...prev, payload]);
            break;

          case "gift-broadcast":
            // Nhận thông báo có người tặng sao -> Cập nhật tổng số sao
            setTotalStars(payload.totalStars);
            // Hiển thị toast quà tặng nổi bật
            setActiveGift({
              id: payload.id,
              senderName: payload.sender.displayName,
              avatarUrl: payload.sender.avatarUrl,
              starAmount: payload.starAmount,
              message: payload.message,
            });
            // Trigger hiệu ứng quà lớn nếu tặng từ 100 sao trở lên (hiển thị toàn màn hình cả 2 phòng)
            if (payload.starAmount >= 100) {
              setBigGiftEffect({
                senderName: payload.sender.displayName,
                avatarUrl: payload.sender.avatarUrl,
                starAmount: payload.starAmount,
                streamName: stream?.title || ""
              });
              // Tự ẩn sau 3 giây
              setTimeout(() => setBigGiftEffect(null), 3000);
            }
            // Thêm tin nhắn tặng sao vào khung chat
            setMessages((prev) => [
              ...prev,
              {
                id: payload.id,
                sender: payload.sender,
                text: payload.message
                  ? `Đã tặng ${payload.starAmount} sao! 🌟 "${payload.message}"`
                  : `Đã tặng ${payload.starAmount} sao! 🌟`,
                createdAt: payload.createdAt,
                isGift: true,
                giftStars: payload.starAmount,
              },
            ]);
            break;

          case "pk-invited":
            setIncomingInvite(payload);
            break;

          case "pk-invite-error":
            alert(payload.error || "Không thể gửi lời mời PK!");
            break;

          case "pk-forfeit-broadcast": {
            const { forfeitedByStreamId, forfeitedByUser, reason } = payload;
            const isOpponentForfeit = forfeitedByStreamId !== streamId;
            const reasonText = reason === "DISCONNECT" ? "mất kết nối" : "tự ý rời khỏi";
            if (isOpponentForfeit) {
              // Đối thủ bỏ cuộc -> mình thắng!
              alert(`❤️ Bạn đã THẪMG trận PK! ${forfeitedByUser?.displayName || "Đối thủ"} đã ${reasonText} trước khi hết giờ.`);
            } else {
              // Mình bỏ cuộc (do tắc mạng, ...) -> đối thủ thắng
              alert(`❌ Phiên PK đã kết thúc do kết nối bị gián đoạn!`);
            }
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
              text: `⚔️ Trận chiến PK song đấu đã bắt đầu!`,
              createdAt: new Date().toISOString(),
              isGift: true
            }]);
            break;

          case "pk-score-broadcast":
            setPkBattle((prev: any) => prev ? { ...prev, score1: payload.score1, score2: payload.score2 } : null);
            break;

          case "goal-broadcast":
            setStream((prev: any) => prev ? { ...prev, goalTitle: payload.goalTitle, goalTarget: payload.goalTarget, goalCurrent: payload.goalCurrent } : null);
            if (payload.goalCurrent >= payload.goalTarget && payload.goalTarget > 0) {
              setGoalAchieved(true);
            }
            break;

          // ==========================================
          // KIẾN THỨC BE: XỬ LÝ HANDSHAKE WEBRTC SIGNALING
          // ==========================================
          case "viewer-joined":
            // Khi có một viewer mới tham gia phòng, Streamer sẽ chủ động thiết lập WebRTC PeerConnection
            if (useCamera && localStreamRef.current) {
              initiateWebRTCConnection(payload.viewerSocketId);
            }
            break;

          case "webrtc-answer":
            // Khi nhận được SDP Answer từ Viewer phản hồi, thiết lập cấu hình remote
            const pcAnswer = peerConnectionsRef.current.get(payload.senderSocketId);
            if (pcAnswer) {
              await pcAnswer.setRemoteDescription(new RTCSessionDescription(payload.sdp));
              console.log(`📡 Đã thiết lập xong WebRTC Answer cho Viewer: ${payload.senderSocketId}`);
            }
            break;

          case "webrtc-candidate":
            // Thêm ICE Candidate nhận được từ Viewer để hoàn tất đường truyền mạng tối ưu
            const pcCandidate = peerConnectionsRef.current.get(payload.senderSocketId);
            if (pcCandidate) {
              await pcCandidate.addIceCandidate(new RTCIceCandidate(payload.candidate));
            }
            break;

          case "viewer-left":
            // Khi viewer thoát, đóng và xóa PeerConnection tương ứng để giải phóng RAM
            const pcLeft = peerConnectionsRef.current.get(payload.viewerSocketId);
            if (pcLeft) {
              pcLeft.close();
              peerConnectionsRef.current.delete(payload.viewerSocketId);
              console.log(`🔌 Đã xóa kết nối WebRTC của Viewer rời đi: ${payload.viewerSocketId}`);
            }
            break;
        }
      } catch (error) {
        console.error("Lỗi phân tích WebSocket message:", error);
      }
    };

    ws.onclose = () => {
      console.log("🔴 Đã ngắt kết nối WebSocket");
    };
  };

  // Tắt/Bật webcam thực tế
  const startCamera = async () => {
    try {
      const streamObj = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: true,
      });
      localStreamRef.current = streamObj;
      if (videoRef.current) {
        videoRef.current.srcObject = streamObj;
      }
      console.log("📸 Đã kích hoạt Camera & Microphone thành công.");

      // Nếu có sẵn viewers đang chờ trong phòng khi vừa bật camera, thiết lập WebRTC cho họ ngay
      // (Mô phỏng trường hợp bật camera muộn).
    } catch (err) {
      console.warn("⚠️ Không thể truy cập Camera. Chuyển sang luồng Virtual Streamer giả lập.", err);
      setUseCamera(false);
      startCanvasAnimation();
    }
  };

  const stopCamera = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Thiết lập WebRTC Peer Connection phát webcam tới Viewer cụ thể
  const initiateWebRTCConnection = async (viewerSocketId: string) => {
    try {
      if (!localStreamRef.current || !wsRef.current) return;

      console.log(`📡 Đang thiết lập WebRTC PeerConnection tới Viewer: ${viewerSocketId}`);

      const pc = new RTCPeerConnection(WEBRTC_ICE_SERVERS);
      peerConnectionsRef.current.set(viewerSocketId, pc);

      // Thêm các track (Video, Audio) từ webcam vào kết nối P2P này
      localStreamRef.current.getTracks().forEach((track) => {
        pc.addTrack(track, localStreamRef.current!);
      });

      // Lắng nghe sự kiện tìm thấy ICE Candidate để gửi ngược về cho Viewer
      pc.onicecandidate = (event) => {
        if (event.candidate && wsRef.current) {
          wsRef.current.send(
            JSON.stringify({
              type: "webrtc-candidate",
              payload: {
                candidate: event.candidate,
                targetSocketId: viewerSocketId,
              },
            })
          );
        }
      };

      // Tạo Offer mô tả luồng video gửi đi
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Gửi Offer qua WebSocket signaling server
      wsRef.current.send(
        JSON.stringify({
          type: "webrtc-offer",
          payload: {
            sdp: offer,
            targetSocketId: viewerSocketId,
          },
        })
      );
    } catch (error) {
      console.error(`Lỗi tạo WebRTC kết nối tới ${viewerSocketId}:`, error);
    }
  };

  // Khởi chạy hoạt họa hoạt cảnh Canvas giả lập luồng phát sóng (Virtual visualizer)
  const startCanvasAnimation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Đặt độ phân giải canvas
    canvas.width = 1280;
    canvas.height = 720;

    let time = 0;
    const particles: { x: number; y: number; size: number; speedY: number; speedX: number; color: string }[] = [];
    
    // Khởi tạo các hạt ánh sáng chuyển động
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 6 + 2,
        speedY: -(Math.random() * 1.5 + 0.5),
        speedX: Math.random() * 1 - 0.5,
        color: Math.random() > 0.5 ? "rgba(157, 78, 221, 0.3)" : "rgba(255, 0, 127, 0.3)"
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Tạo background gradient tối ảo diệu
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, "#0b0813");
      grad.addColorStop(1, "#030206");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Vẽ sóng âm visualizer ở giữa màn hình
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

      // Sóng phụ mờ hơn tông hồng
      ctx.strokeStyle = "rgba(255, 0, 127, 0.3)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 10) {
        const y = canvas.height / 2 + Math.cos(x * 0.008 + time * 1.2) * 50 * Math.sin(x * 0.004 - time);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Vẽ các hạt lơ lửng bay lên (simulating stars/particles)
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }

        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow
      });

      // Viết chữ giả lập "VIRTUAL STREAMER IS BROADCASTING"
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.font = "bold 24px Outfit, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("🔴 VIRTUAL BROADCAST SIMULATOR ACTIVE", canvas.width / 2, 80);

      ctx.fillStyle = "rgba(156, 163, 175, 0.6)";
      ctx.font = "16px Outfit, sans-serif";
      ctx.fillText("Hệ thống đang phát luồng hoạt họa từ Canvas thời gian thực.", canvas.width / 2, 110);

      animationFrameIdRef.current = requestAnimationFrame(draw);
    };

    draw();
  };

  const stopCanvasAnimation = () => {
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }
  };

  // 4. Giả lập tương tác tự động (Auto Bot Simulator)
  // Giúp người dùng trải nghiệm tính năng mà không cần mở nhiều cửa sổ
  useEffect(() => {
    if (!botSimulator || !streamId) return;

    // Danh sách nội dung chat mẫu của bot
    const botComments = [
      "Stream chất lượng quá anh chị ơi! 😍",
      "Chào mọi người nhé, chúc buổi tối vui vẻ",
      "Giao diện NextJS này đẹp ghê",
      "Sao bay tung tóe luôn kìa haha",
      "Chỉ giáo em phần WebRTC với ạ!",
      "App này code bằng Prisma hả ad?",
      "Database Postgres chạy mượt phết nhỉ",
      "Tặng sao ủng hộ chủ kênh nào anh em!",
    ];

    // Dữ liệu bot viewer mẫu tương ứng với Bob, Charlie, Dave
    const bots = [
      { id: "bob-id-seeded", username: "bob", name: "Bob Viewer 🌟", amount: 10, msg: "Quá tuyệt vời ad!" },
      { id: "charlie-id-seeded", username: "charlie", name: "Charlie Fan Cứng 💎", amount: 100, msg: "Cảm ơn ad đã chia sẻ!" },
      { id: "dave-id-seeded", username: "dave", name: "Dave Newbie 🥚", amount: 50, msg: "Tặng sao nè ad ơi" },
    ];

    const runSimulation = async () => {
      // Tải danh sách user thực tế từ DB để lấy đúng ID nhằm đảm bảo giao dịch SQL thực sự chạy
      const usersRes = await fetch("/api/auth?userId=dummy").catch(() => null);
      let activeUsers = [];
      try {
        const allUsersRes = await fetch("/api/auth"); // Cần bổ sung hoặc dùng danh sách username có sẵn
        // Để đơn giản, ta sẽ lấy IDs trực tiếp bằng cách dò username
      } catch (e) {}

      // Lấy ID người dùng thực tế từ cơ sở dữ liệu dựa vào seed data
      // Chúng ta sẽ lấy Bob hoặc Charlie hoặc Dave từ DB
      const userListRes = await fetch("/api/streams"); // streams chứa streamer, hoặc ta fetch thẳng
      // Để tuyệt đối chính xác và an toàn, ta gọi api/auth?userId=[seeded_id]
      // Lấy danh sách stream cũ của Bob để biết ID? Ta biết ID Bob qua seed.
      // Giải pháp khôn ngoan nhất: Ta gửi API tặng quà với username, hoặc ta fetch User IDs trước.
      // Vì ta lưu user Bob và Charlie trong DB, ta có thể tạo một API phụ hoặc chỉ cần mô phỏng giao dịch:
      // Gọi API tặng quà `/api/gifts` với IDs thực tế của Bob, Charlie, Dave được lấy từ API hoặc seed.
      // Hãy lấy danh sách user từ DB qua một API đơn giản hoặc lấy từ Stream cũ đã seed.
    };

    const interval = setInterval(async () => {
      // Chọn ngẫu nhiên hành động: Chat (75%) hoặc Tặng Quà (25%)
      const isGift = Math.random() < 0.3;
      
      // Lấy danh sách toàn bộ người dùng để tìm Bob, Charlie, Dave thực tế
      // Ta có thể tìm thấy họ bằng cách lấy danh sách stream đã ended để tìm comment senderId
      let bobId = "";
      let charlieId = "";
      let daveId = "";
      
      try {
        const res = await fetch("/api/streams");
        const data = await res.json();
        // Tìm trong stream đã kết thúc để lấy ID của các viewer đã comment
        const endedStream = data.find((s: any) => s.status === "ENDED");
        if (endedStream && endedStream.comments) {
          // Bob và Charlie đã có bình luận ở đó
          bobId = endedStream.comments.find((c: any) => c.sender.username === "bob")?.senderId || "";
          charlieId = endedStream.comments.find((c: any) => c.sender.username === "charlie")?.senderId || "";
          daveId = endedStream.streamerId; // dự phòng
        }
      } catch (e) {}

      // Nếu không tìm thấy ID thật, ta sử dụng cơ chế mô phỏng thuần WebSocket (không cập nhật DB)
      // Nhưng nếu tìm thấy ID thật, ta gọi API thực tế để TRỪ sao của họ và CỘNG sao của streamer thật!
      const botUsers = [
        { id: bobId, username: "bob", displayName: "Bob Viewer 🌟", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" },
        { id: charlieId, username: "charlie", displayName: "Charlie Fan Cứng 💎", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150" },
        { id: bobId || charlieId, username: "dave", displayName: "Dave Newbie 🥚", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" }
      ];

      const selectedBot = botUsers[Math.floor(Math.random() * botUsers.length)];
      if (!selectedBot.id) return; // Đợi khi có ID thật

      if (isGift) {
        const amounts = [10, 100, 500];
        const giftAmount = amounts[Math.floor(Math.random() * amounts.length)];
        const giftMsg = Math.random() > 0.5 ? "Livestream hay quá ad!" : "Tặng ad sao nè";
        
        try {
          const res = await fetch("/api/gifts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              streamId,
              senderId: selectedBot.id,
              starAmount: giftAmount,
              message: giftMsg
            })
          });

          if (res.ok) {
            const data = await res.json();
            const resData = data.data;
            // Giao dịch thành công trong PostgreSQL! Bây giờ ta phát tín hiệu WebSocket để hiển thị hiệu ứng
            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
              wsRef.current.send(JSON.stringify({
                type: "gift-sent",
                payload: {
                  id: resData.transactionId,
                  user: {
                    id: selectedBot.id,
                    username: selectedBot.username,
                    displayName: selectedBot.displayName,
                    avatarUrl: selectedBot.avatar
                  },
                  starAmount: giftAmount,
                  message: giftMsg,
                  totalStars: resData.totalStars // Số sao lũy kế mới từ DB
                }
              }));

              // Đồng bộ mục tiêu nhóm
              if (resData.goalCurrent !== undefined && stream && stream.goalTarget > 0) {
                wsRef.current.send(JSON.stringify({
                  type: "goal-updated",
                  payload: {
                    goalTitle: stream.goalTitle,
                    goalTarget: stream.goalTarget,
                    goalCurrent: resData.goalCurrent
                  }
                }));
              }

              // Đồng bộ PK Battle
              const newPkBattle = resData.pkBattle;
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
          }
        } catch (err) {
          console.error("Lỗi bot tặng quà giả lập:", err);
        }
      } else {
        // Mô phỏng bình luận
        const commentText = botComments[Math.floor(Math.random() * botComments.length)];
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({
            type: "chat-message",
            payload: {
              id: Math.random().toString(),
              sender: {
                id: selectedBot.id,
                username: selectedBot.username,
                displayName: selectedBot.displayName,
                avatarUrl: selectedBot.avatar
              },
              text: commentText,
              createdAt: new Date().toISOString()
            }
          }));
        }
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [botSimulator, streamId]);

  // 5. Gửi bình luận từ Streamer
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || !wsRef.current || !currentUser) return;

    wsRef.current.send(
      JSON.stringify({
        type: "chat-message",
        payload: {
          id: Math.random().toString(),
          sender: currentUser,
          text: inputMsg,
        },
      })
    );
    setInputMsg("");
  };

  // 6. Kết thúc Livestream
  const handleEndStream = async () => {
    const confirmEnd = window.confirm("Bạn có chắc chắn muốn kết thúc buổi phát sóng trực tiếp này?");
    if (!confirmEnd || !currentUser || !streamId) return;

    try {
      const currentPkBattle = pkBattleRef.current;

      // A. Nếu đang trong trận PK, gửi forfeit trước
      if (currentPkBattle && currentPkBattle.status === "LIVE") {
        // Gọi API forfeit để cập nhật DB
        await fetch("/api/pk/forfeit", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            battleId: currentPkBattle.id,
            forfeiterId: currentUser.id
          })
        });
        // Emit WS forfeit (server sẽ broadcast sang cả 2 phòng)
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({
            type: "pk-forfeit",
            payload: { battleId: currentPkBattle.id }
          }));
        }
      }

      // B. Thông báo qua WebSocket trước để Viewer biết phòng đã đóng
      if (wsRef.current) {
        wsRef.current.send(JSON.stringify({ type: "end-stream" }));
      }

      // C. Gửi yêu cầu PUT tới API `/api/streams` để cập nhật trạng thái phòng thành ENDED
      await fetch("/api/streams", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ streamId }),
      });

      router.push("/");
    } catch (error) {
      console.error("Lỗi khi đóng livestream:", error);
      router.push("/");
    }
  };

  // Tắt hiển thị Toast sau 5 giây
  useEffect(() => {
    if (activeGift) {
      const timer = setTimeout(() => {
        setActiveGift(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [activeGift]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        🔄 Đang khởi tạo luồng livestream...
      </div>
    );
  }

  const streamerStars = (currentUser?.starsEarned || 0) + totalStars;
  const streamerLevelInfo = getStreamerLevel(streamerStars);

  return (
    <div className={styles.container}>
      {/* Vùng bên trái: Luồng phát sóng và các bảng điều khiển */}
      <div className={styles.mainContent}>
        
        {/* Header phòng live của Streamer */}
        <div className="premium-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <img src={currentUser?.avatarUrl} alt={currentUser?.displayName} style={{ width: "48px", height: "48px", borderRadius: "50%", border: "2px solid var(--color-primary)", objectFit: "cover" }} />
            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: "700" }}>{stream?.title}</h2>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "4px" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  Idol phát sóng: <strong>{currentUser?.displayName}</strong>
                </span>
                <span
                  style={{
                    backgroundColor: streamerLevelInfo.color,
                    color: "#fff",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontSize: "0.7rem",
                    fontWeight: "bold",
                    textShadow: "0 1px 2px rgba(0,0,0,0.4)"
                  }}
                >
                  {streamerLevelInfo.title} (Lv.{streamerLevelInfo.level})
                </span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block" }}>Chủ đề phòng live</span>
            <span style={{ background: "rgba(157, 78, 221, 0.2)", border: "1px solid var(--color-primary)", color: "var(--color-primary)", padding: "2px 10px", borderRadius: "6px", fontSize: "0.8rem", fontWeight: "700", display: "inline-block", marginTop: "4px" }}>
              {stream?.category === "Talkshow" ? "Trò chuyện 💬" : stream?.category === "Music" ? "Âm nhạc 🎵" : stream?.category === "Gaming" ? "Trò chơi 🎮" : "Hài kịch 🎭"}
            </span>
          </div>
        </div>
        {/* Thanh mục tiêu nhóm phòng live */}
        {stream && stream.goalTarget > 0 && (
          <div style={{ margin: "10px 0 20px 0", padding: "10px", background: "rgba(20, 20, 28, 0.6)", borderRadius: "8px", border: "1px solid var(--border-subtle)", backdropFilter: "blur(10px)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: "bold", marginBottom: "4px" }}>
              <span style={{ color: "var(--color-primary)" }}>🎯 Mục tiêu phòng: {stream.goalTitle || "Mục tiêu chung"}</span>
              <span style={{ color: "var(--color-accent)" }}>
                {stream.goalCurrent} / {stream.goalTarget} sao {goalAchieved ? "🎉 ĐÃ ĐẠT MỐC!" : ""}
              </span>
            </div>
            <div style={{ height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{ width: `${Math.min(100, (stream.goalCurrent / stream.goalTarget) * 100)}%`, height: "100%", background: goalAchieved ? "linear-gradient(90deg, var(--color-primary), var(--color-accent))" : "var(--color-primary)", transition: "width 0.3s ease" }} />
            </div>
          </div>
        )}

        <div className={styles.videoSection} style={{ display: "flex", flexDirection: "row", overflow: "hidden", position: "relative" }}>
          {/* Left panel: Streamer chính */}
          <div style={{ flex: 1, position: "relative", height: "100%" }}>
            {useCamera ? (
              <video ref={videoRef} autoPlay playsInline muted className={styles.videoFeed} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <canvas ref={canvasRef} className={styles.virtualCanvas} style={{ width: "100%", height: "100%" }} />
            )}
            
            {pkBattle && pkBattle.status === "LIVE" && (
              <span style={{ position: "absolute", bottom: "10px", left: "10px", background: "rgba(0,0,0,0.6)", padding: "4px 8px", borderRadius: "6px", fontSize: "0.8rem", fontWeight: "bold", zIndex: 10 }}>
                Bạn (Phe Ta)
              </span>
            )}
          </div>

          {/* Right panel: Streamer đối thủ (chỉ hiển thị khi PK LIVE) */}
          {pkBattle && pkBattle.status === "LIVE" && (
            <div style={{ flex: 1, position: "relative", height: "100%", background: "#050508", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", borderLeft: "2px solid var(--color-primary)" }}>
              <img src={pkBattle.opponent?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"} alt={pkBattle.opponent?.displayName} style={{ width: "80px", height: "80px", borderRadius: "50%", border: "2px solid var(--color-secondary)" }} />
              <span style={{ marginTop: "12px", fontSize: "0.95rem", fontWeight: "700", color: "var(--color-secondary)" }}>{pkBattle.opponent?.displayName}</span>
              <span className="live-badge" style={{ marginTop: "8px", background: "var(--color-secondary)", animation: "none", fontSize: "0.65rem" }}>ĐỐI THỦ PK</span>
              
              <span style={{ position: "absolute", bottom: "10px", right: "10px", background: "rgba(0,0,0,0.6)", padding: "4px 8px", borderRadius: "6px", fontSize: "0.8rem", fontWeight: "bold", zIndex: 10 }}>
                {pkBattle.opponent?.displayName} (Phe Bạn)
              </span>
            </div>
          )}

          {/* PK Battle Score Bar */}
          {pkBattle && pkBattle.status === "LIVE" && (() => {
            // Tính đúng "Phe Ta" = stream mình đang phát (theo streamId), "Phe Địch" = đối thủ
            const isStream1 = pkBattle.streamId1 === streamId;
            const myScore = isStream1 ? pkBattle.score1 : pkBattle.score2;
            const opScore = isStream1 ? pkBattle.score2 : pkBattle.score1;
            const total = myScore + opScore;
            const myPct = total > 0 ? (myScore / total) * 100 : 50;
            return (
              <div style={{ position: "absolute", top: "50px", left: "10px", right: "10px", background: "rgba(11, 11, 15, 0.85)", borderRadius: "8px", padding: "8px 12px", zIndex: 11, display: "flex", flexDirection: "column", gap: "4px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: "bold" }}>
                  <span style={{ color: "var(--color-primary)" }}>⭐ Bạn: {myScore} sao</span>
                  <span style={{ color: "var(--color-accent)", fontSize: "0.85rem" }}>⚔️ PK SONG ĐẤU ⚔️</span>
                  <span style={{ color: "var(--color-secondary)" }}>{pkBattle.opponent?.displayName || "Đối thủ"}: {opScore} sao ⭐</span>
                </div>
                <div style={{ height: "8px", background: "#333", borderRadius: "4px", overflow: "hidden", display: "flex" }}>
                  <div style={{ width: `${myPct}%`, background: "var(--color-primary)", transition: "width 0.5s ease" }} />
                  <div style={{ flex: 1, background: "var(--color-secondary)" }} />
                </div>
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

          {/* Các thông số phủ lên Video (Overlays) */}
          <div className={styles.overlayTop}>
            <span className="live-badge">TRỰC TIẾP</span>
            <div className={styles.statsGroup}>
              <span className={styles.statBadge}>👤 {viewerCount} người xem</span>
              <span className={`${styles.statBadge} ${styles.starBadge}`}>🪙 {totalStars} sao nhận được</span>
            </div>
          </div>

          {/* Popup quà tặng nổi bật bay lên */}
          <div className={styles.overlayGift}>
            {activeGift && (
              <div className={styles.giftToast}>
                <img src={activeGift.avatarUrl} alt={activeGift.senderName} className={styles.giftAvatar} />
                <div className={styles.giftDetails}>
                  <span className={styles.giftSender}>{activeGift.senderName}</span>
                  <span className={styles.giftAction}>Đã tặng +{activeGift.starAmount} sao! 🌟</span>
                  {activeGift.message && (
                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontStyle: "italic" }}>
                      "{activeGift.message}"
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Thanh công cụ quản lý livestream */}
        <div className={`${styles.controlBar} premium-card`}>
          <div className={styles.controlLeft} style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
            <button
              className="glow-btn-secondary"
              onClick={() => setUseCamera(!useCamera)}
              style={{ fontSize: "0.85rem", padding: "8px 14px" }}
            >
              {useCamera ? "🔌 Tắt Camera" : "📸 Bật Webcam"}
            </button>

            {/* Nút đặt mục tiêu phòng */}
            <button
              onClick={() => {
                setGoalTitleInput(stream?.goalTitle || "");
                setGoalTargetInput(stream?.goalTarget?.toString() || "");
                setShowGoalConfig(true);
              }}
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "6px",
                padding: "8px 14px",
                fontSize: "0.85rem",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              🎯 Đặt Mục Tiêu
            </button>

            {/* Nút thách đấu PK */}
            <button
              onClick={loadActiveStreams}
              disabled={pkBattle && pkBattle.status === "LIVE"}
              style={{
                background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "8px 14px",
                fontSize: "0.85rem",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              ⚔️ Thách Đấu PK
            </button>

            <label className={styles.simulatorLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={botSimulator}
                onChange={(e) => setBotSimulator(e.target.checked)}
              />
              🤖 Giả lập Bots
            </label>
          </div>

          <button
            onClick={handleEndStream}
            style={{ background: "var(--live-red)", color: "white", padding: "10px 20px" }}
            className="glow-btn-primary"
          >
            🛑 Kết thúc Livestream
          </button>
        </div>

        {/* Bảng kiến thức Backend và WebRTC */}
        <div className={styles.eduSection}>
          <h4 className={styles.eduTitle}>🧠 KIẾN THỨC BACKEND & WEBRTC TRONG PHÒNG STREAMER</h4>
          <p className={styles.eduText}>
            • <strong>WebRTC Multi-Viewer (1-N):</strong> Streamer giữ vai trò là "Broadcaster". Mỗi khi có Viewer tham gia phòng, server gửi tín hiệu và Streamer sẽ khởi tạo một <code>RTCPeerConnection</code> riêng biệt cho viewer đó để truyền trực tiếp (P2P) dữ liệu video của mình qua internet.<br />
            • <strong>Bot Transaction Simulator:</strong> Khi bật bot, mã nguồn backend thực sự chạy một transaction thanh toán trong PostgreSQL để trừ sao của tài khoản bot (ví dụ: Bob) và cộng sao cho Alice. Việc này kiểm thử được các điều kiện Race Condition và cơ chế Rollback nếu số dư của bot cạn kiệt.
          </p>
        </div>
      </div>

      {/* Vùng bên phải: Khung chat thời gian thực sử dụng LiveChat Component */}
      <div className={`${styles.sidebar} glass`}>
        <LiveChat
          messages={messages}
          inputMsg={inputMsg}
          onInputChange={setInputMsg}
          onSendMessage={handleSendChat}
          placeholder="Nói gì đó với tư cách Streamer..."
          styles={styles}
        />
      </div>

      {/* BIG GIFT OVERLAY - hiệu ứng toàn màn hình khi viewer tặng quà lớn (>=100 sao) */}
      {bigGiftEffect && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
          zIndex: 999, pointerEvents: "none",
          background: "radial-gradient(ellipse at center, rgba(255, 200, 0, 0.18) 0%, transparent 70%)",
          animation: "fadeInOut 3s ease forwards"
        }}>
          {/* Hào quang vòng tròn ngoài */}
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
          {/* Particle stars */}
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              fontSize: "1.5rem",
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
              opacity: 0.8,
              animation: `floatStar ${1 + Math.random()}s ease-out forwards`,
              animationDelay: `${Math.random() * 0.5}s`
            }}>⭐</div>
          ))}
        </div>
      )}

      {/* BANNER THÔNG BÁO LỜI MỜI PK (INCOMING PK INVITE BANNER) */}
      {incomingInvite && (
        <div style={{ position: "fixed", top: "20px", right: "20px", background: "rgba(20,20,28,0.95)", border: "2px solid var(--color-primary)", borderRadius: "10px", padding: "15px", width: "320px", boxShadow: "0 0 15px var(--color-primary)", zIndex: 100, display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src={incomingInvite.senderStreamer.avatarUrl} alt={incomingInvite.senderStreamer.displayName} style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
            <div>
              <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Lời mời thách đấu PK!</span>
              <h5 style={{ fontSize: "0.95rem", fontWeight: "bold" }}>{incomingInvite.senderStreamer.displayName}</h5>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => handleRespondPKInvite("ACCEPT")}
              style={{ flex: 1, padding: "8px", background: "var(--color-primary)", border: "none", color: "#fff", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}
            >
              Đồng Ý
            </button>
            <button
              onClick={() => handleRespondPKInvite("REJECT")}
              style={{ flex: 1, padding: "8px", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}
            >
              Từ Chối
            </button>
          </div>
        </div>
      )}

      {/* MODAL DANH SÁCH IDOL HOẠT ĐỘNG ĐỂ MỜI PK */}
      {showInviteModal && (
        <div className={styles.wheelModalOverlay} onClick={() => setShowInviteModal(false)}>
          <div className={styles.wheelModalContent} onClick={(e) => e.stopPropagation()} style={{ width: "360px" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "800", color: "var(--color-primary)" }}>⚔️ Chọn Idol Thách Đấu</h3>
            <div style={{ margin: "15px 0", maxHeight: "250px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
              {activeStreams.length === 0 ? (
                <div style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: "0.85rem", padding: "20px" }}>
                  Hiện tại không có Idol nào khác đang LIVE.
                </div>
              ) : (
                activeStreams.map((s) => (
                  <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "rgba(255,255,255,0.05)", borderRadius: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <img src={s.streamer.avatarUrl} alt={s.streamer.displayName} style={{ width: "36px", height: "36px", borderRadius: "50%" }} />
                      <span style={{ fontSize: "0.9rem", fontWeight: "bold" }}>{s.streamer.displayName}</span>
                    </div>
                    <button
                      onClick={() => handleSendPKInvite(s.streamerId)}
                      style={{ padding: "6px 12px", background: "var(--color-primary)", border: "none", color: "#fff", borderRadius: "6px", fontSize: "0.75rem", fontWeight: "bold", cursor: "pointer" }}
                    >
                      Mời ⚔️
                    </button>
                  </div>
                ))
              )}
            </div>
            <button className="glow-btn-secondary" onClick={() => setShowInviteModal(false)} style={{ width: "100%", padding: "10px" }}>
              Hủy
            </button>
          </div>
        </div>
      )}

      {/* MODAL THIẾT LẬP MỤC TIÊU PHÒNG (GOAL CONFIG MODAL) */}
      {showGoalConfig && (
        <div className={styles.wheelModalOverlay} onClick={() => setShowGoalConfig(false)}>
          <div className={styles.wheelModalContent} onClick={(e) => e.stopPropagation()} style={{ width: "340px" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "800", color: "var(--color-primary)" }}>🎯 Thiết Lập Mục Tiêu Nhóm</h3>
            <div style={{ margin: "15px 0", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>Tiêu đề mục tiêu:</label>
                <input
                  type="text"
                  value={goalTitleInput}
                  onChange={(e) => setGoalTitleInput(e.target.value)}
                  placeholder="Ví dụ: Đạt mốc hát bài hát mới"
                  style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: "#fff", fontSize: "0.85rem" }}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>Mục tiêu số sao:</label>
                <input
                  type="number"
                  value={goalTargetInput}
                  onChange={(e) => setGoalTargetInput(e.target.value)}
                  placeholder="Ví dụ: 2000"
                  style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: "#fff", fontSize: "0.85rem" }}
                />
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={handleSaveGoal} style={{ flex: 1, padding: "10px", background: "var(--color-primary)", border: "none", color: "#fff", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
                Lưu lại
              </button>
              <button onClick={() => setShowGoalConfig(false)} style={{ flex: 1, padding: "10px", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function StreamerPage() {
  return (
    <Suspense fallback={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>🔄 Đang tải cấu hình phòng live...</div>}>
      <StreamerContent />
    </Suspense>
  );
}
