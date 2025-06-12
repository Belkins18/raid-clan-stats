import type { dataType } from '@/data'

type IData = dataType.IHydraUserStatistic

interface ITableRowData extends IData {
  id: string
}

type DataType = ITableRowData

export type { DataType, IData }
