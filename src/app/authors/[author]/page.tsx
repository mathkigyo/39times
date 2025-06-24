import { authors } from '@/lib/authors';
import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// ✅ 修正ポイント：PageProps 型ではなく直接 inline 型にする
export async function generateMetadata(
  { params }: { params: { author: string } }
): Promise<Metadata> {
  const authorSlug = decodeURIComponent(params.author);
  const authorData = Object.values(authors).find((a) => a.slug === authorSlug);

  if (!authorData) {
    return {
      title: '投稿者が見つかりません',
      description: '指定された投稿者は存在しません',
    };
  }

  return {
    title: `${authorData.name} の記事一覧`,
    description: `${authorData.name}（${authorData.field}）の投稿一覧ページ`,
    openGraph: {
      title: `${authorData.name} の記事一覧`,
      description: `${authorData.name}（${authorData.field}）の投稿一覧ページ`,
      images: ['/ogp.png'],
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

// 🔁 ページ本体
export default async function AuthorPage({
  params,
}: {
  params: { author: string };
}) {
  const authorSlug = decodeURIComponent(params.author);
  const authorData = Object.values(authors).find((a) => a.slug === authorSlug);

  if (!authorData) return notFound();

  const posts = getAllPosts().filter((post) => post.author === authorSlug);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">{authorData.name} さんの記事一覧</h1>
      <div className="mb-6">
        <p className="text-sm text-gray-700">
          分類：<span className="font-semibold">{authorData.field}</span>
        </p>
        <p className="text-sm text-gray-500">{authorData.bio}</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500">この投稿者の記事は見つかりませんでした。</p>
      ) : (
        <ul>
          {posts.map((post) => (
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
