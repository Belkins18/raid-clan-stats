/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FC, useCallback, useMemo } from 'react'

import { Table as AntdTable, type TableColumnsType } from 'antd'
import { type ResizableColumnsType, useAntdResizableHeader } from 'use-antd-resizable-header'

import { Hydra } from '@/components'
import type { dataType } from '@/data'
import { withAntTheme } from '@/hocs'

type DataType = Hydra.Table.Types.DataType
interface IHydraTableComponent {
  statisticData: dataType.IHydraStatisticsData
}

export const HydraTableComponent: FC<IHydraTableComponent> = ({ statisticData }) => {
  const { useTableData, useTableRenderers } = Hydra.Table.Hooks

  const { data = [], loading } = useTableData(statisticData.data)

  const { parseNumberSafe } = Hydra.Utils

  const getFieldValue = useCallback(
    <K extends keyof DataType>(rowData: DataType, keys: K[]): DataType[K] | undefined => {
      for (const key of keys) {
        const value = rowData[key]
        if (value !== undefined) return value
      }
      return undefined
    },
    []
  )

  const {
    renderName,
    renderNormalDamage,
    renderHardDamage,
    renderBrutalDamage,
    renderNightmareDamage,
    renderAllDamage,
    renderKeysUsed
  } = useTableRenderers(getFieldValue)

  const columns: ResizableColumnsType<TableColumnsType<DataType>> = useMemo(
    () => [
      {
        title: 'Name',
        render: renderName,
        minConstraints: 100,
        width: 120,
        fixed: 'left'
      },
      {
        title: 'Normal',
        render: renderNormalDamage,
        sorter: (a, b) => parseNumberSafe(a.Normal) - parseNumberSafe(b.Normal)
      },
      {
        title: 'Hard',
        render: renderHardDamage,
        sorter: (a, b) => parseNumberSafe(a.Hard) - parseNumberSafe(b.Hard)
      },
      {
        title: 'Brutal',
        render: renderBrutalDamage,
        sorter: (a, b) => parseNumberSafe(a.Brutal) - parseNumberSafe(b.Brutal)
      },
      {
        title: 'Nightmare',
        render: renderNightmareDamage,
        sorter: (a, b) => parseNumberSafe(a.Nightmare) - parseNumberSafe(b.Nightmare)
      },
      {
        title: 'Damage',
        render: renderAllDamage,
        fixed: 'right',
        sorter: (a, b) => a.totalDamage! - b.totalDamage!,
        defaultSortOrder: 'descend'
      },
      {
        title: 'Activity',
        render: renderKeysUsed
      }
    ],
    [
      renderName,
      renderNormalDamage,
      renderHardDamage,
      renderBrutalDamage,
      renderNightmareDamage,
      renderAllDamage,
      renderKeysUsed
    ]
  )

  const { components, resizableColumns, tableWidth } = useAntdResizableHeader({
    columns,
    columnsState: {
      persistenceKey: 'table-hydra',
      persistenceType: 'localStorage'
    }
  })

  return (
    <AntdTable
      rowKey="id"
      columns={resizableColumns}
      components={components}
      dataSource={data}
      sticky
      loading={loading}
      scroll={{ x: tableWidth }}
    />
  )
}

export const Table = withAntTheme(HydraTableComponent)
