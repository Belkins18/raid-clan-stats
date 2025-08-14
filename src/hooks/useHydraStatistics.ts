import { useEffect, useState } from 'react'

import { dataType } from '@/data'
import supabase from '@/lib/supabaseClient'
import { useHydraStore } from '@/store'

const CACHE_TTL = 1000 * 60 * 60 // 60 минут

export const useHydraStatistics = () => {
  const { statistics, lastUpdated, setStatistics } = useHydraStore()
  const [loading, setLoading] = useState(statistics.length === 0)

  useEffect(() => {
    const needUpdate = !lastUpdated || Date.now() - lastUpdated > CACHE_TTL || statistics.length === 0

    if (!needUpdate) return

    const fetchData = async () => {
      setLoading(true)

      const { data: statisticsData } = await supabase
        .from('hydra_statistics')
        .select(
          `
          id,
          hydra_user_statistics (
            name,
            normal,
            hard,
            brutal,
            nightmare,
            key_used
          )
        `
        )
        .order('id', { ascending: false })

      if (statisticsData) {
        const formatted: dataType.IHydraStatisticsData[] = statisticsData
          .map((p) => ({
            id: p.id,
            data: p.hydra_user_statistics.map((row) => ({
              name: row.name,
              Normal: row.normal,
              Hard: row.hard,
              Brutal: row.brutal,
              Nightmare: row.nightmare,
              keyUsed: row.key_used
            }))
          }))
          .sort((a, b) => {
            const parseDate = (id: string): number => {
              const [day, month, year] = id.split('_')[0].split('-').map(Number)
              return new Date(year, month - 1, day).getTime()
            }
            return parseDate(a.id) - parseDate(b.id)
          })
        setStatistics(formatted)
      }
      setLoading(false)
    }

    fetchData()
  }, [lastUpdated, statistics.length, setStatistics])

  return { data: statistics, loading }
}
