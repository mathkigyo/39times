// src/lib/popular.ts
import { supabase } from '@/lib/supabase';

export async function getWeeklyPopularSlugs(): Promise<{ slug: string; count: number }[]> {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data, error } = await supabase
    .from('page_views')
    .select('slug, count, created_at')
    .gte('created_at', sevenDaysAgo.toISOString());

  if (error) {
    console.error('週間PV取得失敗:', error.message);
    return [];
  }

  // slugごとに集計
  const slugCountMap = new Map<string, number>();

  for (const row of data) {
    const current = slugCountMap.get(row.slug) ?? 0;
    slugCountMap.set(row.slug, current + row.count);
  }

  // 降順ソートして返す
  return Array.from(slugCountMap.entries())
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count);
}
