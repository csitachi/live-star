import React from "react";

export default function BackOfficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f172a", color: "#f8fafc", fontFamily: "Inter, sans-serif" }}>
      {children}
    </div>
  );
}
