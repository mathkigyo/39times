'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const incrementView = async () => {
      // 1. 現在のデータを取得
      const { data, error } = await supabase
        .from('page_views')
        .select('count')
        .eq('slug', slug)
        .single();

      let currentCount = 0;

      if (error && error.code !== 'PGRST116') {
        console.error('取得失敗:', error);
        return;
      }

      if (data?.count !== undefined && data?.count !== null) {
        currentCount = data.count;
      }

      // 2. インクリメント or 新規作成
      const { error: updateError } = await supabase
        .from('page_views')
        .upsert({ slug, count: currentCount + 1 });

      if (updateError) {
        console.error('更新失敗:', updateError);
      } else {
        setViews(currentCount + 1);
      }
    };

    incrementView();
  }, [slug]);

  return (
    <p className="text-sm text-gray-500">
      👁 {views !== null ? views : '...'} views
    </p>
  );
}
