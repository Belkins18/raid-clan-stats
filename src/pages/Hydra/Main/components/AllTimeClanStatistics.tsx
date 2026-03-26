import { type FC } from 'react'

import { hydraLevelsWithRate } from '@/components/Hydra/utils/constants'
import { useHydraStatistics } from '@/hooks/useHydraStatistics'
import { useThemeStore } from '@/store'
import { DualAxes } from '@ant-design/plots'
import { formatLocalized, convertDateRangeToWeeks, getBaseDualAxesConfig } from '@/components/Hydra/utils'
import type { IDualAxesInterval, IDualAxesLine } from '@/components/Hydra/Chart/types'

export const AllTimeClanStatistics: FC = () => {
  const mode = useThemeStore((state) => state.mode)
  const isDark = mode === 'dark'

  const { computedData } = useHydraStatistics({})

  const levelDamageData: IDualAxesInterval[] = []
  const totalDamageData: IDualAxesLine[] = []

  computedData.forEach(({ dualAxesData }) => {
    levelDamageData.push(...dualAxesData.levelDamage)
    totalDamageData.push(dualAxesData.totalDamage)
  })

  const config = {
    ...getBaseDualAxesConfig({
      isDark,
      labelFormatterX: (e: string) => `${convertDateRangeToWeeks(e)}`
    }),
    labels: [
      {
        position: 'inside',
        text: (item: { value: number }) => {
          return item.value > 1000000000 ? formatLocalized(item.value) : ''
        },
        style: {
          fill: (d: IDualAxesInterval) => hydraLevelsWithRate.find((item) => item.label === d.type)?.style.text,
          fontWeight: 700,
          dx: 0
        },
        layout: [{ type: 'interval-adjust-position' }, { type: 'interval-hide-overlap' }, { type: 'adjust-color' }, { type: 'overlapHide' }]
      },
      {
        position: 'outside',
        text: (item: { damage: number }) => {
          return item.damage > 1000000000 ? formatLocalized(item.damage) : ''
        },
        style: { fontSize: 13, fontWeight: 700, dx: -20, dy: -20 }
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
        colorField: (d: IDualAxesInterval) => {
          return hydraLevelsWithRate.find((item) => item.label === d.type)?.label
        },
        tooltip: {
          items: [
            (d: IDualAxesInterval) => {
              return {
                color: hydraLevelsWithRate.find((item) => item.label === d.type)?.style.text,
                value: formatLocalized(d.value)
              }
            }
          ]
        },
        style: {
          maxWidth: 80,
          stroke: (d: IDualAxesInterval) => {
            return hydraLevelsWithRate.find((item) => item.label === d.type)?.style.text ?? '#000'
          },
          strokeWidth: 1,
          fill: (d: IDualAxesInterval) => {
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
