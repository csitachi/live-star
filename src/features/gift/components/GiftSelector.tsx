// Component bảng điều khiển Tặng quà & Gửi Sao (Gift Selector Panel).
// Giúp Viewer chọn các gói quà và gửi tín hiệu thanh toán về Backend.

import React from "react";

// Định nghĩa cấu trúc gói quà
export interface GiftTier {
  amount: number;
  icon: string;
  label: string;
  price: number;
}

interface GiftSelectorProps {
  giftTiers: GiftTier[];
  selectedGiftIndex: number;
  onSelectGift: (index: number) => void;
  giftMessage: string;
  onGiftMessageChange: (val: string) => void;
  onSendGift: (e: React.FormEvent) => void;
  gifting: boolean;
  styles: any;
}

export default function GiftSelector({
  giftTiers,
  selectedGiftIndex,
  onSelectGift,
  giftMessage,
  onGiftMessageChange,
  onSendGift,
  gifting,
  styles,
}: GiftSelectorProps) {
  return (
    <div className={`${styles.giftPanel} premium-card`}>
      <h3 className={styles.giftPanelTitle}>
        <span>🎁</span> Chọn quà tặng Streamer:
      </h3>

      {/* Danh sách các gói quà có thể chọn */}
      <div className={styles.giftTiersList}>
        {giftTiers.map((tier, index) => (
          <div
            key={tier.amount}
            className={`${styles.giftTierCard} ${
              selectedGiftIndex === index ? styles.giftTierCardActive : ""
            }`}
            onClick={() => onSelectGift(index)}
          >
            <span className={styles.giftTierIcon}>{tier.icon}</span>
            <span className={styles.giftTierAmount}>{tier.label}</span>
            <span className={styles.giftTierPrice}>🪙 {tier.amount} sao</span>
          </div>
        ))}
      </div>

      {/* Form lời nhắn và nút gửi */}
      <form onSubmit={onSendGift} className={styles.giftForm}>
        <input
          type="text"
          className={styles.giftInput}
          placeholder="Nhập lời nhắn gửi kèm quà tặng (không bắt buộc)..."
          value={giftMessage}
          onChange={(e) => onGiftMessageChange(e.target.value)}
          maxLength={80}
        />
        <button
          type="submit"
          className="glow-btn-gift"
          disabled={gifting}
          style={{ padding: "10px 24px", fontSize: "0.9rem" }}
        >
          {gifting ? "Đang gửi..." : `Tặng ${giftTiers[selectedGiftIndex].amount} sao ➔`}
        </button>
      </form>
    </div>
  );
}
