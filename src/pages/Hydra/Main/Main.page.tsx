import { useEffect, useState } from 'react'

import {
  Alert,
  Button,
  Card,
  Flex,
  message,
  Select,
  Space,
  Typography
} from 'antd'

import { Hydra } from '@/components'
import { AVAILABLE_YEARS, getDefaultYear } from '@/constants'
import { dataType } from '@/data'
import { useHydraStatistics } from '@/hooks'
import { useHydraStore } from '@/store'
import { createMarkdownTable } from '@/utils'

import { AllTimeClanStatistics, RotationStatistics } from './components'

const { Text } = Typography
const MARKDOWN_TABLE_COLUMNS = [
  'Name',
  'Normal',
  'Hard',
  'Brutal',
  'Nightmare',
  'Damage',
  'Activity'
] as const

export const Layout = () => {
  const [yearCode, setYearCode] = useState<string>(getDefaultYear())
  const { period, changePeriod } = useHydraStore()
  const [messageApi, contextHolder] = message.useMessage()

  const {
    data: hydraStatisticsData,
    loading,
    error
  } = useHydraStatistics({
    yearCode
  })

  const [hydraTableData, setHydraTableData] =
    useState<dataType.IHydraStatisticsData>()

  const handleChange = (value: string) => {
    changePeriod(value)
  }

  const yearsSelectHandler = (value: string) => {
    changePeriod(undefined)
    setYearCode(value)
  }

  const handleCopyHydraMarkdown = async () => {
    if (!hydraTableData) return

    if (hydraTableData.id !== period) {
      messageApi.error('Selected rotation does not match loaded table data')
      return
    }

    const { formatLocalized, parseNumberSafe } = Hydra.Utils
    const { hydraLevelsWithRate } = Hydra.Utils.constants
    const formatDamageCell = (value: string | number) => {
      const damage = parseNumberSafe(value)
      return damage > 0 ? formatLocalized(damage) : '-'
    }

    const rows = [...hydraTableData.data]
      .map((item) => {
        const totalDamage = hydraLevelsWithRate.reduce(
          (sum, { label, rate }) => {
            return sum + parseNumberSafe(item[label]) * rate
          },
          0
        )

        return {
          totalDamage,
          row: [
            item.name,
            formatDamageCell(item.Normal),
            formatDamageCell(item.Hard),
            formatDamageCell(item.Brutal),
            formatDamageCell(item.Nightmare),
            formatLocalized(totalDamage),
            item.keyUsed
          ]
        }
      })
      .sort((a, b) => b.totalDamage - a.totalDamage)
      .map((item) => item.row)

    try {
      await navigator.clipboard.writeText(
        createMarkdownTable(MARKDOWN_TABLE_COLUMNS, rows)
      )
      messageApi.success('Markdown table copied')
    } catch {
      messageApi.error('Failed to copy markdown table')
    }
  }

  useEffect(() => {
    if (loading) return
    const dataById =
      hydraStatisticsData &&
      hydraStatisticsData.find((item) => item.id === period)

    setHydraTableData(dataById)
  }, [period, hydraStatisticsData, loading])

  return (
    <Flex gap="middle" vertical>
      {contextHolder}
      {error && (
        <Alert
          message="Error loading statistics"
          description={error.message}
          type="error"
          showIcon
        />
      )}
      <Card size="small" loading={loading} title="[BiБP] Hydra Statistics:">
        <Flex gap="small" vertical>
          <Space>
            <Text>Select year:</Text>
            <Select
              value={yearCode}
              onChange={yearsSelectHandler}
              options={AVAILABLE_YEARS}
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
            <Button
              disabled={!hydraTableData}
              onClick={handleCopyHydraMarkdown}
            >
              Copy markdown table
            </Button>
            <br />
            <RotationStatistics rotationId={hydraTableData.id} />
          </>
        )}
      </Card>

      <AllTimeClanStatistics yearCode={yearCode} />
    </Flex>
  )
}
