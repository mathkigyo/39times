import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post } from '@/types';

const postsDir = path.join(process.cwd(), 'src/content');

export function getAllPosts(): Post[] {
  const filenames = fs.readdirSync(postsDir);

  const posts: Post[] = filenames.map((filename) => {
    const fullPath = path.join(postsDir, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: filename.replace(/\.md$/, ''),
      title: data.title,
      date: data.date,
      tags: data.tags || [],
      author: data.author,
      category: data.category || '', // ✅ デフォルトは空に変更！
      content,
      excerpt: data.excerpt || '',
      pv: data.pv || 0,
    };
  });

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

// ✅ Turbopack 対策で dummy export を追加（念のため）
export const __dummy = true;
