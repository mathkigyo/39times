'use client';

import { useState } from 'react';
import Link from 'next/link';
import { groupTagsByCategory } from '@/lib/tags';

type Props = {
  tags: string[]; // 表示対象のタグ（全投稿に使われているものだけ）
};

export default function TagList({ tags }: Props) {
  const [query, setQuery] = useState('');

  // 検索ワードでフィルター
  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(query.toLowerCase())
  );

  // フィルター後のタグをカテゴリごとに分ける
  const groupedTags = groupTagsByCategory(filteredTags);

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
        <div className="space-y-6">
          {Object.entries(groupedTags).map(([category, tags]) => (
            <section key={category}>
              <h2 className="text-lg font-semibold mb-2">{category}</h2>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag)}`}
                    className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
