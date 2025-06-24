import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { getWeeklyPopularSlugs } from '@/lib/popular';
import { Pencil, Clock, Book, Sparkles, Tags, Users } from 'lucide-react';
import type { Post } from '@/types';
import type { Metadata } from 'next';

// ✅ 修正済！asyncを外して、戻り値の型を明示
export function generateMetadata(): Metadata {
  return {
    title: '39times - 受験生のための情報ブログ',
    description: '受験生のリアルな声と勉強記録をまとめた受験ブログ。',
    openGraph: {
      title: '39times - 受験生のための情報ブログ',
      description: '受験生のリアルな声と勉強記録をまとめた受験ブログ。',
      url: 'https://39times.com/',
      siteName: '39times',
      images: [
        {
          url: 'https://39times.com/ogp.png',
          width: 1200,
          height: 630,
          alt: '39times OGP',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: '39times - 受験生のための情報ブログ',
      description: '受験生のリアルな声と勉強記録をまとめた受験ブログ。',
      images: ['https://39times.com/ogp.png'],
    },
  };
}

export default async function Home() {
  const posts: Post[] = getAllPosts();
  const popular = await getWeeklyPopularSlugs();

  const recentPosts: Post[] = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const postsWithViews: (Post & { views: number })[] = posts.map((post) => {
    const pv = popular.find((p) => p.slug === post.slug);
    return { ...post, views: pv?.count ?? 0 };
  });

  const popularPosts = postsWithViews
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  return (
    <main className="p-4 space-y-10">
      {/* 📘 メインビジュアル */}
      <section
        className="relative text-white rounded-xl px-6 py-6 overflow-hidden h-[145px] md:h-[220px] flex flex-col justify-center"
        style={{
          backgroundImage: "url('/blog-picture.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10">
          <h2 className="text-xl md:text-3xl font-bold mb-1">39timesへようこそ</h2>
          <p className="text-xs md:text-sm">全国の頑張る受験生を応援しています</p>
        </div>
      </section>

      {/* 📂 カテゴリ一覧 */}
      <section>
        <ul className="space-y-4">
          <CategoryItem icon={<Pencil />} label="勉強ログ" href="/category/study-log" />
          <CategoryItem icon={<Clock />} label="模試結果" href="/category/exam-results" />
          <CategoryItem icon={<Book />} label="参考書レビュー" href="/category/book-reviews" />
          <CategoryItem icon={<Sparkles />} label="新着記事" href="/posts" />
          <CategoryItem icon={<Tags />} label="タグ一覧" href="/tags" />
          <CategoryItem icon={<Users />} label="投稿者一覧" href="/authors" />
        </ul>
      </section>

      {/* 🆕 新着記事 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">New✨</h2>
        {recentPosts.length === 0 ? (
          <p className="text-gray-500">まだ記事がありません。</p>
        ) : (
          <div className="bg-gray-50 p-4 rounded-md">
            {recentPosts.map((post: Post) => (
              <div key={post.slug}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="block p-3 bg-white rounded shadow hover:bg-gray-100 transition"
                >
                  <h3 className="text-base font-medium hover:underline text-black-700">{post.title}</h3>
                  <p className="text-sm text-gray-500">{post.date}</p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 🔥 Weekly Highlights */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Weekly Highlights🔥</h2>
        {popularPosts.length === 0 ? (
          <p className="text-gray-500">まだ人気記事はありません。</p>
        ) : (
          <div className="bg-gray-50 p-4 rounded-md">
            {popularPosts.map((post) => (
              <div key={post.slug} className="p-3 bg-white rounded shadow hover:bg-gray-100 transition">
                <Link href={`/posts/${post.slug}`} className="block">
                  <h3 className="text-base font-medium hover:underline text-black-700">{post.title}</h3>
                  <p className="text-sm text-gray-500">{post.views} views</p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 📄 プライバシーポリシー & お問い合わせ */}
      <footer className="pt-10 border-t mt-10 text-sm text-gray-500">
        <ul className="space-y-2">
          <li>
            <Link href="/privacy-policy" className="hover:underline text-blue-600">
              プライバシーポリシー
            </Link>
          </li>
          <li>
            <a
              href="https://forms.gle/vHR81RECEp8R672Y9"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-blue-600"
            >
              お問い合わせフォーム
            </a>
          </li>
        </ul>
        <p className="mt-4 text-xs">&copy; 2025 39times All rights reserved.</p>
      </footer>
    </main>
  );
}

// 🧩 カテゴリカード
function CategoryItem({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <li className="flex items-center justify-between bg-white p-4 rounded shadow hover:bg-gray-100">
        <div className="flex items-center gap-3 text-blue-900">
          <div className="w-6 h-6">{icon}</div>
          <span className="text-base font-medium">{label}</span>
        </div>
        <span className="text-blue-400">{'>'}</span>
      </li>
    </Link>
  );
}
