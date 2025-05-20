'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TagList({ tags }: { tags: string[] }) {
  const [query, setQuery] = useState('');

  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="タグ名で検索"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-6 p-2 border rounded w-full"
      />

      {filteredTags.length === 0 ? (
        <p className="text-gray-500">該当するタグは見つかりませんでした。</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {filteredTags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 text-sm"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
