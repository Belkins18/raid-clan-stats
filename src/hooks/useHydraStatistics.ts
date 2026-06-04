import { useEffect, useMemo, useState } from 'react'

import type {
  IClanResultData,
  IDualAxesInterval,
  IDualAxesLine
} from '@/components/Hydra/Chart/types'
import { formatLocalized, parseNumberSafe } from '@/components/Hydra/utils'
import { hydraLevelsWithRate } from '@/components/Hydra/utils/constants'
import { CACHE_TTL } from '@/constants'
import { dataType, newRotation } from '@/data'
import supabase from '@/lib/supabaseClient'
import { useHydraStore } from '@/store'

interface IUseHydraStatisticsProps {
  yearCode?: string
}

interface IComputedRotationData {
  rotation: dataType.IHydraStatisticsData
  totalDamage: number
  dualAxesData: {
    levelDamage: IDualAxesInterval[]
    totalDamage: IDualAxesLine
  }
  columnData: IClanResultData[]
}

export const useHydraStatistics = ({ yearCode }: IUseHydraStatisticsProps) => {
  const { statistics, lastUpdated, setStatistics } = useHydraStore()
  const [loading, setLoading] = useState(statistics.length === 0)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const needUpdate =
      !lastUpdated ||
      Date.now() - lastUpdated > CACHE_TTL ||
      statistics.length === 0

    if (!needUpdate) return

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        if (!import.meta.env.DEV) {
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
                  const [day, month, year] = id
                    .split('_')[0]
                    .split('-')
                    .map(Number)
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
  }, [lastUpdated, setStatistics, statistics.length])

  const filteredStatisticsByYear = yearCode
    ? statistics.filter((item) => getYearFromRotationId(item.id) === yearCode)
    : statistics

  const computedData = useMemo<IComputedRotationData[]>(() => {
    return filteredStatisticsByYear.map((rotation) => {
      let normalDamage = 0
      let hardDamage = 0
      let brutalDamage = 0
      let nightmareDamage = 0

      rotation.data.forEach((userStat) => {
        hydraLevelsWithRate.forEach(({ label, rate }) => {
          const rawValue = userStat[label as keyof typeof userStat] || '0'
          const numericValue = parseNumberSafe(rawValue)
          const damageWithRate = numericValue * rate

          switch (label) {
            case dataType.EHydraLevel.normal:
              normalDamage += damageWithRate
              break
            case dataType.EHydraLevel.hard:
              hardDamage += damageWithRate
              break
            case dataType.EHydraLevel.brutal:
              brutalDamage += damageWithRate
              break
            case dataType.EHydraLevel.nightmare:
              nightmareDamage += damageWithRate
              break
          }
        })
      })

      const totalDamage =
        normalDamage + hardDamage + brutalDamage + nightmareDamage

      const dualAxesData = {
        levelDamage: [
          {
            period: rotation.id,
            type: dataType.EHydraLevel.normal,
            value: normalDamage
          },
          {
            period: rotation.id,
            type: dataType.EHydraLevel.hard,
            value: hardDamage
          },
          {
            period: rotation.id,
            type: dataType.EHydraLevel.brutal,
            value: brutalDamage
          },
          {
            period: rotation.id,
            type: dataType.EHydraLevel.nightmare,
            value: nightmareDamage
          }
        ],
        totalDamage: {
          period: rotation.id,
          damage: totalDamage,
          label: formatLocalized(totalDamage)
        }
      }

      const columnData: IClanResultData[] = []
      rotation.data.forEach((item) => {
        const name = item.name
        hydraLevelsWithRate.forEach(({ label, rate }) => {
          const rawValue = item[label as keyof typeof item] || '0'
          const numericValue = parseNumberSafe(rawValue)
          columnData.push({
            name,
            value: numericValue * rate,
            category: label
          })
        })
      })

      return {
        rotation,
        totalDamage,
        dualAxesData,
        columnData
      }
    })
  }, [filteredStatisticsByYear])

  return { data: filteredStatisticsByYear, computedData, loading, error }
}

function getYearFromRotationId(id: string): string {
  const [, end] = id.split('_')
  const [, , year] = end.split('-').map(String)
  return year
}
