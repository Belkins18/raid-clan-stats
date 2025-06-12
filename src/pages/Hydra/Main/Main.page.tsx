import { useEffect, useState } from 'react'

import { Card, Flex, Select, Typography } from 'antd'

import { Hydra } from '@/components'
import { dataType, hydraStatisticsData } from '@/data'
import { useHydraStore } from '@/store/hydra.store'
import { AllTimeClanStatistics, RotationStatistics } from './components'

const { Text } = Typography

export const Layout = () => {
  const period = useHydraStore((state) => state.period)
  const changePeriod = useHydraStore((state) => state.changePeriod)

  const [hydraTableData, setHydraTableData] = useState<dataType.IHydraStatisticsData>()

  const handleChange = (value: string) => {
    changePeriod(value)
  }

  useEffect(() => {
    const dataById = hydraStatisticsData.find((item) => item.id === period)

    setHydraTableData(dataById)
  }, [period])

  return (
    <Flex gap="middle" vertical>
      <Card size="small" title="[BiБP] Hydra Statistics:">
        <Text>Select hydra rotation period:</Text>
        <Select
          defaultValue={period}
          onChange={handleChange}
          options={[
            ...hydraStatisticsData.map((item) => ({
              value: item.id,
              label: item.id.split('_').join(' - ')
            }))
          ]}
          style={{ width: '100%' }}
        />
        {hydraTableData && (
          <>
            <Hydra.Table.Component statisticData={hydraTableData} />
            <RotationStatistics hydraStatisticData={hydraTableData} />
          </>
        )}
      </Card>

      {hydraStatisticsData && <AllTimeClanStatistics statisticsData={hydraStatisticsData} />}
    </Flex>
  )
}
