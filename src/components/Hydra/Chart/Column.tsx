import type { FC } from 'react'

import { Column, type ColumnConfig } from '@ant-design/plots'

interface IHydraColumnChartProps {
  config: ColumnConfig
}

export const HydraColumnChart: FC<IHydraColumnChartProps> = ({ config }) => {
  return <Column {...config} />
}
