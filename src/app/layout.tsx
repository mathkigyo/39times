// src/app/layout.tsx

import "./globals.css";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "受験生向けブログ",
  description: "浪人・共通テスト・勉強法まとめ",
  verification: {
    google: "A3u0oVlr4tGp1yV0kCqvgapIaxiryLHS5EBSFSsswfI",
  },
  icons: {
    icon: "/favicon.ico", // ← ✅ ファビコンはここで指定する
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Navbar />
        <main className="max-w-3xl mx-auto px-4">{children}</main>
      </body>
    </html>
  );
}
