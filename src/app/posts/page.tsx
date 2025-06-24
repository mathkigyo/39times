// src/app/posts/page.tsx
import { Suspense } from 'react';
import { getAllPosts } from '@/lib/posts';
import { getWeeklyPopularSlugs } from '@/lib/popular';
import ClientPostList from './ClientPostList';

export default async function PostListPage() {
  const allPosts = getAllPosts();
  const popular = await getWeeklyPopularSlugs();

  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <ClientPostList allPosts={allPosts} popular={popular} />
    </Suspense>
  );
}
