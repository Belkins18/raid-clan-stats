import type { dataType } from '@/data'

// export interface IChartData {
//   period: string
//   value: number
//   category: dataType.THydraLevel
// }

export interface IBasicData {
  period: string
  normalDamage: number
  hardDamage: number
  brutalDamage: number
  nightmareDamage: number
  totalDamage: number
  labelTotalDamage: string
}

export interface IDualAxesInterval {
  period: string
  type: dataType.THydraLevel
  value: number
}

export interface IDualAxesLine {
  period: string
  label: string
  damage: number
}

// export interface IClanAllTimeChartData {
//   period: string
//   value: number
// 	damage?: string
//   category: dataType.THydraLevel
// }

export interface IClanResultData {
  name: string
  value: number
  category: dataType.THydraLevel
}
