import { useEffect, useState } from 'react'

import { Card, Flex, Select, Typography } from 'antd'

import { Hydra } from '@/components'
import { dataType, hydraStatisticsData as _data } from '@/data'
import { useHydraStatistics } from '@/hooks'
import { useHydraStore } from '@/store'

import { AllTimeClanStatistics, RotationStatistics } from './components'

const { Text } = Typography

export const Layout = () => {
  const period = useHydraStore((state) => state.period)
  const changePeriod = useHydraStore((state) => state.changePeriod)

  const { data: hydraStatisticsData, loading } = useHydraStatistics()
  const [hydraTableData, setHydraTableData] = useState<dataType.IHydraStatisticsData>()

  const handleChange = (value: string) => {
    changePeriod(value)
  }

  useEffect(() => {
    if (loading) return
    const dataById = hydraStatisticsData && hydraStatisticsData.find((item) => item.id === period)

    setHydraTableData(dataById)
  }, [period, loading])


  const localData = _data.find(item => item)!
  console.log(localData)

  const isUseLocal = true

  return (
    <Flex gap="middle" vertical>
      <Card size="small" loading={loading} title="[BiБP] Hydra Statistics:">
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
            <Hydra.Table.Component statisticData={isUseLocal ? localData : hydraTableData} />
            <RotationStatistics hydraStatisticData={hydraTableData} />
          </>
        )}
      </Card>

      {hydraStatisticsData && <AllTimeClanStatistics statisticsData={hydraStatisticsData} />}
    </Flex>
  )
}
