/* eslint-disable no-misleading-character-class */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react'

import { Hydra } from '@/components'

type DataType = Hydra.Table.Types.DataType

export const useRenderKeysUsed = (
  getFieldValue: <K extends keyof DataType>(rowData: DataType, keys: K[]) => DataType[K] | undefined
) => {
  return useCallback(
    (_: any, record: DataType) => {
      const raw = getFieldValue(record, ['keyUsed'])

      const renderByCount = (count: number): string => {
        const safe = Math.max(0, Math.min(3, count))
        return '✅'.repeat(safe) + '⭕️'.repeat(3 - safe)
      }

      if (raw === null || raw === undefined || raw === '') {
        return <>❌❌❌</>
      }

      if (typeof raw === 'string' && /[✅⭕️❌]/.test(raw)) {
        return <>{raw}</>
      }

      const parsed = typeof raw === 'number' ? raw : parseInt(String(raw), 10)

      if (!isNaN(parsed)) {
        return <>{renderByCount(parsed)}</>
      }

      return <>❌❌❌</>
    },
    [getFieldValue]
  )
}
