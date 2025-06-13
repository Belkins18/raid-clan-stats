export const EHydraLevel = {
  normal: 'Normal',
  hard: 'Hard',
  brutal: 'Brutal',
  nightmare: 'Nightmare'
} as const

export type THydraLevel = (typeof EHydraLevel)[keyof typeof EHydraLevel]

export interface IHydraUserStatistic {
  name: string
  Normal: string | number
  Hard: string | number
  Brutal: string | number
  Nightmare: string | number
  keyUsed: string | number
}

export interface IHydraStatisticsData {
  id: string
  data: IHydraUserStatistic[]
}
