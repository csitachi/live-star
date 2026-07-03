// Trang thiết lập Livestream cho Streamer (Setup Lobby).
// Hỗ trợ chọn thiết bị camera/mic, xem trước camera, cấu hình tiêu đề, danh mục, và thiết lập mục tiêu phòng trước khi lên sóng.

"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useToast } from "@/components/Toast/ToastContext";

interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
}

export default function StreamerSetupPage() {
  const router = useRouter();
  const toast = useToast();

  // State thông tin chung
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Configuration States
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Talkshow");
  const [description, setDescription] = useState("");
  const [useVirtualMode, setUseVirtualMode] = useState(false);

  // Group Goal States
  const [hasGoal, setHasGoal] = useState(false);
  const [goalTitle, setGoalTitle] = useState("");
  const [goalTarget, setGoalTarget] = useState("");

  // Active Stream States (Để nhắc nhở nếu đã có phiên livestream đang diễn ra)
  const [activeStreamId, setActiveStreamId] = useState<string | null>(null);
  const [activeStreamTitle, setActiveStreamTitle] = useState<string>("");
  const [showActivePrompt, setShowActivePrompt] = useState(false);

  // Media Devices States
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [selectedAudio, setSelectedAudio] = useState("");
  const [mediaError, setMediaError] = useState("");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // 1. Kiểm tra phiên đăng nhập (Session) & Kiểm tra stream đang LIVE
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setCurrentUser(data.user);
          setTitle(`Livestream của ${data.user.displayName} 🌟`);

          // Kiểm tra xem streamer có stream nào đang LIVE hay không
          const streamsRes = await fetch("/api/streams");
          if (streamsRes.ok) {
            const allStreams = await streamsRes.json();
            const liveStream = allStreams.find((s: any) => s.streamerId === data.user.id && s.status === "LIVE");
            if (liveStream) {
              setActiveStreamId(liveStream.id);
              setActiveStreamTitle(liveStream.title);
              setShowActivePrompt(true);
            }
          }
        } else {
          router.replace("/");
        }
      } catch (err) {
        console.error("Lỗi lấy thông tin session hoặc active stream:", err);
        router.replace("/");
      } finally {
        setLoading(false);
      }
    }
    checkSession();
  }, [router]);

  // 2. Lấy danh sách thiết bị Camera & Mic
  useEffect(() => {
    if (!currentUser || useVirtualMode) return;

    async function initMediaDevices() {
      try {
        // Yêu cầu quyền truy cập trước để được liệt kê tên thiết bị
        const initialStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = initialStream;
        if (videoRef.current) {
          videoRef.current.srcObject = initialStream;
        }

        const devices = await navigator.mediaDevices.enumerateDevices();
        const video = devices.filter((d) => d.kind === "videoinput");
        const audio = devices.filter((d) => d.kind === "audioinput");

        setVideoDevices(video);
        setAudioDevices(audio);

        if (video.length > 0) setSelectedVideo(video[0].deviceId);
        if (audio.length > 0) setSelectedAudio(audio[0].deviceId);
        setMediaError("");
      } catch (err: any) {
        console.warn("Không thể truy cập camera thực tế:", err);
        setMediaError("Không phát hiện camera. Bạn có thể sử dụng chế độ Virtual Mode.");
        setUseVirtualMode(true);
      }
    }

    initMediaDevices();

    return () => {
      stopCamera();
    };
  }, [currentUser, useVirtualMode]);

  // 3. Thay đổi thiết bị webcam/mic được chọn
  useEffect(() => {
    if (useVirtualMode || !selectedVideo) return;

    async function switchCamera() {
      try {
        stopCamera();
        const constraints = {
          video: { deviceId: selectedVideo ? { exact: selectedVideo } : undefined },
          audio: selectedAudio ? { deviceId: selectedAudio ? { exact: selectedAudio } : undefined } : true,
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Lỗi chuyển đổi thiết bị:", err);
      }
    }

    switchCamera();
  }, [selectedVideo, selectedAudio, useVirtualMode]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const handleEndActiveStream = async () => {
    if (!activeStreamId) return;
    try {
      setLoading(true);
      const res = await fetch("/api/streams", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ streamId: activeStreamId })
      });
      if (res.ok) {
        setShowActivePrompt(false);
        setActiveStreamId(null);
        toast.success("Đã kết thúc phiên livestream cũ thành công! Bây giờ bạn có thể thiết lập phòng mới.");
      } else {
        const err = await res.json();
        toast.error(err.error || "Không thể kết thúc phiên livestream cũ!");
      }
    } catch (err) {
      console.error("Lỗi kết thúc stream:", err);
      toast.error("Đã xảy ra lỗi hệ thống!");
    } finally {
      setLoading(false);
    }
  };

  // 4. Xử lý click "Bắt đầu phát sóng (Go Live)"
  const handleGoLive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    if (!title.trim()) {
      toast.warning("Vui lòng điền tiêu đề phòng livestream!");
      return;
    }

    try {
      setLoading(true);

      // Bước A: Tạo phòng livestream
      const streamRes = await fetch("/api/streams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          category,
          streamerId: currentUser.id,
        }),
      });

      const streamData = await streamRes.json();
      if (!streamRes.ok) {
        throw new Error(streamData.error || "Không thể tạo phòng livestream!");
      }

      // Bước B: Nếu có đặt mục tiêu phòng
      if (hasGoal && goalTitle.trim() && goalTarget) {
        const targetNum = parseInt(goalTarget, 10);
        if (Number.isInteger(targetNum) && targetNum > 0) {
          const goalRes = await fetch("/api/streams/goal", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              streamId: streamData.id,
              goalTitle: goalTitle.trim(),
              goalTarget: targetNum,
            }),
          });
          if (!goalRes.ok) {
            console.error("Không thể cấu hình mục tiêu ban đầu.");
          }
        }
      }

      // Giải phóng camera trước khi chuyển trang để trang live nhận luồng mới
      stopCamera();

      // Bước C: Chuyển hướng đến phòng live
      router.push(`/streamer/live/${streamData.id}`);
    } catch (err: any) {
      toast.error(err.message || "Đã xảy ra lỗi khi tạo phòng!");
      setLoading(false);
    }
  };

  if (loading && !currentUser) {
    return (
      <div className={styles.loadingScreen}>
        <div className="spinner"></div>
        <p>Đang xác thực thông tin tài khoản...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Cột trái: Preview luồng camera hoặc avatar virtual */}
      <div className={styles.previewSection}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px" }}>
          📺 Xem Trước Livestream
        </h2>
        
        <div className={styles.videoBox}>
          {!useVirtualMode ? (
            <video ref={videoRef} autoPlay playsInline muted className={styles.videoFeed} />
          ) : (
            <div className={styles.virtualBox}>
              <div className={styles.avatarGlow}>
                <img src={currentUser?.avatarUrl} alt={currentUser?.displayName} className={styles.avatarImg} />
              </div>
              <span className="live-badge" style={{ marginTop: "15px" }}>VIRTUAL MODE</span>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "10px" }}>
                Hệ thống đang phát nhạc sóng âm ảo kịch tính (Virtual Soundwave Canvas).
              </p>
            </div>
          )}

          {mediaError && (
            <div style={{ position: "absolute", top: "10px", left: "10px", right: "10px", background: "rgba(224, 86, 36, 0.9)", color: "#fff", padding: "8px", borderRadius: "8px", fontSize: "0.8rem", textAlign: "center", zIndex: 10 }}>
              ⚠️ {mediaError}
            </div>
          )}
        </div>

        {/* Thiết lập thiết bị phần cứng */}
        {!useVirtualMode && (
          <div className="premium-card" style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>Chọn Camera:</label>
              <select 
                value={selectedVideo} 
                onChange={(e) => setSelectedVideo(e.target.value)}
                style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontSize: "0.85rem" }}
              >
                {videoDevices.map((d) => (
                  <option key={d.deviceId} value={d.deviceId} style={{ background: "#111" }}>{d.label || `Camera ${d.deviceId.slice(0, 5)}`}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>Chọn Microphone:</label>
              <select 
                value={selectedAudio} 
                onChange={(e) => setSelectedAudio(e.target.value)}
                style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontSize: "0.85rem" }}
              >
                {audioDevices.map((d) => (
                  <option key={d.deviceId} value={d.deviceId} style={{ background: "#111" }}>{d.label || `Microphone ${d.deviceId.slice(0, 5)}`}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Cột phải: Form nhập thông tin live */}
      <div className={styles.configSection}>
        <div className="premium-card">
          <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
            <img src={currentUser?.avatarUrl} alt={currentUser?.displayName} style={{ width: "48px", height: "48px", borderRadius: "50%", border: "2px solid var(--color-primary)" }} />
            <div>
              <h1 style={{ fontSize: "1.2rem", fontWeight: "800" }}>Xin chào, {currentUser?.displayName}!</h1>
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Thiết lập phòng và nhấn Lên Sóng</p>
            </div>
          </div>

          <form onSubmit={handleGoLive} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>Tiêu đề Livestream:</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ví dụ: Buổi hát live yêu cầu theo yêu cầu 🎤"
                style={{ width: "100%", padding: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }}
              />
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>Chủ đề phòng:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: "100%", padding: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }}
              >
                <option value="Talkshow" style={{ background: "#111" }}>Trò chuyện 💬</option>
                <option value="Music" style={{ background: "#111" }}>Âm nhạc 🎵</option>
                <option value="Gaming" style={{ background: "#111" }}>Trò chơi 🎮</option>
                <option value="Comedy" style={{ background: "#111" }}>Hài kịch 🎭</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>Mô tả ngắn phòng live (tùy chọn):</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Nhập thông tin giới thiệu cho Viewer khi vào xem..."
                style={{ width: "100%", height: "80px", padding: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", resize: "none" }}
              />
            </div>

            {/* Checkbox Virtual Mode */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 0" }}>
              <input
                type="checkbox"
                id="virtualModeCheck"
                checked={useVirtualMode}
                onChange={(e) => setUseVirtualMode(e.target.checked)}
                style={{ width: "16px", height: "16px", cursor: "pointer" }}
              />
              <label htmlFor="virtualModeCheck" style={{ fontSize: "0.85rem", cursor: "pointer", userSelect: "none" }}>
                🎭 Bật Virtual Mode (Không dùng Camera, phát sóng hoạt họa)
              </label>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.08)", margin: "10px 0" }} />

            {/* Đặt mục tiêu phòng */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="checkbox"
                  id="hasGoalCheck"
                  checked={hasGoal}
                  onChange={(e) => setHasGoal(e.target.checked)}
                  style={{ width: "16px", height: "16px", cursor: "pointer" }}
                />
                <label htmlFor="hasGoalCheck" style={{ fontSize: "0.85rem", fontWeight: "700", cursor: "pointer" }}>
                  🎯 Cấu hình Cột mốc Mục tiêu nhóm (Group Goals)
                </label>
              </div>

              {hasGoal && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 120px", gap: "12px", marginTop: "8px" }}>
                  <div>
                    <label style={{ fontSize: "0.7rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>Tiêu đề cột mốc:</label>
                    <input
                      type="text"
                      value={goalTitle}
                      onChange={(e) => setGoalTitle(e.target.value)}
                      placeholder="Ví dụ: Đạt 1000 sao nhảy cover"
                      style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontSize: "0.85rem" }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.7rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>Số sao (Target):</label>
                    <input
                      type="number"
                      value={goalTarget}
                      onChange={(e) => setGoalTarget(e.target.value)}
                      placeholder="1000"
                      style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontSize: "0.85rem" }}
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="glow-btn-primary"
              style={{ width: "100%", padding: "14px", marginTop: "15px", fontSize: "1rem", fontWeight: "bold" }}
            >
              🚀 LÊN SÓNG TRỰC TIẾP
            </button>
          </form>
        </div>
      </div>
      {/* Overlay nhắc nhở phiên Livestream đang diễn ra */}
      {showActivePrompt && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" }}>
          <div className="premium-card" style={{ maxWidth: "450px", width: "100%", textAlign: "center", border: "1px solid var(--color-primary-glow)" }}>
            <span style={{ fontSize: "3rem", display: "block", marginBottom: "15px" }}>🎥</span>
            <h2 style={{ fontSize: "1.4rem", fontWeight: "800", marginBottom: "12px" }}>Livestream Đang Diễn Ra!</h2>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "20px", lineHeight: "1.5" }}>
              Hệ thống phát hiện bạn đang có một phiên livestream chưa kết thúc: <br />
              <strong style={{ color: "var(--color-primary)" }}>"{activeStreamTitle}"</strong>. <br />
              Bạn muốn xử lý phiên live này như thế nào?
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button 
                className="glow-btn-primary" 
                onClick={() => router.push(`/streamer/live/${activeStreamId}`)}
                style={{ width: "100%", padding: "12px", fontSize: "0.95rem", fontWeight: "bold" }}
              >
                🎥 TIẾP TỤC PHIÊN LIVE CŨ
              </button>
              <button 
                onClick={handleEndActiveStream}
                style={{ width: "100%", padding: "12px", background: "rgba(224, 86, 36, 0.15)", border: "1px solid rgba(224, 86, 36, 0.4)", borderRadius: "8px", color: "#e05624", cursor: "pointer", fontSize: "0.95rem", fontWeight: "bold", transition: "all 0.2s" }}
                onMouseOver={(e) => { e.currentTarget.style.background = "rgba(224, 86, 36, 0.25)"; }}
                onMouseOut={(e) => { e.currentTarget.style.background = "rgba(224, 86, 36, 0.15)"; }}
              >
                🔄 ĐÓNG PHIÊN CŨ & TẠO PHÒNG MỚI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
