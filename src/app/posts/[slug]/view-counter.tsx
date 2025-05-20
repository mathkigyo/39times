"use client";

import { useEffect, useState } from "react";

export default function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  // カウント +1
  useEffect(() => {
    fetch("/api/view-count", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
  }, [slug]);

  // 現在のカウント取得
  useEffect(() => {
    fetch(`/api/view-count?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => setViews(data.count));
  }, [slug]);

  return (
    <p className="text-sm text-gray-500 mb-4">
      👁 {views !== null ? `${views} views` : "読み込み中..."}
    </p>
  );
}
