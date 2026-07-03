"use client";

import React, { useEffect, useState, useRef } from "react";
import { ToastType } from "./ToastContext";
import styles from "./Toast.module.css";

interface ToastProps {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  type,
  title,
  message,
  duration = 4000,
  onClose,
}) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(100);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const remainingTimeRef = useRef<number>(duration);
  const [isPaused, setIsPaused] = useState(false);

  const startTimer = () => {
    startTimeRef.current = Date.now();
    
    // Timer to trigger close (which starts fade-out)
    timerRef.current = setTimeout(() => {
      handleClose();
    }, remainingTimeRef.current);

    // Interval to update progress bar smoothly
    const intervalTick = 50; // ms
    progressIntervalRef.current = setInterval(() => {
      remainingTimeRef.current = Math.max(0, remainingTimeRef.current - intervalTick);
      setProgress((remainingTimeRef.current / duration) * 100);
    }, intervalTick);
  };

  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  };

  useEffect(() => {
    startTimer();
    return () => clearTimers();
  }, []);

  const handleMouseEnter = () => {
    setIsPaused(true);
    clearTimers();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    startTimer();
  };

  const handleClose = () => {
    setIsFadingOut(true);
    // Wait for the exit animation (200ms) to complete before unmounting
    setTimeout(() => {
      onClose();
    }, 200);
  };

  // SVGs for different types
  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        );
      case "error":
        return (
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        );
      case "warning":
        return (
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        );
      case "info":
      default:
        return (
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        );
    }
  };

  const getStyleClass = () => {
    switch (type) {
      case "success":
        return styles.success;
      case "error":
        return styles.error;
      case "warning":
        return styles.warning;
      case "info":
      default:
        return styles.info;
    }
  };

  return (
    <div
      className={`${styles.toast} ${getStyleClass()} ${isFadingOut ? styles.fadeOut : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="alert"
    >
      <div className={styles.toastBody}>
        <div className={styles.iconContainer}>{getIcon()}</div>
        <div className={styles.content}>
          {title && <h4 className={styles.title}>{title}</h4>}
          <p className={styles.message}>{message}</p>
        </div>
        <button className={styles.closeButton} onClick={handleClose} type="button" aria-label="Đóng">
          <svg className={styles.closeIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%`, transition: isPaused ? "none" : "width 50ms linear" }}
        />
      </div>
    </div>
  );
};

export default Toast;
