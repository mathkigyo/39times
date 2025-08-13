// src/app/tags/[tag]/page.tsx

import { Post } from '@/types';
import { getAllPosts } from '@/lib/posts';
import { getWeeklyPopularSlugs, PopularSlug } from '@/lib/popular';
import { tags } from '@/lib/tags';
import Link from 'next/link';

type TagPageProps = {
  params: { tag: string };
};

export default async function TagPage({ params }: TagPageProps) {
  // URL エンコードされたタグ名をデコード
  const tag = decodeURIComponent(params.tag);

  // 全記事と週間人気スラッグを取得
  const posts: Post[] = getAllPosts();
  const popular: PopularSlug[] = await getWeeklyPopularSlugs();

  // このタグを持つ記事だけ抽出
  const filtered = posts.filter((post) => post.tags?.includes(tag));

  // 各記事に views をマージ
  const taggedWithViews: (Post & { views: number })[] = filtered.map((post) => {
    const pv = popular.find((p) => p.slug === post.slug);
    return {
      ...post,
      views: pv?.views ?? 0,    // ← ここを count ではなく views に
    };
  });

  // views 順でソート
  const sortedPosts = taggedWithViews.sort((a, b) => b.views - a.views);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">タグ: {tag}</h1>

      {sortedPosts.length === 0 ? (
        <p className="text-gray-500">このタグの記事は見つかりませんでした。</p>
      ) : (
        <ul className="space-y-4">
          {sortedPosts.map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`}>
                <div className="text-lg font-semibold text-blue-600 hover:underline">
                  {post.title}
                </div>
              </Link>
              <div className="text-sm text-gray-500">
                {post.date} ・ {post.views} views
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

// 静的生成する全タグ一覧
export async function generateStaticParams(): Promise<{ tag: string }[]> {
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag.name),
  }));
}
