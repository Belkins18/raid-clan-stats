import type { Hydra } from '@/components'
import { EHydraLevel, type THydraLevel } from '@/data/types'
import { useThemeStore } from '@/store'
import { Liquid, Radar } from '@ant-design/plots'

import { formatLocalized, parseNumberSafe, percentFromRounded } from '../utils'

import './expandedRow.css'

type DataType = Hydra.Table.Types.DataType

interface IExpandedRow {
  record: DataType
  clanRotationDamage: number
}

export const ExpandedRow = ({ record, clanRotationDamage }: IExpandedRow) => {
  return (
    <div className="row">
      <div className="row-item">
        <RadarChart record={record} />
      </div>
      <div className="row-item">
        <LiquidChart record={record} clanRotationDamage={clanRotationDamage} />
      </div>
    </div>
  )
}

const RadarChart = ({ record }: Pick<IExpandedRow, 'record'>) => {
  const mode = useThemeStore((state) => state.mode)
  const isDark = mode === 'dark'

  const transformData = (record: DataType, type: 'Pure Damage' | 'With Koef', withRate?: boolean) => {
    const levels: THydraLevel[] = Object.values(EHydraLevel)
    const hydraLevelsWithRate = {
      [EHydraLevel.normal]: 1,
      [EHydraLevel.hard]: 2,
      [EHydraLevel.brutal]: 3,
      [EHydraLevel.nightmare]: 4
    }

    return levels.map((level) => {
      const score = withRate ? parseNumberSafe(record[level]) * hydraLevelsWithRate[level] : (record[level] ?? 0)
      return {
        item: level,
        type,
        score
      }
    })
  }

  const pData = transformData(record, 'Pure Damage')
  const kData = transformData(record, 'With Koef', true)

  const config = {
    theme: isDark ? 'classicDark' : 'classic',
    data: [...pData, ...kData],
    xField: 'item',
    yField: 'score',
    colorField: 'type',
    axis: {
      x: {
        zIndex: 2,
        grid: true,
        gridLineWidth: 2,
        tick: true,
        gridLineDash: [0, 0]
      },
      y: {
        title: false,
        gridLineWidth: 2,
        gridLineDash: [0, 0],
        labelFormatter: (e: number) => `${formatLocalized(e)}`,
        gridAreaFill: (_dataum: unknown, index: number) => {
          return index % 2 === 1 ? 'rgba(0, 0, 0, 0.04)' : ''
        }
      }
    },

    tooltip: {
      items: [
        (d: { item: THydraLevel; type: 'Pure Damage' | 'With Koef'; score: number }) => {
          return {
            value: formatLocalized(d.score)
          }
        }
      ]
    },
    point: {
      shapeField: 'point',
      sizeField: 3
    },
    scale: { x: { padding: 0.5, align: 0 } },
    style: {
      lineWidth: 2
    }
  }
  return <Radar {...config} />
}

const LiquidChart = ({ record, clanRotationDamage }: IExpandedRow) => {
  const percent = percentFromRounded(record.totalDamage, clanRotationDamage) / 100
  const config = {
    percent,
    style: {
      backgroundFill: 'pink'
    }
  }
  return <Liquid {...config} />
}
