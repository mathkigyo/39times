// src/app/layout.tsx

import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "受験生向けブログ",
  description: "浪人・共通テスト・勉強法まとめ",
  verification: {
    google: "A3u0oVlr4tGp1yV0kCqvgapIaxiryLHS5EBSFSsswfI", // ← ここにGoogleの確認コードを追加
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
