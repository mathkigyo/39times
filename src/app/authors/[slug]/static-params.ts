import { authors } from '@/lib/authors';

export function generateStaticParams() {
  return Object.values(authors).map((author) => ({
    slug: encodeURIComponent(author.slug),
  }));
}
