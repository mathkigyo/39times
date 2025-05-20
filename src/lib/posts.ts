import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/types";

const postsDirectory = path.join(process.cwd(), "src", "content");

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(postsDirectory);

  const posts: Post[] = files.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      title: data.title,
      slug: filename.replace(".md", ""),
      date: data.date,
      author: data.author,
      tags: data.tags || [],
      content,
      excerpt: data.excerpt || "",
      pv: data.pv || 0, // オプション
    };
  });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}
