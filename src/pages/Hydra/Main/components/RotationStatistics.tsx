import type { FC } from 'react'

import { Hydra } from '@/components'
import { getHydraLevelStyle, hydraLevelsWithRate } from '@/components/Hydra/utils/constants'
import { dataType } from '@/data'
import { useThemeStore } from '@/store'
import type { BarConfig } from '@ant-design/charts'

const { parseNumberSafe, formatLocalized } = Hydra.Utils

interface IRotationStatisticsProps {
  hydraStatisticData: dataType.IHydraStatisticsData
}

export const RotationStatistics: FC<IRotationStatisticsProps> = ({ hydraStatisticData }) => {
  const mode = useThemeStore((state) => state.mode)
  const isDark = mode === 'dark'

  const transformDataForChart = (inputData: dataType.IHydraStatisticsData): Hydra.Chart.Types.IClanResultData[] => {
    if (!inputData) return []

    const hydraLevelsWithRate = [
      { label: dataType.EHydraLevel.normal, rate: 1 },
      { label: dataType.EHydraLevel.hard, rate: 2 },
      { label: dataType.EHydraLevel.brutal, rate: 3 },
      { label: dataType.EHydraLevel.nightmare, rate: 4 }
    ] as const

    const result: Hydra.Chart.Types.IClanResultData[] = []

    inputData.data.forEach((item) => {
      const name = item.name

      hydraLevelsWithRate.forEach(({ label, rate }) => {
        const rawValue = item[label as keyof typeof item] || '0'
        let numericValue = parseNumberSafe(rawValue)

        numericValue *= rate

        result.push({
          name,
          value: numericValue,
          category: label
        })
      })
    })

    return result
  }

  const data = transformDataForChart(hydraStatisticData)
  const config = {
    theme: isDark ? 'classicDark' : 'classic',
    data,
    xField: 'name',
    yField: 'value',
    colorField: 'category',
    height: 700,
    stack: true,
    sort: {
      reverse: true,
      by: 'y'
    },
    axis: {
      y: {
        grid: true,
        gridLineWidth: 1,
        labelFormatter: (e: number) => `${formatLocalized(e)}`
      },
      x: {
        labelSpacing: 10,

        grid: true,
        gridLineWidth: 1,

        style: {
          labelTransform: 'rotate(0)'
        }
      }
    },

    style: {
      stroke: (d: Hydra.Chart.Types.IClanResultData) => {
        return hydraLevelsWithRate.find((item) => item.label === d.category)?.style.stroke ?? '#fff'
      },
      strokeWidth: 10,
      fill: (d: Hydra.Chart.Types.IClanResultData) => {
        return hydraLevelsWithRate.find((item) => item.label === d.category)?.style.stroke ?? '#fff'
      }
    },
    tooltip: {
      items: [
        (d: Hydra.Chart.Types.IClanResultData) => {
          return {
            color: getHydraLevelStyle(d.category as dataType.THydraLevel).text,
            value: formatLocalized(d.value)
          }
        }
      ]
    },
    label: [
      {
        text: (item: { value: number }) => {
          return formatLocalized(item.value)
        },
        position: 'inside',
        style: {
          fill: (d: Hydra.Chart.Types.IClanResultData) => {
            return getHydraLevelStyle(d.category as dataType.THydraLevel).text
          },
          fontWeight: 700,
          dx: 0
        },
        transform: [{ type: 'overlapHide' }, { type: 'overflowHide' }]
      }
    ],
    legend: {
      color: {
        itemMarker: 'rect',
        itemMarkerFill: (d: { label: string }) => {
          const level = hydraLevelsWithRate.find((item) => item.label === d.label)

          if (level) {
            return isDark ? level.style.textDark : level.style.text
          }
        }
        // itemLabelFill: (d: { label: string }) => {
        //   const level = hydraLevelsWithRate.find((item) => item.label === d.label)
        //   if (level) {
        //     return isDark ? level.style.textDark : level.style.text
        //   }
        // }
      }
    },
    slider: {
      x: {},
      y: {
        labelFormatter: (d: number) => {
          return formatLocalized(d)
        }
      }
    }
  } as BarConfig

  return <Hydra.Chart.BarChart config={config} />
}
