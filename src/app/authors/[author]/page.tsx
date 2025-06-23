import { authors } from '@/lib/authors';
import { getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { author: string } }): Promise<Metadata> {
  const authorSlug = decodeURIComponent(params.author);
  const authorData = authors[authorSlug as keyof typeof authors];

  if (!authorData) return { title: '投稿者が見つかりません' };

  return {
    title: `${authorData.name} さんの記事一覧 - 39times`,
    description: `${authorData.name} さんの勉強記録や受験体験を紹介しています。`,
  };
}

export default async function Page({ params }: { params: { author: string } }) {
  const authorSlug = decodeURIComponent(params.author);
  const authorData = authors[authorSlug as keyof typeof authors];

  if (!authorData) return notFound();

  const posts = getAllPosts().filter((post) => post.author === authorSlug);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-2">{authorData.name} さんの記事一覧</h1>
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
                  <span key={tag} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
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

export async function generateStaticParams() {
  return Object.keys(authors).map((slug) => ({
    author: encodeURIComponent(slug),
  }));
}
