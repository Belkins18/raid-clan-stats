import type { FC } from 'react'

import { Hydra } from '@/components'
import { getHydraLevelStyle, hydraLevelsWithRate } from '@/components/Hydra/utils/constants'
import { dataType } from '@/data'
import { useHydraStatistics } from '@/hooks/useHydraStatistics'
import { useThemeStore } from '@/store'
import type { BarConfig } from '@ant-design/charts'
import { formatLocalized } from '@/components/Hydra/utils'
import type { IClanResultData } from '@/components/Hydra/Chart/types'

interface IRotationStatisticsProps {
  rotationId: string
}

export const RotationStatistics: FC<IRotationStatisticsProps> = ({ rotationId }) => {
  const mode = useThemeStore((state) => state.mode)
  const isDark = mode === 'dark'

  const { computedData } = useHydraStatistics({})

  const rotationData = computedData.find((d) => d.rotation.id === rotationId)
  const data = rotationData?.columnData ?? []

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
      stroke: (d: IClanResultData) => {
        return hydraLevelsWithRate.find((item) => item.label === d.category)?.style.stroke ?? '#fff'
      },
      strokeWidth: 10,
      fill: (d: IClanResultData) => {
        return hydraLevelsWithRate.find((item) => item.label === d.category)?.style.stroke ?? '#fff'
      }
    },
    tooltip: {
      items: [
        (d: IClanResultData) => {
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
          fill: (d: IClanResultData) => {
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
