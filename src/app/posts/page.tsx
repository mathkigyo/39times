import dynamic from 'next/dynamic';
import { getAllPosts } from '@/lib/posts';
import { getWeeklyPopularSlugs } from '@/lib/popular';

// ✅ SSR無効でクライアントコンポーネントを読み込む
const ClientPostList = dynamic(() => import('./ClientPostList'), { ssr: false });

export default async function PostListPage() {
  const posts = getAllPosts();
  const popular = await getWeeklyPopularSlugs();

  return (
    <ClientPostList allPosts={posts} popular={popular} />
  );
}
