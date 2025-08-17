import { Suspense } from 'react';
import { getAllPosts } from '@/lib/posts'; // ここがサーバーサイドの関数
import { getWeeklyPopularSlugs } from '@/lib/popular';
import type { Post } from '@/types';
import ClientPostList from './ClientPostList';

// popularの型を定義
type PopularData = { slug: string; count: number }[];

// このコンポーネントはサーバーサイドで実行される
// サーバーサイドでしか使えないfsモジュールを含む関数をここで呼び出す
export default async function PostsPage() {
  // `getAllPosts`はサーバーサイドで実行されるので、fsモジュールは問題なく動作する
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