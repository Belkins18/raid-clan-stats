import { dataType } from '@/data'

export const hydraLevelsWithRate = [
  { label: dataType.EHydraLevel.normal, rate: 1 },
  { label: dataType.EHydraLevel.hard, rate: 2 },
  { label: dataType.EHydraLevel.brutal, rate: 3 },
  { label: dataType.EHydraLevel.nightmare, rate: 4 }
] as const
