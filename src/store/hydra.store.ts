import { create } from 'zustand'

interface HydraState {
  period?: string
  changePeriod: (value: string) => void
}

export const useHydraStore = create<HydraState>((set) => ({
  period: undefined,
  changePeriod: (value: string) =>
    set((state) => ({
      period: state.period !== value ? value : state.period
    }))
}))
