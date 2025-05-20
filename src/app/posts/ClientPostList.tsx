// src/app/posts/page.tsx
'use client';

import { useState, useMemo } from 'react';
import type { Post } from '@/types';
import Link from 'next/link';

type Props = {
  allPosts: Post[];
  popular: { slug: string; count: number }[];
};

export default function ClientPostList({ allPosts, popular }: Props) {
  const [query, setQuery] = useState('');
  const [sortMode, setSortMode] = useState<'new' | 'old' | 'popular'>('new');

  const filteredPosts = useMemo(() => {
    const q = query.toLowerCase();
    return allPosts.filter((post) =>
      post.title.toLowerCase().includes(q) ||
      post.author?.toLowerCase().includes(q) ||
      post.tags?.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [query, allPosts]);

  const sortedPosts = useMemo(() => {
    const withViews = filteredPosts.map((post) => {
      const pv = popular.find((p) => p.slug === post.slug);
      return { ...post, views: pv?.count ?? 0 };
    });

    if (sortMode === 'new') {
      return withViews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortMode === 'old') {
      return withViews.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else {
      return withViews.sort((a, b) => b.views - a.views);
    }
  }, [filteredPosts, sortMode, popular]);

  return (
    <main className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">📝 記事一覧</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="キーワードで検索（タイトル・タグ・投稿者）"
        className="w-full p-2 border rounded"
      />
      <div className="flex gap-3 mt-4">
        <button
          className={`px-3 py-1 rounded border ${
            sortMode === 'new' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
          }`}
          onClick={() => setSortMode('new')}
        >
          🆕 新着順
        </button>
        <button
          className={`px-3 py-1 rounded border ${
            sortMode === 'old' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
          }`}
          onClick={() => setSortMode('old')}
        >
          📅 古い順
        </button>
        <button
          className={`px-3 py-1 rounded border ${
            sortMode === 'popular' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
          }`}
          onClick={() => setSortMode('popular')}
        >
          🔥 人気順
        </button>
      </div>

      <ul className="space-y-4">
        {sortedPosts.length === 0 ? (
          <p className="text-gray-500 mt-4">該当する記事が見つかりませんでした。</p>
        ) : (
          sortedPosts.map((post) => (
            <li key={post.slug} className="border p-4 rounded shadow-sm">
              <Link href={`/posts/${post.slug}`}>
                <h2 className="text-lg font-semibold text-blue-600 hover:underline">
                  {post.title}
                </h2>
              </Link>
              <p className="text-sm text-gray-500">{post.date}</p>
              {post.excerpt && <p className="text-gray-700 mt-1">{post.excerpt}</p>}
              {post.tags && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </main>
  );
}
