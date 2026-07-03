// Component quản lý Trò chuyện trực tuyến (Live Chat Room component).
// Dùng chung cho cả màn hình Streamer Dashboard và Viewer Room.

import React from "react";
import { useRouter } from "next/navigation";

import { getViewerLevel } from "@/lib/level";

// Khai báo cấu trúc kiểu dữ liệu của tin nhắn chat
export interface ChatMessage {
  id: string;
  sender: {
    id?: string;
    username?: string;
    displayName: string;
    avatarUrl: string;
    starsGifted?: number;
    starsEarned?: number;
  };
  text: string;
  createdAt: string;
  isGift: boolean;
  giftStars?: number;
}

interface LiveChatProps {
  messages: ChatMessage[];
  inputMsg: string;
  onInputChange: (val: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  placeholder?: string;
  // Nhận styles dạng prop để đảm bảo kế thừa toàn bộ giao diện từ CSS Module của trang cha
  styles: any;
}

export default function LiveChat({
  messages,
  inputMsg,
  onInputChange,
  onSendMessage,
  placeholder = "Nhập bình luận...",
  styles,
}: LiveChatProps) {
  const router = useRouter();
  return (
    <div 
      className={styles.chatSection || ""} 
      style={{ 
        display: "flex", 
        flexDirection: "column", 
        height: "100%", 
        minHeight: 0, 
        flex: 1 
      }}
    >
      <div className={styles.chatHeader}>💬 Trò chuyện phòng Live</div>
      
      {/* Khung cuộn tin nhắn chat */}
      <div className={styles.chatMessages} id="chat-messages-container">
        {messages.map((msg) => {
          // Tính toán level động của người gửi tin nhắn chat
          const starsGifted = msg?.sender?.starsGifted || 0;
          const lvlInfo = getViewerLevel(starsGifted);

          return (
            <div
              key={msg.id}
              className={`${styles.messageRow} ${msg.isGift ? styles.msgGiftRow : ""}`}
            >
              <img
                src={msg?.sender?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                alt={msg?.sender?.displayName || "Người dùng"}
                className={styles.msgAvatar}
                onClick={() => msg?.sender?.username && router.push(`/profile/${msg.sender.username}`)}
              />
              <div className={styles.msgContent}>
                <span
                  style={{
                    backgroundColor: lvlInfo.color,
                    color: "#fff",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontSize: "0.7rem",
                    fontWeight: "bold",
                    marginRight: "6px",
                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
                    display: "inline-block",
                    boxShadow: `0 0 6px ${lvlInfo.color}33`,
                  }}
                  title={lvlInfo.title}
                >
                  Lv.{lvlInfo.level}
                </span>
                <span className={styles.msgSender} onClick={() => msg?.sender?.username && router.push(`/profile/${msg.sender.username}`)}>{msg?.sender?.displayName || "Người dùng"}:</span>
                <span className={msg.isGift ? styles.msgGiftText : ""}>{msg.text}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Form nhập chat */}
      <form onSubmit={onSendMessage} className={styles.chatInputArea}>
        <input
          type="text"
          className={styles.chatInput}
          placeholder={placeholder}
          value={inputMsg}
          onChange={(e) => onInputChange(e.target.value)}
          maxLength={150}
        />
        <button type="submit" className={styles.sendBtn}>
          ➔
        </button>
      </form>
    </div>
  );
}
