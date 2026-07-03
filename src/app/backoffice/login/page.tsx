"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BackOfficeLoginPage() {
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/backoffice/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secretKey }),
      });

      if (res.ok) {
        router.push("/backoffice/quests");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Mã xác thực không đúng!");
      }
    } catch (err) {
      console.error(err);
      setError("Không thể kết nối tới server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#1e293b",
          border: "1px solid #334155",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#60a5fa",
              marginBottom: "8px",
            }}
          >
            LiveStar BackOffice ⚙️
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "14px" }}>
            Bảng điều khiển cấu hình hệ thống nội bộ
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="secretKey"
              style={{
                display: "block",
                color: "#e2e8f0",
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "8px",
              }}
            >
              Mã bảo mật (Secret Key)
            </label>
            <input
              type="password"
              id="secretKey"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="••••••••••••••••"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                backgroundColor: "#0f172a",
                border: "1px solid #475569",
                borderRadius: "8px",
                color: "#f8fafc",
                fontSize: "16px",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.target.style.borderColor = "#475569")}
            />
          </div>

          {error && (
            <div
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                color: "#f87171",
                padding: "10px 14px",
                borderRadius: "8px",
                fontSize: "14px",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              fontWeight: "600",
              borderRadius: "8px",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 0.2s, transform 0.1s",
              opacity: loading ? 0.7 : 1,
            }}
            onMouseOver={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = "#1d4ed8";
            }}
            onMouseOut={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = "#2563eb";
            }}
            onMouseDown={(e) => {
              if (!loading) e.currentTarget.style.transform = "scale(0.98)";
            }}
            onMouseUp={(e) => {
              if (!loading) e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {loading ? "Đang xác thực..." : "Đăng nhập BackOffice"}
          </button>
        </form>
      </div>
    </div>
  );
}
