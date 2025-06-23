// src/lib/popular.ts
import { supabase } from '@/lib/supabase'

/**
 * 個別記事ページ用：指定されたslugのPV数を取得（全件合計）
 */
export async function getPostViews(slug: string): Promise<number> {
  const { data, error } = await supabase
    .from('page_views')
    .select('count')
    .eq('slug', slug)

  if (error) {
    console.error('PV取得エラー:', error.message)
    return 0
  }

  if (!data || data.length === 0) {
    console.warn(`slug="${slug}" のPVデータが存在しません`)
    return 0
  }

  // countの合計を返す
  const totalViews = data.reduce((sum, row) => sum + row.count, 0)
  return totalViews
}

/**
 * トップページ用：過去7日間の人気記事一覧を取得
 */
export async function getWeeklyPopularSlugs(): Promise<{ slug: string; count: number }[]> {
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const { data, error } = await supabase
    .from('page_views')
    .select('slug, count, created_at')
    .gte('created_at', sevenDaysAgo.toISOString())

  if (error) {
    console.error('週間PV取得失敗:', error.message)
    return []
  }

  const slugCountMap = new Map<string, number>()
  for (const row of data) {
    const current = slugCountMap.get(row.slug) ?? 0
    slugCountMap.set(row.slug, current + row.count)
  }

  return Array.from(slugCountMap.entries())
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count)
}
