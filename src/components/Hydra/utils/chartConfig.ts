import { hydraLevelsWithRate } from './constants'
import { formatLocalized } from './formatLocalized'

interface BaseDualAxesConfigOptions {
  isDark: boolean
  height?: number
  xField?: string
  labelFormatterX?: (value: string) => string
  gridLineWidth?: number
}

export const getBaseDualAxesConfig = ({
  isDark,
  height = 600,
  xField = 'period',
  labelFormatterX,
  gridLineWidth = 2
}: BaseDualAxesConfigOptions) => {
  return {
    theme: isDark ? 'classicDark' : ('classic' as const),
    xField,
    height,
    axis: {
      y: {
        grid: true,
        gridLineWidth,
        labelFormatter: (e: number) => `${formatLocalized(e)}`
      },
      x: {
        grid: true,
        gridLineWidth: 1,
        labelFormatter: labelFormatterX
      }
    },
    stack: true,
    legend: {
      color: {
        itemMarker: 'rect',
        itemMarkerFill: (d: { label: string }) => {
          return hydraLevelsWithRate.find((item) => item.label === d.label)?.style.text ?? '#000'
        }
      }
    },
    slider: {
      x: {
        labelFormatter: labelFormatterX
      }
    }
  }
}
