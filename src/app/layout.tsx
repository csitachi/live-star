import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "LiveStar - Nền tảng Live Stream & Tặng Sao Thời Gian Thực",
  description: "Trải nghiệm hệ thống livestream P2P và tặng sao thời gian thực cực kỳ sinh động xây dựng bằng Next.js, PostgreSQL và Prisma.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        {children}
        <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
      </body>
    </html>
  );
}
