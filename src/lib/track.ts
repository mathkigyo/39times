// src/lib/track.ts
import { supabase } from './supabase'

export async function updatePostViews(slug: string) {
  const { error } = await supabase.from('page_views').insert({
    slug,
    count: 1,
    created_at: new Date().toISOString(),
  })

  if (error) {
    console.error('PV記録エラー:', error.message)
  }
}
