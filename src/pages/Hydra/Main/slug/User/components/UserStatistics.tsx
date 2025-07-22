import { type FC } from 'react'

import { Hydra } from '@/components'
import { hydraLevelsWithRate } from '@/components/Hydra/utils/constants'
import { dataType } from '@/data'
import { DualAxes } from '@ant-design/plots'

const { formatLocalized, convertDateRangeToWeeks } = Hydra.Utils

interface IUserStatisticsProps {
  statisticsData: dataType.IHydraStatisticsData[]
  checked: boolean
}
export const UserStatistics: FC<IUserStatisticsProps> = ({ statisticsData, checked }) => {
  const transformData = Hydra.Chart.Utils.transformData(statisticsData, checked)

  const levelDamageData: Hydra.Chart.Types.IDualAxesInterval[] = transformData.flatMap((item) => [
    {
      period: item.period,
      type: dataType.EHydraLevel.normal,
      value: item.normalDamage
    },
    {
      period: item.period,
      type: dataType.EHydraLevel.hard,
      value: item.hardDamage
    },
    {
      period: item.period,
      type: dataType.EHydraLevel.brutal,
      value: item.brutalDamage
    },
    {
      period: item.period,
      type: dataType.EHydraLevel.nightmare,
      value: item.nightmareDamage
    }
  ])

  const totalDamageData: Hydra.Chart.Types.IDualAxesLine[] = transformData.flatMap((item) => ({
    period: item.period,
    damage: item.totalDamage,
    label: item.labelTotalDamage
  }))

  const config = {
    xField: 'period',
    axis: {
      y: {
        grid: true,
        gridLineWidth: 2,
        titleSpacing: 30,

        labelFormatter: (e: number) => `${formatLocalized(e)}`
      },
      x: {
        grid: true,
        gridLineWidth: 1,
        labelFormatter: (e: string) => `${convertDateRangeToWeeks(e)}`
      }
    },
    stack: true,
    labels: [
      {
        position: 'inside',
        text: (item: { value: number }) => {
          return item.value > 100000000 ? formatLocalized(item.value) : ''
        },
        style: {
          fill: (d: Hydra.Chart.Types.IDualAxesInterval) => hydraLevelsWithRate.find((item) => item.label === d.type)?.style.text,
          fontWeight: 700,
          dx: 0
        },
        layout: [{ type: 'interval-adjust-position' }, { type: 'interval-hide-overlap' }, { type: 'adjust-color' }, { type: 'overlapHide' }]
      },
      {
        position: 'outside',
        text: (item: { damage: number }) => {
          return item.damage > 100000000 ? formatLocalized(item.damage) : ''
        },
        style: { fill: '#000', fontSize: 13, fontWeight: 700, dx: -20, dy: -20 }
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
      x: {
        labelFormatter: (d: string) => convertDateRangeToWeeks(d)
      }
    },
    children: [
      {
        data: levelDamageData,
        type: 'interval',
        yField: 'value',
        colorField: 'type',
        tooltip: {
          items: [
            (d: Hydra.Chart.Types.IDualAxesInterval) => {
              return {
                color: hydraLevelsWithRate.find((item) => item.label === d.type)?.style.text,
                value: formatLocalized(d.value)
              }
            }
          ]
        },
        style: {
          maxWidth: 80,
          stroke: (d: Hydra.Chart.Types.IDualAxesInterval) => {
            return hydraLevelsWithRate.find((item) => item.label === d.type)?.style.text ?? '#000'
          },
          strokeWidth: 1,
          fill: (d: Hydra.Chart.Types.IDualAxesInterval) => {
            return hydraLevelsWithRate.find((item) => item.label === d.type)?.style.stroke ?? '#000'
          },
          shadowColor: '#fff'
        }
      },
      {
        data: totalDamageData,
        type: 'line',
        yField: 'damage',
        colorField: () => 'Total Damage',
        style: { lineWidth: 6 },
        axis: { y: { position: 'right' } },
        tooltip: {
          items: [
            (datum: { damage: number }) => {
              return formatLocalized(datum.damage)
            }
          ]
        }
      }
    ]
  }

  return <DualAxes {...config} />
}
