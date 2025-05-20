// src/app/layout.tsx
import "./globals.css";
import Navbar from "@/components/Navbar"; // ← 追加

export const metadata = {
  title: "受験生向けブログ",
  description: "浪人・共通テスト・勉強法まとめ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Navbar /> {/* ← ナビゲーションバーを表示 */}
        <main className="max-w-3xl mx-auto px-4">{children}</main>
      </body>
    </html>
  );
}
