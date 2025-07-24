// src/lib/popular.ts
import { supabase } from '@/lib/supabase'

/**
 * 🔹 PVを記録：毎回 count = 1 で insert（created_atつき）
 */
export async function recordPageView(slug: string): Promise<void> {
  const { error } = await supabase.from('page_views').insert({
    slug,
    count: 1,
    created_at: new Date().toISOString(),
  })

  if (error) {
    console.error(`PV記録エラー（slug=${slug}）:`, error.message)
  }
}

/**
 * 🔹 記事ごとの累計PV数を取得
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
 * 🔹 週間人気記事（過去7日間のPV合計ランキング）
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

/**
 * 🔹 今までの人気記事（全期間のPV合計ランキング）
 */
export async function getAllTimePopularSlugs(): Promise<{ slug: string; count: number }[]> {
  const { data, error } = await supabase
    .from('page_views')
    .select('slug, count')

  if (error) {
    console.error('累計PV取得失敗:', error.message)
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
