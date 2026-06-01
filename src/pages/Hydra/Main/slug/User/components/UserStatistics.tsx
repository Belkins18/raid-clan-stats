import { type FC, useEffect, useState } from 'react'

import { Skeleton } from 'antd'
import { hydraLevelsWithRate } from '@/components/Hydra/utils/constants'
import {
  formatLocalized,
  convertDateRangeToWeeks,
  getBaseDualAxesConfig,
  getLastItemsSliderValues,
  getResponsiveVisibleItemsCount
} from '@/components/Hydra/utils'
import { Hydra } from '@/components'
import { dataType } from '@/data'
import { useElementWidth } from '@/hooks'
import { useThemeStore } from '@/store'
import { DualAxes } from '@ant-design/plots'
import type {
  IDualAxesInterval,
  IDualAxesLine
} from '@/components/Hydra/Chart/types'

interface IUserStatisticsProps {
  statisticsData: dataType.IHydraStatisticsData[]
  checked: boolean
}

export const UserStatistics: FC<IUserStatisticsProps> = ({
  statisticsData,
  checked
}) => {
  const mode = useThemeStore((state) => state.mode)
  const isDark = mode === 'dark'
  const [isSliderReady, setIsSliderReady] = useState(false)
  const [chartWrapperRef, chartWidth] = useElementWidth<HTMLDivElement>()

  const transformData = Hydra.Chart.Utils.transformData(statisticsData, checked)
  const visibleItemsCount = getResponsiveVisibleItemsCount(chartWidth)

  const levelDamageData: IDualAxesInterval[] = transformData.flatMap(
    (item: {
      period: string
      normalDamage: number
      hardDamage: number
      brutalDamage: number
      nightmareDamage: number
      totalDamage: number
      labelTotalDamage: string
    }) => [
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
    ]
  )

  const totalDamageData: IDualAxesLine[] = transformData.flatMap(
    (item: {
      period: string
      totalDamage: number
      labelTotalDamage: string
    }) => ({
      period: item.period,
      damage: item.totalDamage,
      label: item.labelTotalDamage
    })
  )

  useEffect(() => {
    setIsSliderReady(false)

    const frameId = window.requestAnimationFrame(() => {
      setIsSliderReady(true)
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [totalDamageData.length, checked, visibleItemsCount, mode])

  const config = {
    ...getBaseDualAxesConfig({
      isDark,
      labelFormatterX: (e: string) => `${convertDateRangeToWeeks(e)}`
    }),
    stack: true,
    labels: [
      {
        position: 'inside',
        text: (item: { value: number }) => {
          return item.value > 100000000 ? formatLocalized(item.value) : ''
        },
        style: {
          fill: (d: IDualAxesInterval) =>
            hydraLevelsWithRate.find((item) => item.label === d.type)?.style
              .text,
          fontWeight: 700,
          dx: 0
        },
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
        style: { fontSize: 13, fontWeight: 700, dx: -20, dy: -20 }
      }
    ],
    legend: {
      color: {
        itemMarker: 'rect',
        itemMarkerFill: (d: { label: string }) => {
          if (hydraLevelsWithRate.find((item) => item.label === d.label)) {
            return (
              hydraLevelsWithRate.find((item) => item.label === d.label)?.style
                .text ?? '#000'
            )
          }
        }
      }
    },
    slider: {
      x: {
        ...(isSliderReady && {
          values: getLastItemsSliderValues(
            totalDamageData.length,
            visibleItemsCount
          )
        }),
        labelFormatter: (d: string) => convertDateRangeToWeeks(d)
      }
    },
    children: [
      {
        data: levelDamageData,
        type: 'interval',
        xField: 'period',
        yField: 'value',
        colorField: 'type',
        tooltip: {
          items: [
            (d: IDualAxesInterval) => {
              return {
                color: hydraLevelsWithRate.find((item) => item.label === d.type)
                  ?.style.text,
                value: formatLocalized(d.value)
              }
            }
          ]
        },
        style: {
          maxWidth: 80,
          stroke: (d: IDualAxesInterval) => {
            return (
              hydraLevelsWithRate.find((item) => item.label === d.type)?.style
                .text ?? '#000'
            )
          },
          strokeWidth: 1,
          fill: (d: IDualAxesInterval) => {
            return (
              hydraLevelsWithRate.find((item) => item.label === d.type)?.style
                .stroke ?? '#000'
            )
          },
          shadowColor: '#fff'
        }
      },
      {
        data: totalDamageData,
        type: 'line',
        xField: 'period',
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

  return (
    <div ref={chartWrapperRef}>
      {!isSliderReady ? (
        <Skeleton.Node active style={{ width: '100%', height: 600 }} />
      ) : (
        <DualAxes
          key={`${totalDamageData.length}-${checked}-${visibleItemsCount}-${mode}-${isSliderReady}`}
          {...config}
        />
      )}
    </div>
  )
}
