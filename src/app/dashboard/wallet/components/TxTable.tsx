"use client";

import React, { useEffect, useState } from "react";
import styles from "../page.module.css";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  note: string;
  createdAt: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const TYPE_TABS = [
  { value: "ALL", label: "Tất cả" },
  { value: "RECHARGE", label: "Nạp sao" },
  { value: "SPEND", label: "Chi sao (-)" },
  { value: "RECEIVE", label: "Nhận sao (+)" },
  { value: "QUEST_REWARD", label: "Nhiệm vụ" },
  { value: "LUCKY_WHEEL", label: "Vòng quay" },
];

const TYPE_LABELS: Record<string, string> = {
  RECHARGE: "Nạp sao",
  GIFT_SENT: "Gửi quà",
  FILTER_BOMB: "Filter Bomb",
  LUCKY_WHEEL: "Vòng quay",
  CHEST_DROP: "Thả rương",
  GIFT_RECEIVED: "Nhận quà",
  CHEST_CLAIM: "Giật rương",
  QUEST_REWARD: "Nhiệm vụ",
  PREDICTION_BET: "Cược kèo",
  PREDICTION_WIN: "Thắng kèo",
  PREDICTION_REFUND: "Hoàn cược",
  ADMIN_ADJUST: "Điều chỉnh",
};

export default function TxTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ total: 0, page: 1, limit: 15, totalPages: 1 });
  const [activeTab, setActiveTab] = useState("ALL");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async (page: number) => {
    setLoading(true);
    try {
      let url = `/api/dashboard/transactions?page=${page}&limit=15&type=${activeTab}`;
      if (fromDate) url += `&from=${fromDate}`;
      if (toDate) url += `&to=${toDate}`;

      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        setTransactions(json.data.transactions);
        setPagination(json.data.pagination);
      }
    } catch (err) {
      console.error("Lỗi tải lịch sử giao dịch:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(1);
  }, [activeTab, fromDate, toDate]);

  return (
    <div className={styles.tableSection}>
      <div className={styles.filterBar}>
        {/* Tab lọc loại giao dịch */}
        <div className={styles.tabs}>
          {TYPE_TABS.map((tab) => (
            <button
              key={tab.value}
              className={`${styles.tab} ${activeTab === tab.value ? styles.tabActive : ""}`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Lọc theo khoảng ngày */}
        <div className={styles.dateFilters}>
          <input
            type="date"
            className={styles.dateInput}
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            title="Từ ngày"
          />
          <span style={{ fontSize: "0.85rem", opacity: 0.5 }}>đến</span>
          <input
            type="date"
            className={styles.dateInput}
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            title="Đến ngày"
          />
          {(fromDate || toDate) && (
            <button
              className={styles.pagerBtn}
              style={{ padding: "4px 8px", fontSize: "0.75rem", color: "var(--color-secondary)" }}
              onClick={() => {
                setFromDate("");
                setToDate("");
              }}
            >
              Xoá lọc
            </button>
          )}
        </div>
      </div>

      {/* Bảng lịch sử */}
      <div className={styles.tableContainer}>
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center", fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Đang tải dữ liệu...
          </div>
        ) : transactions.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Không tìm thấy lịch sử giao dịch nào khớp với bộ lọc
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Thời gian</th>
                <th>Loại giao dịch</th>
                <th>Chi tiết giao dịch</th>
                <th>Biến động sao</th>
                <th>Số dư sau</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => {
                const isPositive = tx.amount > 0;
                const formattedDate = new Date(tx.createdAt).toLocaleString("vi-VN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <tr key={tx.id}>
                    <td style={{ whiteSpace: "nowrap", color: "var(--text-muted)" }}>
                      {formattedDate}
                    </td>
                    <td>
                      <span className={`${styles.badge} ${styles[`badge${tx.type}`]}`}>
                        {TYPE_LABELS[tx.type] || tx.type}
                      </span>
                    </td>
                    <td style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                      {tx.note || "Giao dịch sao"}
                    </td>
                    <td>
                      <span className={`${styles.amount} ${isPositive ? styles.amountPositive : styles.amountNegative}`}>
                        {isPositive ? "+" : ""}
                        {tx.amount.toLocaleString()} ⭐
                      </span>
                    </td>
                    <td className={styles.balanceCell}>
                      {tx.balanceAfter.toLocaleString()} ⭐
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Phân trang */}
      {!loading && transactions.length > 0 && (
        <div className={styles.pagination}>
          <div className={styles.pageInfo}>
            Hiển thị {transactions.length} dòng (Tổng: {pagination.total} giao dịch)
          </div>
          <div className={styles.pagerBtns}>
            <button
              className={styles.pagerBtn}
              disabled={pagination.page <= 1}
              onClick={() => fetchTransactions(pagination.page - 1)}
            >
              Trước
            </button>
            <span style={{ display: "flex", alignItems: "center", padding: "0 8px", fontWeight: "bold" }}>
              Trang {pagination.page} / {pagination.totalPages}
            </span>
            <button
              className={styles.pagerBtn}
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => fetchTransactions(pagination.page + 1)}
            >
              Tiếp theo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
