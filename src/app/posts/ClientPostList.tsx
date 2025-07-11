'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { Post } from '@/types';
import Link from 'next/link';

type Props = {
  allPosts: Post[];
  popular: { slug: string; count: number }[];
};

export default function ClientPostList({ allPosts, popular }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [sortMode, setSortMode] = useState<'new' | 'old' | 'popular'>('new');

  // ✅ useSearchParams は useEffect 内で使用
  useEffect(() => {
    const keyword = searchParams.get('keyword') ?? '';
    setQuery(keyword);
  }, [searchParams]);

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

      {/* 🔍 検索フォーム */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const encoded = encodeURIComponent(query.trim());
          router.push(`/posts?keyword=${encoded}`);
        }}
        className="w-full"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="キーワードで検索（タイトル・タグ・投稿者）"
          className="w-full p-2 border rounded"
        />
      </form>

      {/* 並び替えボタン */}
      <div className="flex gap-3 mt-4">
        <button
          className={`px-3 py-1 rounded border ${
            sortMode === 'new' ? 'bg-black text-white' : 'bg-gray-200 text-black'
          }`}
          onClick={() => setSortMode('new')}
        >
           新しい順
        </button>
        <button
          className={`px-3 py-1 rounded border ${
            sortMode === 'old' ? 'bg-black text-white' : 'bg-gray-200 text-black'
          }`}
          onClick={() => setSortMode('old')}
        >
           古い順
        </button>
        <button
          className={`px-3 py-1 rounded border ${
            sortMode === 'popular' ? 'bg-black text-white' : 'bg-gray-200 text-black'
          }`}
          onClick={() => setSortMode('popular')}
        >
            人気の記事
        </button>
      </div>

      {/* 記事リスト */}
      <ul className="space-y-4">
        {sortedPosts.length === 0 ? (
          <p className="text-gray-500 mt-4">該当する記事が見つかりませんでした。</p>
        ) : (
          sortedPosts.map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`} className="inline-block">
                <h2 className="text-lg font-semibold text-black-600 hover:underline">
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
