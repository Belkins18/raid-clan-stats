import { useEffect, useState } from 'react'

import { v4 } from 'uuid'

import type { Hydra } from '@/components'
import type { dataType } from '@/data'

export const useTableData = (insideData: dataType.IHydraUserStatistic[]) => {
  const [data, setData] = useState<Hydra.Table.Types.DataType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setData([...insideData.map((item) => ({ id: v4(), ...item }))])
    setLoading(false)
  }, [insideData])
  return { data, loading }
}
