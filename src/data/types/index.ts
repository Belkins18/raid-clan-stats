export const EHydraLevel = {
  normal: 'Normal',
  hard: 'Hard',
  brutal: 'Brutal',
  nightmare: 'Nightmare'
} as const

export type THydraLevel = (typeof EHydraLevel)[keyof typeof EHydraLevel]

export interface IHydraUserStatistic {
  name: string
  Normal: string
  Hard: string
  Brutal: string
  Nightmare: string
  damage: string
  keyUsed: string
}

export interface IHydraStatisticsData {
  id: string
  data: IHydraUserStatistic[]
}
