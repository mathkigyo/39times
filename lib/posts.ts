// lib/posts.ts

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "src/content");

export function getAllPosts() {
  const filenames = fs.readdirSync(postsDir);

  const posts = filenames.map((filename) => {
    const fullPath = path.join(postsDir, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: filename.replace(/\.md$/, ""),
      title: data.title,
      date: data.date,
      tags: data.tags,
      author: data.author,
      content,
    };
  });

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}
