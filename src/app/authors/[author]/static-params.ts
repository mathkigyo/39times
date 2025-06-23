import { getAllPosts } from '@/lib/posts';

export function generateStaticParams() {
  const posts = getAllPosts();
  const uniqueCategories = Array.from(new Set(posts.map((post) => post.category)));
  return uniqueCategories.map((slug) => ({
    slug: encodeURIComponent(slug),
  }));
}
