/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react'

import { Tag } from 'antd'
import { Link } from 'react-router-dom'

import { Hydra } from '@/components'
import { EHydraLevel } from '@/data/types'

import { useRenderKeysUsed } from './utils'

type DataType = Hydra.Table.Types.DataType

/**
 * Hook for generating render functions for columns Ant Design Table.
 * @param getFieldValue
 */
export const useTableRenderers = (getFieldValue: <K extends keyof DataType>(rowData: DataType, keys: K[]) => DataType[K] | undefined) => {
  const { formatLocalized, parseNumberSafe } = Hydra.Utils

  const renderName = useCallback(
    (_: any, record: DataType) => {
      const name = getFieldValue(record, ['name'])
      return <Link to={`${name}`}>{name}</Link>
    },
    [getFieldValue]
  )

  const renderNormalDamage = useCallback(
    (_: any, record: DataType) => {
      const rawValue = getFieldValue(record, [EHydraLevel.normal])
      const damage = parseNumberSafe(rawValue)
      return damage > 0 ? <Tag color="green">{formatLocalized(damage)}</Tag> : '-'
    },
    [getFieldValue]
  )

  const renderHardDamage = useCallback(
    (_: any, record: DataType) => {
      const rawValue = getFieldValue(record, [EHydraLevel.hard])
      const damage = parseNumberSafe(rawValue)
      return damage > 0 ? <Tag color="yellow">{formatLocalized(damage)}</Tag> : '-'
    },
    [getFieldValue]
  )

  const renderBrutalDamage = useCallback(
    (_: any, record: DataType) => {
      const rawValue = getFieldValue(record, [EHydraLevel.brutal])
      const damage = parseNumberSafe(rawValue)
      return damage > 0 ? <Tag color="orange">{formatLocalized(damage)}</Tag> : '-'
    },
    [getFieldValue]
  )

  const renderNightmareDamage = useCallback(
    (_: any, record: DataType) => {
      const rawValue = getFieldValue(record, [EHydraLevel.nightmare])
      const damage = parseNumberSafe(rawValue)
      return damage > 0 ? <Tag color="red">{formatLocalized(damage)}</Tag> : '-'
    },
    [getFieldValue]
  )

  const renderAllDamage = useCallback(
    (_: any, record: DataType) => {
      return <Tag color={'blue'}>{formatLocalized(record.totalDamage)}</Tag>
    },
    [getFieldValue]
  )

  const renderKeysUsed = useRenderKeysUsed(getFieldValue)

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
