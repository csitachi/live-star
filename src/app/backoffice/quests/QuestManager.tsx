"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface QuestDefinition {
  questType: string;
  title: string;
  description: string | null;
  target: number;
  rewardStars: number;
  isActive: boolean;
}

interface StatItem {
  questType: string;
  isCompleted: boolean;
  isClaimed: boolean;
  _count: {
    id: number;
  };
}

interface QuestManagerProps {
  initialDefinitions: QuestDefinition[];
  initialStats: StatItem[];
  todayDate: string;
}

export default function QuestManager({
  initialDefinitions,
  initialStats,
  todayDate,
}: QuestManagerProps) {
  const router = useRouter();
  const [definitions, setDefinitions] = useState<QuestDefinition[]>(initialDefinitions);
  const [editingType, setEditingType] = useState<string | null>(null);

  // Trạng thái Form chỉnh sửa
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editTarget, setEditTarget] = useState(0);
  const [editReward, setEditReward] = useState(0);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", isError: false });

  // 1. Tính toán thống kê từ stats
  const getQuestStats = (type: string) => {
    let completed = 0;
    let claimed = 0;
    initialStats.forEach((s) => {
      if (s.questType === type) {
        if (s.isCompleted) completed += s._count.id;
        if (s.isClaimed) claimed += s._count.id;
      }
    });
    return { completed, claimed };
  };

  const totalRewardsIssued = initialStats
    .filter((s) => s.isClaimed)
    .reduce((sum, s) => {
      const def = definitions.find((d) => d.questType === s.questType);
      return sum + s._count.id * (def?.rewardStars || 0);
    }, 0);

  const totalUsersParticipated = new Set(
    initialStats.map((s) => s.questType)
  ).size > 0 ? Math.max(...initialStats.map((s) => s._count.id)) : 0;

  // 2. Xử lý Đăng xuất
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/backoffice/auth", { method: "DELETE" });
      if (res.ok) {
        router.push("/backoffice/login");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 3. Kích hoạt chỉnh sửa dòng
  const startEdit = (quest: QuestDefinition) => {
    setEditingType(quest.questType);
    setEditTitle(quest.title);
    setEditDesc(quest.description || "");
    setEditTarget(quest.target);
    setEditReward(quest.rewardStars);
    setMessage({ text: "", isError: false });
  };

  // 4. Lưu cập nhật định nghĩa nhiệm vụ
  const saveEdit = async (questType: string) => {
    setLoading(true);
    setMessage({ text: "", isError: false });

    try {
      const res = await fetch("/api/backoffice/quests", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questType,
          title: editTitle,
          description: editDesc,
          target: editTarget,
          rewardStars: editReward,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setDefinitions(
          definitions.map((d) => (d.questType === questType ? { ...d, ...updated } : d))
        );
        setEditingType(null);
        setMessage({ text: `🎉 Đã lưu cập nhật nhiệm vụ [${questType}] thành công!`, isError: false });
        router.refresh();
      } else {
        const err = await res.json();
        setMessage({ text: err.error || "Lỗi cập nhật!", isError: true });
      }
    } catch (err) {
      console.error(err);
      setMessage({ text: "Lỗi kết nối máy chủ!", isError: true });
    } finally {
      setLoading(false);
    }
  };

  // 5. Toggle kích hoạt Bật/Tắt nhiệm vụ nhanh
  const toggleActive = async (quest: QuestDefinition) => {
    try {
      const res = await fetch("/api/backoffice/quests", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questType: quest.questType,
          isActive: !quest.isActive,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setDefinitions(
          definitions.map((d) => (d.questType === quest.questType ? { ...d, ...updated } : d))
        );
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
          borderBottom: "1px solid #334155",
          paddingBottom: "20px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#60a5fa" }}>
            LiveStar BackOffice Console ⚙️
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "14px", marginTop: "4px" }}>
            Đang quản trị cấu hình nhiệm vụ ngày: <strong>{todayDate}</strong> (Múi giờ GMT+7)
          </p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 18px",
            backgroundColor: "#ef4444",
            color: "#ffffff",
            fontWeight: "600",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#dc2626")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ef4444")}
        >
          Đăng xuất BackOffice
        </button>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <div style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "600" }}>
            Tổng số sao thưởng đã phát hôm nay
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: "800",
              color: "#fbbf24",
              marginTop: "8px",
            }}
          >
            {totalRewardsIssued} ⭐
          </div>
          <div style={{ color: "#64748b", fontSize: "12px", marginTop: "4px" }}>
            Dựa trên tổng số nhiệm vụ đã nhận thưởng
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <div style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "600" }}>
            Số người tham gia hôm nay (ước lượng)
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: "800",
              color: "#34d399",
              marginTop: "8px",
            }}
          >
            {totalUsersParticipated} Users
          </div>
          <div style={{ color: "#64748b", fontSize: "12px", marginTop: "4px" }}>
            Tính theo lượng log nhiệm vụ cao nhất phát sinh
          </div>
        </div>
      </div>

      {/* Message Banner */}
      {message.text && (
        <div
          style={{
            backgroundColor: message.isError ? "rgba(239, 68, 68, 0.15)" : "rgba(16, 185, 129, 0.15)",
            border: `1px solid ${message.isError ? "#f87171" : "#34d399"}`,
            color: message.isError ? "#f87171" : "#34d399",
            padding: "14px 20px",
            borderRadius: "12px",
            marginBottom: "30px",
            fontWeight: "500",
          }}
        >
          {message.text}
        </div>
      )}

      {/* Table Container */}
      <div
        style={{
          backgroundColor: "#1e293b",
          border: "1px solid #334155",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #334155" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#f1f5f9" }}>
            Danh sách Cấu hình Nhiệm vụ (Daily Quests)
          </h2>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #334155", color: "#94a3b8", fontSize: "13px" }}>
                <th style={{ padding: "16px 24px" }}>Mã Quest</th>
                <th style={{ padding: "16px 24px" }}>Tiêu đề / Mô tả</th>
                <th style={{ padding: "16px 24px", textAlign: "center" }}>Mốc đạt (Target)</th>
                <th style={{ padding: "16px 24px", textAlign: "center" }}>Sao thưởng</th>
                <th style={{ padding: "16px 24px", textAlign: "center" }}>Lượt hoàn thành hôm nay</th>
                <th style={{ padding: "16px 24px", textAlign: "center" }}>Trạng thái</th>
                <th style={{ padding: "16px 24px", textAlign: "right" }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {definitions.map((quest) => {
                const isEditing = editingType === quest.questType;
                const { completed, claimed } = getQuestStats(quest.questType);

                return (
                  <tr
                    key={quest.questType}
                    style={{
                      borderBottom: "1px solid #334155",
                      fontSize: "14px",
                      color: "#cbd5e1",
                      backgroundColor: isEditing ? "#1e293b" : "transparent",
                    }}
                  >
                    {/* Mã Quest */}
                    <td style={{ padding: "16px 24px", fontWeight: "bold", color: "#38bdf8" }}>
                      {quest.questType}
                    </td>

                    {/* Tiêu đề & Mô tả */}
                    <td style={{ padding: "16px 24px", maxWidth: "250px" }}>
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            style={{
                              width: "100%",
                              padding: "8px 12px",
                              backgroundColor: "#0f172a",
                              border: "1px solid #475569",
                              borderRadius: "6px",
                              color: "#f8fafc",
                              fontSize: "14px",
                              marginBottom: "8px",
                            }}
                          />
                          <input
                            type="text"
                            value={editDesc}
                            onChange={(e) => setEditDesc(e.target.value)}
                            style={{
                              width: "100%",
                              padding: "8px 12px",
                              backgroundColor: "#0f172a",
                              border: "1px solid #475569",
                              borderRadius: "6px",
                              color: "#f8fafc",
                              fontSize: "14px",
                            }}
                          />
                        </>
                      ) : (
                        <>
                          <div style={{ fontWeight: "600", color: "#f8fafc" }}>{quest.title}</div>
                          <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>
                            {quest.description || "Chưa cấu hình mô tả."}
                          </div>
                        </>
                      )}
                    </td>

                    {/* Mốc đạt (Target) */}
                    <td style={{ padding: "16px 24px", textAlign: "center" }}>
                      {isEditing ? (
                        <input
                          type="number"
                          value={editTarget}
                          onChange={(e) => setEditTarget(parseInt(e.target.value, 10))}
                          style={{
                            width: "80px",
                            padding: "8px 12px",
                            backgroundColor: "#0f172a",
                            border: "1px solid #475569",
                            borderRadius: "6px",
                            color: "#f8fafc",
                            fontSize: "14px",
                            textAlign: "center",
                          }}
                        />
                      ) : (
                        quest.target
                      )}
                    </td>

                    {/* Sao thưởng */}
                    <td style={{ padding: "16px 24px", textAlign: "center" }}>
                      {isEditing ? (
                        <input
                          type="number"
                          value={editReward}
                          onChange={(e) => setEditReward(parseInt(e.target.value, 10))}
                          style={{
                            width: "80px",
                            padding: "8px 12px",
                            backgroundColor: "#0f172a",
                            border: "1px solid #475569",
                            borderRadius: "6px",
                            color: "#f8fafc",
                            fontSize: "14px",
                            textAlign: "center",
                          }}
                        />
                      ) : (
                        <span style={{ color: "#fbbf24", fontWeight: "bold" }}>
                          {quest.rewardStars} ⭐
                        </span>
                      )}
                    </td>

                    {/* Lượt hoàn thành */}
                    <td style={{ padding: "16px 24px", textAlign: "center" }}>
                      <div style={{ fontWeight: "600", color: "#e2e8f0" }}>
                        {completed} hoàn thành
                      </div>
                      <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>
                        ({claimed} đã nhận thưởng)
                      </div>
                    </td>

                    {/* Trạng thái Bật/Tắt */}
                    <td style={{ padding: "16px 24px", textAlign: "center" }}>
                      <button
                        onClick={() => toggleActive(quest)}
                        disabled={isEditing}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "20px",
                          border: "none",
                          fontSize: "12px",
                          fontWeight: "bold",
                          cursor: isEditing ? "not-allowed" : "pointer",
                          backgroundColor: quest.isActive ? "rgba(16, 185, 129, 0.15)" : "rgba(148, 163, 184, 0.15)",
                          color: quest.isActive ? "#34d399" : "#94a3b8",
                          transition: "all 0.2s",
                        }}
                      >
                        {quest.isActive ? "● Đang bật" : "○ Tắt"}
                      </button>
                    </td>

                    {/* Thao tác */}
                    <td style={{ padding: "16px 24px", textAlign: "right" }}>
                      {isEditing ? (
                        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                          <button
                            onClick={() => saveEdit(quest.questType)}
                            disabled={loading}
                            style={{
                              padding: "6px 12px",
                              backgroundColor: "#10b981",
                              color: "#fff",
                              border: "none",
                              borderRadius: "6px",
                              cursor: "pointer",
                            }}
                          >
                            Lưu
                          </button>
                          <button
                            onClick={() => setEditingType(null)}
                            disabled={loading}
                            style={{
                              padding: "6px 12px",
                              backgroundColor: "#475569",
                              color: "#fff",
                              border: "none",
                              borderRadius: "6px",
                              cursor: "pointer",
                            }}
                          >
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(quest)}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "#2563eb",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            transition: "background-color 0.2s",
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1d4ed8")}
                          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
                        >
                          Chỉnh sửa
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
