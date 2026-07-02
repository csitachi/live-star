// Trang điều hướng Streamer.
// Tự động chuyển hướng streamer sang trang thiết lập phòng livestream setup.

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StreamerPageRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/streamer/setup");
  }, [router]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh", color: "var(--text-secondary)" }}>
      <div className="spinner" style={{ marginRight: "10px" }}></div>
      <p>Đang chuyển hướng sang phòng thiết lập...</p>
    </div>
  );
}
