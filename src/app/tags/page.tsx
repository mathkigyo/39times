//import Link from 'next/link'; 一時削除
import { getAllPosts } from '@/lib/posts';
import type { Post } from '@/types';
import TagList from '@/components/TagList';

export default function TagIndexPage() {
  const posts: Post[] = getAllPosts();

  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags || []))
  );

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">タグ一覧</h1>
      <TagList tags={allTags} />
    </main>
  );
}
