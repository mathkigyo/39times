import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { getWeeklyPopularSlugs } from "@/lib/popular";
import type { Post } from "@/types";

export default async function Home() {
  const posts = getAllPosts();
  const popular = await getWeeklyPopularSlugs();

  // 各記事に今週のviewsをマージ（なければ0）
  const postsWithViews: (Post & { views: number })[] = posts.map((post) => {
    const pv = popular.find((p) => p.slug === post.slug);
    return {
      ...post,
      views: pv?.count ?? 0,
    };
  });

  // 人気順に並び替え（viewsが0でも含む）→ 上位5件
  const popularPosts = postsWithViews
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  // 新着順（dateの降順）→ 上位5件
  const recentPosts = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <main className="p-8 space-y-10">
      {/* あいさつセクション */}
      <section>
        <h1 className="text-3xl font-bold mb-4">受験ブログへようこそ！</h1>
        <p className="mb-6">ここでは勉強法や体験談を掲載しています。</p>
        <Link href="/posts" className="text-blue-600 hover:underline text-lg">
          👉 記事一覧はこちら
        </Link>
      </section>

      {/* 📅 今週の人気記事 TOP5（views非表示） */}
      <section>
        <h2 className="text-2xl font-bold mb-4">📅 今週の人気記事 TOP5</h2>
        {popularPosts.length === 0 ? (
          <p className="text-gray-500">まだ人気記事はありません。</p>
        ) : (
          <ol className="list-decimal pl-5 space-y-1">
            {popularPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ol>
        )}
      </section>

      {/* 🆕 新着記事 TOP5 */}
      <section>
        <h2 className="text-2xl font-bold mb-4">🆕 新着記事</h2>
        <ul className="list-disc pl-5 space-y-1">
          {recentPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/posts/${post.slug}`}
                className="text-blue-600 hover:underline"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
