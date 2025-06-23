import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import type { Post } from '@/types';
import type { Metadata } from 'next'; // Metadataの型をインポート

// Propsの型定義
type Props = {
  params: { slug: string };
};

// メタデータを生成する関数
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryNameMap: { [key: string]: string } = {
    'study-log': '勉強ログ',
    'exam-results': '模試結果',
    'book-reviews': '参考書レビュー',
  };
  const categoryName = categoryNameMap[params.slug] ?? '未分類';

  return {
    title: `${categoryName} の記事一覧`,
    description: `${categoryName}に関する記事の一覧ページです。`,
    // 必要であれば、ogp.pngなどの画像も設定できます
    // openGraph: {
    //   images: ['/ogp.png'],
    // },
  };
}

const categoryNameMap: { [key: string]: string } = {
  'study-log': '勉強ログ',
  'exam-results': '模試結果',
  'book-reviews': '参考書レビュー',
};

export default function CategoryPage({ params }: Props) {
  const allPosts = getAllPosts();
  const posts = allPosts.filter((post: Post) => post.category === params.slug);
  const categoryName = categoryNameMap[params.slug] ?? '未分類';

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{categoryName} の記事一覧</h1>

      {posts.length === 0 ? (
        <p className="text-gray-500">まだ記事がありません。</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post: Post) => (
            <li key={post.slug} className="border p-4 rounded">
              <Link href={`/posts/${post.slug}`}>
                <h2 className="text-lg font-medium text-blue-700 hover:underline">
                  {post.title}
                </h2>
              </Link>
              <p className="text-sm text-gray-500">{post.date}</p>
              {post.excerpt && <p className="text-sm mt-1">{post.excerpt}</p>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}