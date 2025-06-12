/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react'

import { Tag } from 'antd'
import { Link } from 'react-router-dom'

import { Hydra } from '@/components'

type DataType = Hydra.Table.Types.DataType

/**
 * Hook for generating render functions for columns Ant Design Table.
 * @param getFieldValue
 */
export const useTableRenderers = (
  getFieldValue: (rowData: DataType, keys: Array<keyof DataType>) => any
) => {
  const { formatLocalized, parseNumber } = Hydra.Utils

  const renderName = useCallback(
    (_: any, record: DataType) => {
      const name = getFieldValue(record, ['name']) as string
      return <Link to={`${name}`}>{name}</Link>
    },
    [getFieldValue]
  )

  const renderNormalDamage = useCallback(
    (_: any, record: DataType) => {
      const damage = getFieldValue(record, ['Normal']) as string
      return damage ? <Tag color={'green'}>{formatLocalized(parseNumber(damage))}</Tag> : '-'
    },
    [getFieldValue]
  )

  const renderHardDamage = useCallback(
    (_: any, record: DataType) => {
      const damage = getFieldValue(record, ['Hard']) as string
      return damage ? <Tag color={'yellow'}>{formatLocalized(parseNumber(damage))}</Tag> : '-'
    },
    [getFieldValue]
  )

  const renderBrutalDamage = useCallback(
    (_: any, record: DataType) => {
      const damage = getFieldValue(record, ['Brutal']) as string
      return damage ? <Tag color={'orange'}>{formatLocalized(parseNumber(damage))}</Tag> : '-'
    },
    [getFieldValue]
  )

  const renderNightmareDamage = useCallback(
    (_: any, record: DataType) => {
      const damage = getFieldValue(record, ['Nightmare']) as string
      return damage ? <Tag color={'red'}>{formatLocalized(parseNumber(damage))}</Tag> : '-'
    },
    [getFieldValue]
  )

  const renderAllDamage = useCallback(
    (_: any, record: DataType) => {
      const calculateWeightedSum = (data: typeof record): number => {
        const normal = parseNumber(getFieldValue(data, ['Normal']) as string)
        const hard = parseNumber(getFieldValue(data, ['Hard']) as string)
        const brutal = parseNumber(getFieldValue(data, ['Brutal']) as string)
        const nightmare = parseNumber(getFieldValue(data, ['Nightmare']) as string)

        return normal * 1 + hard * 2 + brutal * 3 + nightmare * 4
      }

      const total = calculateWeightedSum(record)
      return <Tag color={'blue'}>{formatLocalized(total)}</Tag>
    },
    [getFieldValue]
  )

  const renderKeysUsed = useCallback(
    (_: any, record: DataType) => {
      const value = getFieldValue(record, ['keyUsed']) as string
      return <>{value}</>
    },
    [getFieldValue]
  )

  return {
    renderName,
    renderNormalDamage,
    renderHardDamage,
    renderBrutalDamage,
    renderNightmareDamage,
    renderAllDamage,
    renderKeysUsed
  }
}
