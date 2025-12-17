import { useEffect, useState } from 'react'

import { dataType, newRotation } from '@/data'
import supabase from '@/lib/supabaseClient'
import { useHydraStore } from '@/store'

const CACHE_TTL = 1000 * 60 * 60 // 60 минут

interface IUseHydraStatisticsProps {
  localSetup: boolean
  yearCode?: string
}

export const useHydraStatistics = ({ localSetup, yearCode }: IUseHydraStatisticsProps) => {
  const { statistics, lastUpdated, setStatistics } = useHydraStore()
  const [loading, setLoading] = useState(statistics.length === 0)

  useEffect(() => {

    const needUpdate = !lastUpdated || Date.now() - lastUpdated > CACHE_TTL || statistics.length === 0

    if (!needUpdate) return
   
   
    const fetchData = async () => {
      setLoading(true)
      if (localSetup) {
        setStatistics([newRotation])
      } else {
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
      }
      setLoading(false)
    }

    fetchData()
  }, [lastUpdated])


  console.log('useHydraStatistics => statistics: ', yearCode, statistics)
  const filteredStatisticsByYear = yearCode ? statistics.filter((item) => getYearFromRotationId(item.id) === yearCode) : statistics

  return { data: filteredStatisticsByYear, loading }
}

function getYearFromRotationId(id: string): string {
  const [, end] = id.split('_')
  const [, , year] = end.split('-').map(String)
  console.log('getYearFromRotationId: ', year)
  return year
}
