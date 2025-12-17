/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { Card, Flex, Select, Space, Typography } from 'antd'

import { Hydra } from '@/components'
import { dataType } from '@/data'
import { useHydraStatistics } from '@/hooks'
import { useHydraStore } from '@/store'

import { AllTimeClanStatistics, RotationStatistics } from './components'

const { Text } = Typography
const LOCAL_SETUP = true

export const Layout = () => {
  const [yearCode, setYearCode] = useState<string>('2025')
  const { period, changePeriod } = useHydraStore()

  const { data: hydraStatisticsData, loading } = useHydraStatistics({
    localSetup: LOCAL_SETUP,
    yearCode
  })

  const [hydraTableData, setHydraTableData] = useState<dataType.IHydraStatisticsData>()

  const handleChange = (value: string) => {
    changePeriod(value)
  }

  const yearsSelectHandler = (value: string) => {
    changePeriod(undefined)
    setYearCode(value)
  }

  useEffect(() => {
    if (loading) return
    const dataById = hydraStatisticsData && hydraStatisticsData.find((item) => item.id === period)

    setHydraTableData(dataById)
  }, [period, hydraStatisticsData, loading])

  return (
    <Flex gap="middle" vertical>
      <Card size="small" loading={loading} title="[BiБP] Hydra Statistics:">
        <Flex gap="small" vertical>
          <Space>
            <Text>Select year:</Text>
            <Select
              defaultValue={yearCode.toString()}
              onChange={yearsSelectHandler}
              options={[
                {
                  value: '2025',
                  label: 2025
                },
                {
                  value: '2026',
                  label: 2026
                }
              ]}
              style={{ width: '100%' }}
            />
          </Space>
          <Flex vertical>
            <Text>Select hydra rotation period:</Text>
            <Select
              onChange={handleChange}
              options={[
                ...hydraStatisticsData.map((item) => ({
                  value: item.id,
                  label: item.id.split('_').join(' - ')
                }))
              ]}
              value={period}
              style={{ width: '100%' }}
            />
          </Flex>
        </Flex>

        {hydraTableData && (
          <>
            <br />
            <Hydra.Table.Component statisticData={hydraTableData} />
            <RotationStatistics hydraStatisticData={hydraTableData} />
          </>
        )}
      </Card>

      {hydraStatisticsData && <AllTimeClanStatistics statisticsData={hydraStatisticsData} />}
    </Flex>
  )
}
