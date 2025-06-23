import { authors } from '@/lib/authors';

export function generateStaticParams() {
  return Object.keys(authors).map((slug) => ({
    author: encodeURIComponent(slug),
  }));
}
