import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { dataType } from '@/data'

interface HydraState {
  period?: string
  statistics: dataType.IHydraStatisticsData[]
  lastUpdated?: number
  changePeriod: (value: string | undefined) => void
  setStatistics: (data: dataType.IHydraStatisticsData[]) => void
}
export const useHydraStore = create<HydraState>()(
  persist(
    (set) => ({
      period: undefined,
      statistics: [],
      lastUpdated: undefined,
      changePeriod: (value) =>
        set((state) => ({
          period: state.period !== value ? value : state.period
        })),
      setStatistics: (data) =>
        set({
          statistics: data,
          lastUpdated: Date.now()
        })
    }),
    {
      name: 'storage-hydra'
    }
  )
)
