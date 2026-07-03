"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import StatCard from "./components/StatCard";
import StarChart from "./components/StarChart";
import SourceDonut from "./components/SourceDonut";
import TxTable from "./components/TxTable";

interface WalletSummary {
  balance: number;
  displayName: string;
  avatarUrl: string;
  totalRecharged: number;
  totalGiftSent: number;
  totalGiftReceived: number;
  chartData: Array<{ date: string; in: number; out: number }>;
  donutData: Array<{ type: string; label: string; value: number }>;
}

export default function WalletDashboardPage() {
  const router = useRouter();
  const [summary, setSummary] = useState<WalletSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);

  // 1. Kiểm tra session và tải dữ liệu summary
  useEffect(() => {
    async function loadWalletData() {
      try {
        // Kiểm tra đăng nhập qua api/auth/me trước
        const meRes = await fetch("/api/auth/me");
        if (!meRes.ok) {
          setAuthError(true);
          router.replace("/");
          return;
        }

        // Tải dữ liệu ví sao
        const walletRes = await fetch("/api/dashboard/wallet");
        if (walletRes.ok) {
          const json = await walletRes.json();
          setSummary(json.data);
        } else {
          console.error("Lỗi lấy dữ liệu ví");
        }
      } catch (err) {
        console.error("Lỗi kết nối API:", err);
      } finally {
        setLoading(false);
      }
    }

    loadWalletData();
  }, [router]);

  if (loading) {
    return (
      <div style={{ display: "flex", width: "100vw", height: "100vh", alignItems: "center", justifyContent: "center", background: "#0b0b0f", color: "#fff" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "8px" }}>Đang tải ví sao...</div>
          <div style={{ fontSize: "0.85rem", opacity: 0.5 }}>Vui lòng đợi giây lát</div>
        </div>
      </div>
    );
  }

  if (authError || !summary) {
    return null;
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <span>🪙</span> Ví sao & Lịch sử Giao dịch
        </div>
        <button className={styles.backBtn} onClick={() => router.push("/")}>
          <span>🏠</span> Quay lại Trang chủ
        </button>
      </div>

      {/* Stats KPI Row */}
      <div className={styles.statsGrid}>
        <StatCard
          title="Số dư hiện tại"
          value={summary.balance}
          icon="🪙"
          colorType="warning"
        />
        <StatCard
          title="Tổng đã nạp"
          value={summary.totalRecharged}
          icon="📥"
          colorType="success"
        />
        <StatCard
          title="Tổng đã chi quà"
          value={summary.totalGiftSent}
          icon="📤"
          colorType="danger"
        />
        <StatCard
          title="Sao từ Livestream"
          value={summary.totalGiftReceived}
          icon="⭐"
          colorType="primary"
        />
      </div>

      {/* Charts Grid */}
      <div className={styles.chartsGrid}>
        <StarChart data={summary.chartData} />
        <SourceDonut data={summary.donutData} />
      </div>

      {/* Transaction History Table */}
      <TxTable />
    </div>
  );
}
