import { type FC } from 'react'

import { Hydra } from '@/components'
import { dataType } from '@/data'
import { DualAxes } from '@ant-design/plots'

const { parseNumberSafe, formatLocalized, convertDateRangeToWeeks } = Hydra.Utils
const { hydraLevelsWithRate } = Hydra.Utils.constants

interface IAllTimeClanStatisticsProps {
  statisticsData: dataType.IHydraStatisticsData[]
}
export const AllTimeClanStatistics: FC<IAllTimeClanStatisticsProps> = ({ statisticsData }) => {
  const transformDataForChart = (
    inputData: dataType.IHydraStatisticsData[]
  ): Hydra.Chart.Types.IBasicData[] => {
    if (!inputData) return []

    return inputData.map((item) => {
      let normalDamage = 0
      let hardDamage = 0
      let brutalDamage = 0
      let nightmareDamage = 0

      item.data.forEach((userStat) => {
        hydraLevelsWithRate.forEach(({ label, rate }) => {
          const rawValue = userStat[label as keyof typeof userStat] || '0'
          const numericValue = parseNumberSafe(rawValue)

          switch (label) {
            case dataType.EHydraLevel.normal:
              normalDamage += numericValue * rate
              break
            case dataType.EHydraLevel.hard:
              hardDamage += numericValue * rate
              break
            case dataType.EHydraLevel.brutal:
              brutalDamage += numericValue * rate
              break
            case dataType.EHydraLevel.nightmare:
              nightmareDamage += numericValue * rate
              break
          }
        })
      })

      const totalDamage = normalDamage + hardDamage + brutalDamage + nightmareDamage
      const labelTotalDamage = formatLocalized(totalDamage)
      return {
        period: item.id,
        normalDamage,
        hardDamage,
        brutalDamage,
        nightmareDamage,
        totalDamage,
        labelTotalDamage
      }
    })
  }

  const levelDamageData: Hydra.Chart.Types.IDualAxesInterval[] = transformDataForChart(
    statisticsData
  ).flatMap((item) => [
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

  const totalDamageData: Hydra.Chart.Types.IDualAxesLine[] = transformDataForChart(
    statisticsData
  ).flatMap((item) => ({
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
          return item.value > 1000000000 ? formatLocalized(item.value) : ''
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
          return item.damage > 1000000000 ? formatLocalized(item.damage) : ''
        },
        style: { fill: '#000', fontSize: 13, fontWeight: 700, dx: -20, dy: -20 }
      }
    ],
    slider: { x: {} },
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
