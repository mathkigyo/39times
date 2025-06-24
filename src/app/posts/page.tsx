import { getAllPosts } from '@/lib/posts';
import { getWeeklyPopularSlugs } from '@/lib/popular';
import ClientWrapper from './ClientWrapper'; // ← ラッパーを読み込む

export default async function PostListPage() {
  const posts = getAllPosts();
  const popular = await getWeeklyPopularSlugs();

  return <ClientWrapper allPosts={posts} popular={popular} />;
}
