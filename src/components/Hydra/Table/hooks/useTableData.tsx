import { useEffect, useState } from 'react'

import { v4 } from 'uuid'

import { Hydra } from '@/components'
import type { dataType } from '@/data'

export const useTableData = (insideData: dataType.IHydraUserStatistic[]) => {
  const [data, setData] = useState<Hydra.Table.Types.DataType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const { parseNumberSafe } = Hydra.Utils
  const { hydraLevelsWithRate } = Hydra.Utils.constants

  useEffect(() => {
    setData(
      [...insideData]
        .map((item) => {
          const totalDamage = hydraLevelsWithRate.reduce((sum, { label, rate }) => {
            const damageByLevel = parseNumberSafe(item[label]) * rate
            sum += damageByLevel
            return sum
          }, 0)

          return { id: v4(), ...item, totalDamage }
        })
        .sort((a, b) => b.totalDamage - a.totalDamage)
    )
    setLoading(false)
  }, [insideData])

  return { data, loading }
}
