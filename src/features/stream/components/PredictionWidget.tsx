import React, { useState } from "react";

export interface PredictionBet {
  id: string;
  predictionId: string;
  userId: string;
  option: "A" | "B" | string;
  starAmount: number;
  createdAt: string;
}

export interface Prediction {
  id: string;
  streamId: string;
  title: string;
  optionA: string;
  optionB: string;
  status: "ACTIVE" | "LOCKED" | "RESOLVED" | "CANCELLED" | string;
  winOption: string | null;
  totalStarsA: number;
  totalStarsB: number;
  bets: PredictionBet[];
}

interface PredictionWidgetProps {
  prediction: Prediction | null;
  currentUser: { id: string; starBalance: number } | null;
  onBet: (option: "A" | "B", amount: number) => Promise<void>;
  betting: boolean;
}

export default function PredictionWidget({
  prediction,
  currentUser,
  onBet,
  betting,
}: PredictionWidgetProps) {
  const [selectedOption, setSelectedOption] = useState<"A" | "B" | null>(null);
  const [betAmount, setBetAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [useCustom, setUseCustom] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  if (!prediction) return null;

  // Tìm cược hiện tại của user này trong kèo này
  const myBet = currentUser
    ? prediction.bets?.find((b) => b.userId === currentUser.id)
    : null;

  // Tính toán số liệu thống kê
  const totalA = prediction.totalStarsA || 0;
  const totalB = prediction.totalStarsB || 0;
  const grandTotal = totalA + totalB;

  const percentA = grandTotal > 0 ? Math.round((totalA / grandTotal) * 100) : 50;
  const percentB = grandTotal > 0 ? Math.round((totalB / grandTotal) * 100) : 50;

  // UI khi kèo đã được streamer GIẢI QUYẾT (RESOLVED)
  if (prediction.status === "RESOLVED") {
    const winnerLabel = prediction.winOption === "A" ? prediction.optionA : prediction.optionB;
    const didWin = myBet && myBet.option === prediction.winOption;
    const winningTotal = prediction.winOption === "A" ? totalA : totalB;
    const payoutAmount = myBet && winningTotal > 0 ? Math.floor((myBet.starAmount * grandTotal) / winningTotal) : 0;

    return (
      <div
        style={{
          background: "var(--bg-glass)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid var(--border-glass)",
          borderRadius: "16px",
          padding: "16px",
          marginTop: "16px",
          boxShadow: "var(--shadow-premium)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <h4 style={{ fontSize: "1rem", fontWeight: "800", color: "var(--color-accent)", display: "flex", alignItems: "center", gap: "6px", margin: 0 }}>
            <span>🏆</span> KÈO ĐÃ KẾT THÚC
          </h4>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: "bold",
              padding: "2px 8px",
              borderRadius: "9999px",
              backgroundColor: "rgba(255, 183, 3, 0.2)",
              color: "var(--color-accent)",
              border: "1px solid rgba(255, 183, 3, 0.4)",
            }}
          >
            Đã phát thưởng
          </span>
        </div>

        {/* Title */}
        <div style={{ fontSize: "1.05rem", fontWeight: "700", marginBottom: "16px", color: "#fff", lineHeight: "1.4" }}>
          {prediction.title}
        </div>

        {/* Thống kê tỷ lệ cược cuối cùng */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>
            <span style={{ color: prediction.winOption === "A" ? "var(--success)" : "var(--text-secondary)", fontWeight: prediction.winOption === "A" ? "800" : "500" }}>
              {prediction.optionA} ({percentA}%) {prediction.winOption === "A" && "👑"}
            </span>
            <span style={{ color: prediction.winOption === "B" ? "var(--success)" : "var(--text-secondary)", fontWeight: prediction.winOption === "B" ? "800" : "500" }}>
              {prediction.winOption === "B" && "👑"} ({percentB}%) {prediction.optionB}
            </span>
          </div>

          {/* Thanh bar */}
          <div style={{ height: "10px", width: "100%", backgroundColor: "var(--border-subtle)", borderRadius: "9999px", overflow: "hidden", display: "flex" }}>
            <div style={{ width: `${percentA}%`, backgroundColor: prediction.winOption === "A" ? "var(--success)" : "rgba(255,255,255,0.1)", transition: "width 0.5s ease-out" }} />
            <div style={{ width: `${percentB}%`, backgroundColor: prediction.winOption === "B" ? "var(--success)" : "rgba(255,255,255,0.1)", transition: "width 0.5s ease-out" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "6px" }}>
            <span>Tổng cược: {totalA} ⭐</span>
            <span>Tổng cược: {totalB} ⭐</span>
          </div>
        </div>

        {/* Kết quả của người chơi */}
        {myBet ? (
          didWin ? (
            <div
              style={{
                background: "rgba(16, 185, 129, 0.12)",
                border: "1.5px solid var(--success)",
                borderRadius: "12px",
                padding: "14px",
                textAlign: "center",
                boxShadow: "0 0 15px rgba(16, 185, 129, 0.2)",
              }}
            >
              <h5 style={{ color: "var(--success)", fontWeight: "800", margin: "0 0 6px 0", fontSize: "1rem", letterSpacing: "0.5px" }}>🎉 XIN CHÚC MỪNG!</h5>
              <p style={{ color: "#fff", fontSize: "0.85rem", margin: 0, fontWeight: "500" }}>
                Dự đoán đúng vào [<strong>{winnerLabel}</strong>] và nhận thưởng:
              </p>
              <div style={{ fontSize: "1.5rem", fontWeight: "900", color: "var(--color-accent)", margin: "8px 0" }}>
                +{payoutAmount} ⭐
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                (Số dư sao đã được cộng tự động)
              </span>
            </div>
          ) : (
            <div
              style={{
                background: "rgba(239, 68, 68, 0.08)",
                border: "1.5px solid var(--error)",
                borderRadius: "12px",
                padding: "14px",
                textAlign: "center",
              }}
            >
              <h5 style={{ color: "var(--error)", fontWeight: "800", margin: "0 0 6px 0", fontSize: "0.95rem" }}>💸 DỰ ĐOÁN CHƯA CHÍNH XÁC</h5>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", margin: 0 }}>
                Bạn đã cược <strong>{myBet.starAmount} sao</strong> vào lựa chọn [<strong>{myBet.option === "A" ? prediction.optionA : prediction.optionB}</strong>].
              </p>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", marginTop: "6px", marginBottom: 0 }}>
                Kết quả đúng là [<strong>{winnerLabel}</strong>]. Chúc bạn may mắn ở các kèo sau!
              </p>
            </div>
          )
        ) : (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px dashed var(--border-subtle)",
              borderRadius: "12px",
              padding: "12px",
              textAlign: "center",
              color: "var(--text-secondary)",
              fontSize: "0.85rem",
            }}
          >
            Bạn đã không tham gia kèo dự đoán này. Kết quả thắng: [<strong>{winnerLabel}</strong>].
          </div>
        )}
      </div>
    );
  }

  // UI khi kèo bị streamer HỦY (CANCELLED)
  if (prediction.status === "CANCELLED") {
    return (
      <div
        style={{
          background: "var(--bg-glass)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid var(--border-glass)",
          borderRadius: "16px",
          padding: "16px",
          marginTop: "16px",
          boxShadow: "var(--shadow-premium)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <h4 style={{ fontSize: "1rem", fontWeight: "800", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "6px", margin: 0 }}>
            <span>🚫</span> KÈO ĐÃ HỦY
          </h4>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: "bold",
              padding: "2px 8px",
              borderRadius: "9999px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            Đã hoàn tiền
          </span>
        </div>

        {/* Title */}
        <div style={{ fontSize: "1.05rem", fontWeight: "700", marginBottom: "16px", color: "var(--text-secondary)", lineHeight: "1.4", textDecoration: "line-through" }}>
          {prediction.title}
        </div>

        {/* Thông báo hủy */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "12px",
            padding: "14px",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#fff", fontSize: "0.85rem", margin: "0 0 6px 0", fontWeight: "600" }}>
            Kèo cược đã bị hủy bởi Streamer.
          </p>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem", margin: 0 }}>
            {myBet ? (
              <span>Đã hoàn lại <strong style={{ color: "var(--color-accent)" }}>{myBet.starAmount} ⭐</strong> về ví của bạn.</span>
            ) : (
              <span>Toàn bộ số sao đã được hoàn lại cho người chơi.</span>
            )}
          </p>
        </div>
      </div>
    );
  }



  const handleBetSubmit = async () => {
    setErrorMsg("");
    if (!selectedOption) {
      setErrorMsg("Vui lòng chọn một đáp án!");
      return;
    }

    const finalAmount = useCustom ? parseInt(customAmount, 10) : betAmount;
    if (isNaN(finalAmount) || finalAmount <= 0) {
      setErrorMsg("Số sao đặt cược không hợp lệ!");
      return;
    }

    if (currentUser && currentUser.starBalance < finalAmount) {
      setErrorMsg("Số dư sao của bạn không đủ!");
      return;
    }

    try {
      await onBet(selectedOption, finalAmount);
      setSelectedOption(null);
      setCustomAmount("");
      setUseCustom(false);
    } catch (e: any) {
      setErrorMsg(e.message || "Đặt cược thất bại!");
    }
  };

  const isLocked = prediction.status === "LOCKED";
  const PRESET_AMOUNTS = [50, 100, 200, 500];

  return (
    <div
      style={{
        background: "var(--bg-glass)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid var(--border-glass)",
        borderRadius: "16px",
        padding: "16px",
        marginTop: "16px",
        boxShadow: "var(--shadow-premium)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <h4 style={{ fontSize: "1rem", fontWeight: "800", color: "var(--color-accent)", display: "flex", alignItems: "center", gap: "6px", margin: 0 }}>
          <span>🔮</span> DỰ ĐOÁN TRỰC TIẾP
        </h4>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: "bold",
            padding: "2px 8px",
            borderRadius: "9999px",
            backgroundColor: isLocked ? "rgba(239, 68, 68, 0.2)" : "rgba(16, 185, 129, 0.2)",
            color: isLocked ? "var(--error)" : "var(--success)",
            border: `1px solid ${isLocked ? "var(--error)" : "var(--success)"}44`,
          }}
        >
          {isLocked ? "🔒 Đã đóng cược" : "⚡ Đang mở cược"}
        </span>
      </div>

      {/* Title */}
      <div style={{ fontSize: "1.05rem", fontWeight: "700", marginBottom: "16px", color: "#fff", lineHeight: "1.4" }}>
        {prediction.title}
      </div>

      {/* Progress bar tỉ lệ cược */}
      <div style={{ marginBottom: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>
          <span style={{ color: "var(--color-primary)" }}>{prediction.optionA} ({percentA}%)</span>
          <span style={{ color: "var(--color-secondary)" }}>({percentB}%) {prediction.optionB}</span>
        </div>

        {/* Thanh bar */}
        <div style={{ height: "10px", width: "100%", backgroundColor: "var(--border-subtle)", borderRadius: "9999px", overflow: "hidden", display: "flex" }}>
          <div
            style={{
              width: `${percentA}%`,
              backgroundColor: "var(--color-primary)",
              transition: "width 0.5s ease-out",
              boxShadow: "0 0 8px var(--color-primary-glow)",
            }}
          />
          <div
            style={{
              width: `${percentB}%`,
              backgroundColor: "var(--color-secondary)",
              transition: "width 0.5s ease-out",
              boxShadow: "0 0 8px var(--color-secondary-glow)",
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "6px" }}>
          <span>Tổng cược: {totalA} ⭐</span>
          <span>Tổng cược: {totalB} ⭐</span>
        </div>
      </div>

      {/* Phần hiển thị nếu viewer đã cược */}
      {myBet && (
        <div
          style={{
            background: "rgba(255, 183, 3, 0.1)",
            border: "1px solid rgba(255, 183, 3, 0.2)",
            borderRadius: "10px",
            padding: "10px 12px",
            fontSize: "0.85rem",
            color: "var(--color-accent)",
            fontWeight: "600",
            textAlign: "center",
            marginBottom: "12px",
          }}
        >
          🎉 Bạn đã đặt cược thành công <strong>{myBet.starAmount} sao</strong> vào lựa chọn{" "}
          <span style={{ color: myBet.option === "A" ? "var(--color-primary)" : "var(--color-secondary)" }}>
            {myBet.option === "A" ? prediction.optionA : prediction.optionB}
          </span>
          .
        </div>
      )}

      {/* Khung đặt cược (nếu chưa cược và chưa đóng cược) */}
      {!myBet && !isLocked && currentUser && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Lựa chọn A / B */}
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => setSelectedOption("A")}
              style={{
                flex: 1,
                padding: "10px 8px",
                borderRadius: "10px",
                border: selectedOption === "A" ? "2px solid var(--color-primary)" : "1px solid var(--border-subtle)",
                background: selectedOption === "A" ? "rgba(157, 78, 221, 0.15)" : "rgba(255,255,255,0.02)",
                color: selectedOption === "A" ? "var(--color-primary)" : "var(--text-secondary)",
                fontWeight: "700",
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              A: {prediction.optionA}
            </button>
            <button
              onClick={() => setSelectedOption("B")}
              style={{
                flex: 1,
                padding: "10px 8px",
                borderRadius: "10px",
                border: selectedOption === "B" ? "2px solid var(--color-secondary)" : "1px solid var(--border-subtle)",
                background: selectedOption === "B" ? "rgba(255, 0, 127, 0.15)" : "rgba(255,255,255,0.02)",
                color: selectedOption === "B" ? "var(--color-secondary)" : "var(--text-secondary)",
                fontWeight: "700",
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              B: {prediction.optionB}
            </button>
          </div>

          {/* Chọn số sao */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
              <span>Số sao cược:</span>
              <span
                onClick={() => setUseCustom(!useCustom)}
                style={{ color: "var(--color-accent)", cursor: "pointer", fontWeight: "600" }}
              >
                {useCustom ? "Chọn mức sẵn" : "Nhập số khác"}
              </span>
            </div>

            {!useCustom ? (
              <div style={{ display: "flex", gap: "8px" }}>
                {PRESET_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setBetAmount(amt)}
                    style={{
                      flex: 1,
                      padding: "6px 4px",
                      borderRadius: "8px",
                      border: betAmount === amt ? "1.5px solid var(--color-accent)" : "1px solid var(--border-subtle)",
                      background: betAmount === amt ? "rgba(255, 183, 3, 0.15)" : "transparent",
                      color: betAmount === amt ? "var(--color-accent)" : "var(--text-primary)",
                      fontSize: "0.8rem",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    {amt} ⭐
                  </button>
                ))}
              </div>
            ) : (
              <input
                type="number"
                placeholder="Nhập số sao..."
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid var(--border-subtle)",
                  backgroundColor: "rgba(0,0,0,0.2)",
                  color: "#fff",
                  outline: "none",
                  fontSize: "0.85rem",
                }}
              />
            )}
          </div>

          {errorMsg && (
            <div style={{ color: "var(--error)", fontSize: "0.8rem", fontWeight: "600", textAlign: "center" }}>
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Nút gửi cược */}
          <button
            onClick={handleBetSubmit}
            disabled={betting || !selectedOption}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, var(--color-primary), #7b2cbf)",
              color: "#fff",
              fontWeight: "700",
              fontSize: "0.9rem",
              border: "none",
              cursor: selectedOption ? "pointer" : "not-allowed",
              opacity: selectedOption ? 1 : 0.6,
              boxShadow: selectedOption ? "0 4px 15px rgba(157, 78, 221, 0.3)" : "none",
              transition: "all 0.2s",
            }}
          >
            {betting ? "Đang xử lý..." : "Xác Nhận Đặt Cược ⭐"}
          </button>
        </div>
      )}

      {/* Lời nhắn khi cược đóng */}
      {isLocked && !myBet && (
        <div style={{ textAlign: "center", fontSize: "0.85rem", color: "var(--text-secondary)", fontStyle: "italic", padding: "8px 0" }}>
          Kèo cược đã khóa. Đang chờ Streamer công bố kết quả trận đấu!
        </div>
      )}
    </div>
  );
}
