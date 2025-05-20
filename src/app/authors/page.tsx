'use client';

import { useState } from "react";
import Link from "next/link";
import { authors } from "@/lib/authors"; // ← ここも修正してるか注意！
import type { Author } from "@/types";  // ← 型をインポート

export default function AuthorListPage() {
  const [query, setQuery] = useState("");

  const authorEntries: [string, Author][] = Object.entries(authors);

  const filteredAuthors = authorEntries.filter(([key, author]) => {
    const q = query.toLowerCase();
    return (
      key.toLowerCase().includes(q) ||
      author.description.toLowerCase().includes(q) ||
      author.type.toLowerCase().includes(q)
    );
  });

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">投稿者一覧</h1>

      <input
        type="text"
        placeholder="名前や文系・理系・説明で検索"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-6 p-2 border rounded w-full"
      />

      <ul className="space-y-4">
        {filteredAuthors.map(([key, author]) => (
          <li key={key} className="p-4 border rounded shadow-sm">
            <p className="text-lg font-semibold">
              <Link
                href={`/authors/${key}`}
                className="text-blue-600 hover:underline"
              >
                {author.name}
              </Link>{" "}
              <span className="text-sm text-gray-500">（{author.type}）</span>
            </p>
            <p className="text-sm text-gray-700">{author.description}</p>
          </li>
        ))}
        {filteredAuthors.length === 0 && (
          <p className="text-gray-500">該当する投稿者はいません。</p>
        )}
      </ul>
    </main>
  );
}
