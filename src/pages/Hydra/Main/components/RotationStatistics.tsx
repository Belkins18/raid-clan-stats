import type { FC } from 'react'

import { Hydra } from '@/components'
import { dataType } from '@/data'
import type { BarConfig } from '@ant-design/charts'

const { parseNumber, formatLocalized } = Hydra.Utils

interface IRotationStatisticsProps {
  hydraStatisticData: dataType.IHydraStatisticsData
}

export const RotationStatistics: FC<IRotationStatisticsProps> = ({ hydraStatisticData }) => {
  const transformDataForChart = (
    inputData: dataType.IHydraStatisticsData
  ): Hydra.Chart.Types.IClanResultData[] => {
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
        let numericValue = parseNumber(rawValue)

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
    tooltip: {
      items: [
        (d: { value: number; name: string }) => {
          return formatLocalized(d.value)
        }
      ]
    },
    label: [
      {
        text: (item: { value: number }) => {
          return item.value > 250000000 ? formatLocalized(item.value) : ''
        },
        position: 'inside',
        style: { fill: '#000', fontWeight: 700, dx: 0 },
        transform: [{ type: 'overlapHide' }]
      }
    ]
  } as BarConfig

  return <Hydra.Chart.BarChart config={config} />
}
