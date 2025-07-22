import type { FC } from 'react'

import { Hydra } from '@/components'
import { hydraLevelsWithRate } from '@/components/Hydra/utils/constants'
import { dataType } from '@/data'
import type { BarConfig } from '@ant-design/charts'

const { parseNumberSafe, formatLocalized } = Hydra.Utils

interface IRotationStatisticsProps {
  hydraStatisticData: dataType.IHydraStatisticsData
}

export const RotationStatistics: FC<IRotationStatisticsProps> = ({ hydraStatisticData }) => {
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
    data,
    xField: 'name',
    yField: 'value',
    colorField: 'category',
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
        console.log(d)
        return hydraLevelsWithRate.find((item) => item.label === d.category)?.style.text ?? '#000'
      },
      strokeWidth: 10,
      fill: (d: Hydra.Chart.Types.IClanResultData) => {
        return hydraLevelsWithRate.find((item) => item.label === d.category)?.style.stroke ?? '#000'
      },
      shadowColor: '#fff'
    },
    tooltip: {
      items: [
        (d: Hydra.Chart.Types.IClanResultData) => {
          return {
            color: hydraLevelsWithRate.find((item) => item.label === d.category)?.style.text,
            value: formatLocalized(d.value)
          }
        }
      ]
    },
    label: [
      {
        text: (item: { value: number }) => {
          // return item.value > 150000000 ? formatLocalized(item.value) : ''
          return formatLocalized(item.value)
        },
        position: 'inside',
        style: {
          fill: (d: Hydra.Chart.Types.IClanResultData) => {
            return hydraLevelsWithRate.find((item) => item.label === d.category)?.style.text ?? '#000'
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
          if (hydraLevelsWithRate.find((item) => item.label === d.label)) {
            return hydraLevelsWithRate.find((item) => item.label === d.label)?.style.text ?? '#000'
          }
        }
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
