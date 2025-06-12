/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FC, useCallback, useMemo } from 'react'

import { Table as AntdTable, type TableColumnsType } from 'antd'
import { type ResizableColumnsType, useAntdResizableHeader } from 'use-antd-resizable-header'

import { Hydra } from '@/components'
import type { dataType } from '@/data'
import { withAntTheme } from '@/hocs'

interface IHydraTableComponent {
  statisticData: dataType.IHydraStatisticsData
}

export const HydraTableComponent: FC<IHydraTableComponent> = ({ statisticData }) => {
  const { useTableData, useTableRenderers } = Hydra.Table.Hooks

  const { data = [], loading } = useTableData(statisticData.data)

  const getFieldValue = useCallback(
    (rowData: Hydra.Table.Types.DataType, keys: Array<keyof Hydra.Table.Types.DataType>) => {
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

  const columns: ResizableColumnsType<TableColumnsType<Hydra.Table.Types.DataType>> = useMemo(
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
        render: renderNormalDamage
      },
      {
        title: 'Hard',
        render: renderHardDamage
      },
      {
        title: 'Brutal',
        render: renderBrutalDamage
      },
      {
        title: 'Nightmare',
        render: renderNightmareDamage
      },
      {
        title: 'Damage',
        render: renderAllDamage,
        fixed: 'right'
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
