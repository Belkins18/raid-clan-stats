import type { IHydraStatisticsData } from '@/data/types'

export const getLastId = (data: IHydraStatisticsData[]): string | undefined => {
  if (data.length === 0) return undefined
  return data[data.length - 1].id
}
