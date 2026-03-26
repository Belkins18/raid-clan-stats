import { useEffect, useState } from 'react'

import { Alert, Card, Flex, Select, Space, Typography } from 'antd'

import { Hydra } from '@/components'
import { AVAILABLE_YEARS, getDefaultYear } from '@/constants'
import { dataType } from '@/data'
import { useHydraStatistics } from '@/hooks'
import { useHydraStore } from '@/store'

import { AllTimeClanStatistics, RotationStatistics } from './components'

const { Text } = Typography

export const Layout = () => {
  const [yearCode, setYearCode] = useState<string>(getDefaultYear())
  const { period, changePeriod } = useHydraStore()

  const {
    data: hydraStatisticsData,
    loading,
    error
  } = useHydraStatistics({
    localSetup: import.meta.env.MODE === 'development',
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
      {error && <Alert message="Error loading statistics" description={error.message} type="error" showIcon />}
      <Card size="small" loading={loading} title="[BiБP] Hydra Statistics:">
        <Flex gap="small" vertical>
          <Space>
            <Text>Select year:</Text>
            <Select defaultValue={yearCode.toString()} onChange={yearsSelectHandler} options={AVAILABLE_YEARS} style={{ width: '100%' }} />
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
            <RotationStatistics rotationId={hydraTableData.id} />
          </>
        )}
      </Card>

      <AllTimeClanStatistics />
    </Flex>
  )
}
