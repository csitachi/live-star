/**
 * VideoFilterOverlay — Phase 2: CSS Filter Effects
 *
 * Component áp dụng CSS filter lên video element khi nhận được sự kiện
 * "filter-activate" từ WebSocket Gateway (triggered bởi tặng quà đặc biệt).
 *
 * Props:
 *  - activeFilter: tên filter đang kích hoạt hoặc null
 *  - duration: thời lượng (ms)
 *  - triggeredByName: tên người kích hoạt hiệu ứng
 *  - onExpire: callback khi hiệu ứng kết thúc
 */

"use client";

import { useEffect, useState, useRef } from "react";
import styles from "@/app/viewer/[id]/page.module.css";

// Định nghĩa bảng CSS filter cho từng loại hiệu ứng
export const FILTER_PRESETS: Record<string, { label: string; cssFilter: string; emoji: string }> = {
  neon: {
    label: "Neon Glow",
    emoji: "💜",
    cssFilter:
      "brightness(1.15) saturate(2.8) hue-rotate(60deg) drop-shadow(0 0 8px rgba(157, 78, 221, 0.9))",
  },
  retro: {
    label: "Retro VHS",
    emoji: "📼",
    cssFilter: "sepia(0.8) contrast(1.3) brightness(0.9) blur(0.3px)",
  },
  cinema: {
    label: "Cinema",
    emoji: "🎬",
    cssFilter: "contrast(1.4) brightness(0.85) saturate(0.65)",
  },
  frost: {
    label: "Cool Frost",
    emoji: "❄️",
    cssFilter: "hue-rotate(200deg) saturate(1.2) brightness(1.1)",
  },
  sunset: {
    label: "Warm Sunset",
    emoji: "🌅",
    cssFilter: "sepia(0.4) saturate(1.5) hue-rotate(-30deg) brightness(1.08)",
  },
  glitch: {
    label: "Glitch",
    emoji: "⚡",
    cssFilter: "hue-rotate(90deg) invert(0.08) contrast(1.5) saturate(2)",
  },
};

interface VideoFilterOverlayProps {
  activeFilter: string | null;
  duration: number; // ms
  triggeredByName: string;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onExpire: () => void;
}

export default function VideoFilterOverlay({
  activeFilter,
  duration,
  triggeredByName,
  videoRef,
  onExpire,
}: VideoFilterOverlayProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const expiredRef = useRef(false);

  const preset = activeFilter ? FILTER_PRESETS[activeFilter] : null;

  // Áp dụng CSS filter vào video element
  useEffect(() => {
    if (!videoRef.current) return;
    if (preset) {
      videoRef.current.style.filter = preset.cssFilter;
      // Glitch cần thêm animation lắc
      if (activeFilter === "glitch") {
        videoRef.current.style.animation = "glitchShake 0.15s ease-in-out infinite alternate";
      }
    } else {
      // Reset về bình thường
      videoRef.current.style.filter = "";
      videoRef.current.style.animation = "";
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.style.filter = "";
        videoRef.current.style.animation = "";
      }
    };
  }, [activeFilter, preset, videoRef]);

  // Đếm ngược thời gian và gọi onExpire khi hết
  useEffect(() => {
    if (!activeFilter) return;

    expiredRef.current = false;
    setTimeLeft(duration);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1000;
        if (next <= 0) {
          clearInterval(intervalRef.current!);
          if (!expiredRef.current) {
            expiredRef.current = true;
            onExpire();
          }
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeFilter, duration, onExpire]);

  if (!preset || !activeFilter) return null;

  const progressPercent = (timeLeft / duration) * 100;
  const secondsLeft = Math.ceil(timeLeft / 1000);

  return (
    <>
      {/* Badge hiển thị tên filter và ai kích hoạt */}
      <div className={styles.filterBadge}>
        <span>{preset.emoji}</span>
        <span>{preset.label}</span>
        <span
          style={{
            background: "rgba(255,255,255,0.15)",
            borderRadius: "10px",
            padding: "1px 6px",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {secondsLeft}s
        </span>
      </div>

      {/* Tooltip người kích hoạt */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          right: "12px",
          fontSize: "0.65rem",
          color: "rgba(255,255,255,0.6)",
          zIndex: 20,
          textAlign: "right",
        }}
      >
        bởi <strong style={{ color: "var(--color-accent)" }}>{triggeredByName}</strong>
      </div>

      {/* Progress timer bar ở dưới video */}
      <div
        className={styles.filterTimerBar}
        style={{ width: `${progressPercent}%` }}
      />
    </>
  );
}
