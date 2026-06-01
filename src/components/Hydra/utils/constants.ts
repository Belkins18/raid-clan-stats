import { dataType } from '@/data'

export const hydraLevelsWithRate = [
  {
    label: dataType.EHydraLevel.normal,
    rate: 1,
    style: {
      fill: '#f6ffed',
      stroke: '#b7eb8f',
      text: '#389e0d',
      textDark: '#95d66b'
    }
  },
  {
    label: dataType.EHydraLevel.hard,
    rate: 2,
    style: {
      fill: '#feffe6',
      stroke: '#fffb8f',
      text: '#d4b106',
      textDark: '#e6d13d'
    }
  },
  {
    label: dataType.EHydraLevel.brutal,
    rate: 3,
    style: {
      fill: '#fff7e6',
      stroke: '#ffd591',
      text: '#d46b08',
      textDark: '#e68a2e'
    }
  },
  {
    label: dataType.EHydraLevel.nightmare,
    rate: 4,
    style: {
      fill: '#fff1f0',
      stroke: '#ffa39e',
      text: '#cf1322',
      textDark: '#e84756'
    }
  }
] as const

export const getHydraLevelStyle = (
  label: dataType.THydraLevel,
  isDark?: boolean
) => {
  const level = hydraLevelsWithRate.find((item) => item.label === label)
  if (!level) return { fill: '#fff', stroke: '#fff', text: '#fff' }

  return {
    fill: level.style.fill,
    stroke: level.style.stroke,
    text: isDark ? level.style.textDark : level.style.text
  }
}
