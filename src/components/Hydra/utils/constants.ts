import { dataType } from '@/data'

export const hydraLevelsWithRate = [
  {
    label: dataType.EHydraLevel.normal,
    rate: 1,
    style: {
      fill: '#f6ffed',
      stroke: '#b7eb8f',
      text: '#389e0d'
    }
  },
  {
    label: dataType.EHydraLevel.hard,
    rate: 2,
    style: {
      fill: '#feffe6',
      stroke: '#fffb8f',
      text: '#d4b106'
    }
  },
  {
    label: dataType.EHydraLevel.brutal,
    rate: 3,
    style: {
      fill: '#fff7e6',
      stroke: '#ffd591',
      text: '#d46b08'
    }
  },
  {
    label: dataType.EHydraLevel.nightmare,
    rate: 4,
    style: {
      fill: '#fff1f0',
      stroke: '#ffa39e',
      text: '#cf1322'
    }
  }
] as const
