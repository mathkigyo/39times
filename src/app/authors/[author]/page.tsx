import { authors } from '@/lib/authors';
import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function AuthorPage({ params }: { params: { author: string } }) {
  const slug = decodeURIComponent(params.author);
  const author = authors[slug as keyof typeof authors];
  if (!author) return notFound();

  const posts = getAllPosts().filter((post) => post.author === slug);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">{author.name} さんの記事一覧</h1>

      <div className="mb-6">
        <p className="text-sm text-gray-600">分類：{author.field}</p>
        <p className="text-sm text-gray-500">{author.bio}</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500">この投稿者の記事は見つかりませんでした。</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`} className="text-lg font-semibold text-blue-600 hover:underline">
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
