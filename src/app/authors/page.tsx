import { authors } from '@/lib/authors';
import Link from 'next/link';
import type { Author } from '@/types';

export default function AuthorsPage() {
  const authorEntries = Object.entries(authors); // [slug, author] の配列

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">投稿者一覧</h1>

      <ul className="space-y-6">
        {authorEntries.map(([slug, author]: [string, Author]) => (
          <li key={slug} className="border border-gray-300 rounded-lg p-4">
            <h2 className="text-xl font-semibold">
              <Link
                href={`/authors/${slug}`}
                className="text-blue-600 hover:underline"
              >
                {author.name}
              </Link>
            </h2>
            <p className="text-sm text-gray-600">分類：{author.field}</p>
            <p className="text-sm text-gray-500">{author.bio}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
