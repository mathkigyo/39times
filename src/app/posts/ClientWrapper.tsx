'use client';

import { Suspense } from 'react';
import ClientPostList from './ClientPostList';
import type { Post } from '@/types';

type Props = {
  allPosts: Post[];
  popular: { slug: string; count: number }[];
};

export default function ClientWrapper({ allPosts, popular }: Props) {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <ClientPostList allPosts={allPosts} popular={popular} />
    </Suspense>
  );
}
