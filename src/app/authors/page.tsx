'use client'; // クライアントコンポーネント

import { useState } from 'react';
import { authors } from '@/lib/authors';
import Link from 'next/link';
import type { Author } from '@/types';

export default function AuthorsPage() {
  const [query, setQuery] = useState('');

  const authorEntries = Object.entries(authors);
  const filteredEntries = authorEntries.filter(([, author]: [string, Author]) =>
    author.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">投稿者一覧</h1>

      <input
        type="text"
        placeholder="投稿者名で検索"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-6 px-4 py-2 border border-gray-300 rounded w-full max-w-md"
      />

      {filteredEntries.length === 0 ? (
        <p className="text-gray-500">該当する投稿者が見つかりませんでした。</p>
      ) : (
        <ul className="space-y-6">
          {filteredEntries.map(([slug, author]: [string, Author]) => (
            <li key={slug} className="border border-gray-300 rounded-lg p-4">
              <h2 className="text-xl font-semibold">
                <Link
                  href={`/authors/${encodeURIComponent(slug)}`}
                  className="text-blue-600 hover:underline"
                >
                  {author.name}
                </Link>
              </h2>
              <p className="text-sm text-gray-600">文理：{author.field}</p>
              {author.hensachi && (
                <p className="text-sm text-gray-500">高校偏差値：{author.hensachi}</p>
              )}
              <p className="text-sm text-gray-500">{author.bio}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
