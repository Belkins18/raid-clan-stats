import { useEffect, useState } from 'react'

import { dataType } from '@/data'
import supabase from '@/lib/supabaseClient'

export const useHydraStatistics = () => {
  const [data, setData] = useState<dataType.IHydraStatisticsData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      const { data: statistics } = await supabase
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

      if (statistics) {
        const formatted: dataType.IHydraStatisticsData[] = statistics
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

        setData(formatted)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  return { data, loading }
}
