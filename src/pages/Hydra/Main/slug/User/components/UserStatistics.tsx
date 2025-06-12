import { type FC } from 'react'

import { Hydra } from '@/components'
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
        style: { fill: 'rgba(0,0,0,0.5)', fontWeight: 700, dx: 0 },
        layout: [
          { type: 'interval-adjust-position' },
          { type: 'interval-hide-overlap' },
          { type: 'adjust-color' },
          { type: 'overlapHide' }
        ]
      },
      {
        position: 'outside',
        text: (item: { damage: number }) => {
          return item.damage > 100000000 ? formatLocalized(item.damage) : ''
        },
        style: { fill: '#000', fontSize: 13, fontWeight: 700, dx: -20, dy: -20 }
      }
    ],

    children: [
      {
        data: levelDamageData,
        type: 'interval',
        yField: 'value',
        colorField: 'type',
        tooltip: {
          items: [
            (datum: Hydra.Chart.Types.IDualAxesInterval) => {
              return formatLocalized(datum.value)
            }
          ]
        },
        style: { maxWidth: 80 }
        // scrollbar: {
        // 	x: {
        // 		trackSize: 10,
        // 	},
        // },
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
