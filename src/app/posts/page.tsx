import { getAllPosts } from '@/lib/posts';
import { getWeeklyPopularSlugs } from '@/lib/popular';
import ClientPostList from './ClientPostList';
import { Suspense } from 'react';

export default async function PostListPage() {
  const posts = getAllPosts();
  const popular = await getWeeklyPopularSlugs();

  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <ClientPostList allPosts={posts} popular={popular} />
    </Suspense>
  );
}
