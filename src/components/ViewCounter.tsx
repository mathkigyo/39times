'use client'

import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'

export default function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true

    const recordAndFetch = async () => {
      await supabase.from('page_views').insert({
        slug,
        count: 1,
        created_at: new Date().toISOString(),
      })

      const { data, error } = await supabase
        .from('page_views')
        .select('count')
        .eq('slug', slug)

      if (error || !data) {
        console.error('PV取得失敗:', error?.message)
        return
      }

      const total = data.reduce((sum, row) => sum + row.count, 0)
      setViews(total)
    }

    recordAndFetch()
  }, [slug])

  return (
    <p className="text-sm text-gray-500">
      👁 {views !== null ? views : '...'} views
    </p>
  )
}