import { useEffect, useState } from 'react'

import { dataType, newRotation } from '@/data'
import supabase from '@/lib/supabaseClient'
import { useHydraStore } from '@/store'
import { CACHE_TTL } from '@/constants'

interface IUseHydraStatisticsProps {
  localSetup: boolean
  yearCode?: string
}

export const useHydraStatistics = ({ localSetup, yearCode }: IUseHydraStatisticsProps) => {
  const { statistics, lastUpdated, setStatistics } = useHydraStore()
  const [loading, setLoading] = useState(statistics.length === 0)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const needUpdate = !lastUpdated || Date.now() - lastUpdated > CACHE_TTL || statistics.length === 0

    if (!needUpdate) return

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        if (localSetup) {
          setStatistics([newRotation])
        } else {
          const { data: statisticsData, error: supabaseError } = await supabase
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

          if (supabaseError) {
            setError(new Error(supabaseError.message))
            setLoading(false)
            return
          }

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
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [lastUpdated, setStatistics, localSetup, statistics.length])

  const filteredStatisticsByYear = yearCode ? statistics.filter((item) => getYearFromRotationId(item.id) === yearCode) : statistics

  return { data: filteredStatisticsByYear, loading, error }
}

function getYearFromRotationId(id: string): string {
  const [, end] = id.split('_')
  const [, , year] = end.split('-').map(String)
  return year
}
