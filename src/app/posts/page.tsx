import { getAllPosts } from '@/lib/posts';
import { getWeeklyPopularSlugs } from '@/lib/popular';
import ClientPostList from './ClientPostList';

export default async function PostListPage() {
  const posts = getAllPosts();
  const popular = await getWeeklyPopularSlugs();

  return <ClientPostList allPosts={posts} popular={popular} />;
}
