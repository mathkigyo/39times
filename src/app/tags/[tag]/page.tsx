import { Post } from '@/types';
import { getAllPosts } from '@/lib/posts';
import { getWeeklyPopularSlugs } from '@/lib/popular';
import { tags } from '@/lib/tags';
import Link from 'next/link';

type TagPageProps = {
  params: { tag: string };
};

export default async function TagPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag);
  const posts: Post[] = getAllPosts();
  const popular = await getWeeklyPopularSlugs();

  const filtered = posts.filter((post) =>
    post.tags?.includes(tag)
  );

  const taggedWithViews: (Post & { views: number })[] = filtered.map((post) => {
    const pv = popular.find((p) => p.slug === post.slug);
    return {
      ...post,
      views: pv?.count ?? 0,
    };
  });

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
              <div className="text-sm text-gray-500">{post.date}</div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

// ✅ 静的生成対象のパス（全タグ）を定義
export async function generateStaticParams(): Promise<{ tag: string }[]> {
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag.name),
  }));
}
