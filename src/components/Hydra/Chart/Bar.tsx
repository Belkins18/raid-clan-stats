import type { FC } from 'react'

import { Bar, type BarConfig } from '@ant-design/plots'

interface IHydraColumnChartProps {
  config: BarConfig
}

export const HydraBarChart: FC<IHydraColumnChartProps> = ({ config }) => {
  return <Bar {...config} />
}
