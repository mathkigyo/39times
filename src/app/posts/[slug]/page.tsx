import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { getAllPosts } from "@/lib/posts"; // ← 追加

type Params = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "src", "content"));
  return files.map((filename) => ({
    slug: filename.replace(".md", ""),
  }));
}

export default async function PostPage({ params }: Params) {
  const filePath = path.join(process.cwd(), "src", "content", `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  // 🔁 関連記事ロジック（タグと投稿者ベース）
  const allPosts = getAllPosts();
  const relatedByTag = allPosts.filter(
    (post) =>
      post.slug !== params.slug &&
      post.tags?.some((tag) => data.tags?.includes(tag))
  );
  const relatedByAuthor = allPosts.filter(
    (post) =>
      post.slug !== params.slug &&
      post.author === data.author
  );

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-2">{data.title}</h1>

      {/* 👁 PVカウンター（後で追加） */}
      {/* <ViewCounter slug={params.slug} /> */}

      {/* 🔖 タグ表示 */}
      {data.tags && Array.isArray(data.tags) && data.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {data.tags.map((tag: string) => (
            <span
              key={tag}
              className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* 本文 */}
      <article
        className="prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* 🔁 関連記事（タグ） */}
      {relatedByTag.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-2">🔖 関連記事（同じタグ）</h2>
          <ul className="list-disc pl-5 space-y-1">
            {relatedByTag.slice(0, 3).map((post) => (
              <li key={post.slug}>
                <a href={`/posts/${post.slug}`} className="text-blue-600 hover:underline">
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 👤 関連記事（同じ投稿者） */}
      {relatedByAuthor.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xl font-bold mb-2">👤 投稿者の他の記事</h2>
          <ul className="list-disc pl-5 space-y-1">
            {relatedByAuthor.slice(0, 3).map((post) => (
              <li key={post.slug}>
                <a href={`/posts/${post.slug}`} className="text-blue-600 hover:underline">
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
