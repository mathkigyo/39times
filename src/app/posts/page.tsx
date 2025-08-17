import { Suspense } from 'react';
import { getAllPosts } from '@/lib/posts';
import { getWeeklyPopularSlugs } from '@/lib/popular';
// type { Post } from '@/types'; // 💡 この行は不要なため削除
import ClientPostList from './ClientPostList';

// popularの型を定義
type PopularData = { slug: string; count: number }[];

// このコンポーネントはサーバーサイドで実行される
export default async function PostsPage() {
  const allPosts = getAllPosts();
  const popular = await getWeeklyPopularSlugs();
  
  const popularWithCount: PopularData = popular.map(p => ({
    slug: p.slug,
    count: p.views
  }));

  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      {/* サーバーで取得したデータをpropsとしてクライアントコンポーネントに渡す */}
      <ClientPostList allPosts={allPosts} popular={popularWithCount} />
    </Suspense>
  );
}
