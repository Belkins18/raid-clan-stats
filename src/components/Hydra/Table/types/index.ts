import type { dataType } from '@/data'

type IData = dataType.IHydraUserStatistic

interface ITableRowData extends IData {
  id: string
  totalDamage: number
}

type DataType = ITableRowData

export type { DataType, IData }
