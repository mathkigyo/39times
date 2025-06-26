'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Article = {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
};

export default function PostList({ articles }: { articles: Article[] }) {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles);

  const suggestions = Array.from(
    new Set(
      articles.flatMap((article) => [article.title, ...(article.tags ?? [])])
    )
  ).filter((item) => item.toLowerCase().includes(input.toLowerCase()));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (value: string) => {
    setInput(value);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const q = input.toLowerCase();
    const filtered = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(q) ||
        (article.tags ?? []).some((tag) => tag.toLowerCase().includes(q))
    );
    setFilteredArticles(filtered);
  }, [input, articles]);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">記事一覧</h1>

      <div className="mb-2 relative">
        <input
          type="text"
          placeholder="記事タイトルやタグで検索"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          className="p-2 border rounded w-full"
        />
        {showSuggestions && input && suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow">
            {suggestions.slice(0, 8).map((item, i) => (
              <li
                key={i}
                onClick={() => handleSuggestionClick(item)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={() => setShowSuggestions(false)}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full sm:w-auto"
      >
        検索
      </button>

      <ul>
        {filteredArticles.map((article) => (
          <li key={article.slug} className="mb-6">
            <div className="flex flex-wrap gap-2 mb-1">
              {article.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <Link
              href={`/posts/${article.slug}`}
              className="text-lg font-bold text-blue-600 hover:underline"
            >
              {article.title}
            </Link>
            <p className="text-sm text-gray-500">{article.date}</p>
          </li>
        ))}
        {filteredArticles.length === 0 && (
          <p className="text-gray-500">該当する記事がありません。</p>
        )}
      </ul>
    </main>
  );
}