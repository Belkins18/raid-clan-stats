import { useEffect, useState } from 'react'

import { Card, Checkbox, Flex, type CheckboxProps } from 'antd'
import { useParams } from 'react-router-dom'

import { dataType } from '@/data'
import { useHydraStatistics } from '@/hooks'
import { UserStatistics } from './components'

export const StatisticPage = () => {
  const params = useParams()

  const { user } = params

  const { data: hydraStatisticsData, loading } = useHydraStatistics()
  const [hydraTableData, setHydraTableData] = useState<dataType.IHydraStatisticsData[]>()
  const [checked, setChecked] = useState(true)

  useEffect(() => {
    if (!user || !hydraStatisticsData) return

    const userData = hydraStatisticsData.reduce<dataType.IHydraStatisticsData[]>((acc, statisticsData) => {
      const { id, data } = statisticsData
      const dataByUser = data.filter((item) => item.name === user)

      if (dataByUser.length) {
        acc.push({ id, data: dataByUser })
      }

      return acc
    }, [])

    setHydraTableData(userData)
  }, [user])

  const onShowRated: CheckboxProps['onChange'] = (e) => {
    setChecked(e.target.checked)
  }

  const label = `${checked ? 'Pure damage' : 'Damage by rate'}`

  return (
    <Flex gap="middle" vertical>
      <Card size="small" title="[BiБP] Hydra Statistics:" loading={loading}>
        <Checkbox checked={checked} onChange={onShowRated}>
          {label}
        </Checkbox>
        {hydraTableData && <UserStatistics statisticsData={hydraTableData} checked={checked} />}
      </Card>
    </Flex>
  )
}
