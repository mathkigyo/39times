// src/app/posts/[slug]/page.tsx

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import breaks from "remark-breaks"; // 改行対応
import { getAllPosts } from "@/lib/posts";
import ViewCounter from "@/components/ViewCounter";
import Script from "next/script"; // 追加：外部スクリプト用

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "src", "content"));
  return files.map((filename) => ({
    slug: filename.replace(".md", ""),
  }));
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "src", "content", `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const processedContent = await remark()
    .use(breaks)
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  const allPosts = getAllPosts();
  const relatedByTag = allPosts.filter(
    (post) =>
      post.slug !== slug && post.tags?.some((tag) => data.tags?.includes(tag))
  );
  const relatedByAuthor = allPosts.filter(
    (post) => post.slug !== slug && post.author === data.author
  );

  return (
    <main className="p-8">
      {/* 記事タイトル */}
      <h1 className="text-2xl font-bold mb-1">{data.title}</h1>

      {/* 投稿日と投稿者 */}
      <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
        <span>
          📅{" "}
          {new Date(data.date).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <span>👤 {data.author}</span>
      </div>

      {/* PVカウンター */}
      <ViewCounter slug={slug} />

      {/* アイキャッチ画像 */}
      <img
        src={
          data.image ??
          (data.category === "勉強ログ"
            ? "/images/study-log.jpg"
            : data.category === "模試結果"
            ? "/images/exam-results.jpg"
            : data.category === "参考書レビュー"
            ? "/images/book-reviews.jpg"
            : "/images/blog.jpg")
        }
        alt={data.title}
        className="w-full max-w-5xl h-48 sm:h-64 md:h-72 object-cover mx-auto rounded-lg mb-6"
      />

      {/* タグ表示 */}
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

      {/* ✅ AdSense広告ユニット（記事下） */}
      <div className="my-6">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-1048972187942067"
          data-ad-slot="7407087779"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>

      {/* 関連記事（タグ） */}
      {relatedByTag.length > 0 && (
        <section className="mt-10">
          <h2 className="text-sm font-bold mb-2">🔖 関連記事（同じタグ）</h2>
          <ul className="list-disc pl-5 space-y-1">
            {relatedByTag.slice(0, 3).map((post) => (
              <li key={post.slug}>
                <a
                  href={`/posts/${post.slug}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 関連記事（投稿者） */}
      {relatedByAuthor.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-bold mb-2">👤 投稿者の他の記事</h2>
          <ul className="list-disc pl-5 space-y-1">
            {relatedByAuthor.slice(0, 3).map((post) => (
              <li key={post.slug}>
                <a
                  href={`/posts/${post.slug}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ✅ 広告スクリプト（非同期読み込み） */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1048972187942067"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
        }}
      />
    </main>
  );
}
