import { authors } from '@/lib/authors'; // ← 場所注意！
import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import type { Post } from '@/types';

type Params = {
  params: {
    slug: string;
  };
};

export default function AuthorPage({ params }: Params) {
  const posts: Post[] = getAllPosts();
  const slug = decodeURIComponent(params.slug);

  const authorData = authors[slug]; // 名前・文理・説明
  const filteredPosts = posts.filter((post) => post.author === slug); // author は slugでOK

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-2">{authorData?.name} さんの記事一覧</h1>

      {authorData && (
        <div className="mb-6">
          <p className="text-sm text-gray-700">
            分類：<span className="font-semibold">{authorData.type}</span>
          </p>
          <p className="text-sm text-gray-500">{authorData.description}</p>
        </div>
      )}

      {filteredPosts.length === 0 ? (
        <p className="text-gray-500">この投稿者の記事は見つかりませんでした。</p>
      ) : (
        <ul>
          {filteredPosts.map((post) => (
            <li key={post.slug} className="mb-6">
              <div className="flex flex-wrap gap-2 mb-1">
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/posts/${post.slug}`}
                className="text-lg font-bold text-blue-600 hover:underline"
              >
                {post.title}
              </Link>
              <p className="text-sm text-gray-500">{post.date}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
