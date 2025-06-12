import { Hydra } from '@/components'
import { dataType } from '@/data'

export const transformData = (
  inputData: dataType.IHydraStatisticsData | dataType.IHydraStatisticsData[],
  showPureDammage: boolean = false
): Hydra.Chart.Types.IBasicData[] => {
  if (!inputData) return []

  const { parseNumber, formatLocalized } = Hydra.Utils
  const { hydraLevelsWithRate } = Hydra.Utils.constants

  const dataArray = Array.isArray(inputData) ? inputData : [inputData]

  return dataArray.map((item) => {
    let normalDamage = 0
    let hardDamage = 0
    let brutalDamage = 0
    let nightmareDamage = 0

    item.data.forEach((userStat) => {
      hydraLevelsWithRate.forEach(({ label, rate }) => {
        const rawValue = userStat[label as keyof typeof userStat] || '0'
        const numericValue = parseNumber(rawValue)

        switch (label) {
          case dataType.EHydraLevel.normal:
            normalDamage += numericValue * (showPureDammage ? 1 : rate)
            break
          case dataType.EHydraLevel.hard:
            hardDamage += numericValue * (showPureDammage ? 1 : rate)
            break
          case dataType.EHydraLevel.brutal:
            brutalDamage += numericValue * (showPureDammage ? 1 : rate)
            break
          case dataType.EHydraLevel.nightmare:
            nightmareDamage += numericValue * (showPureDammage ? 1 : rate)
            break
        }
      })
    })

    let totalDamage = 0

    if (showPureDammage) {
      item.data.forEach((userStat) => {
        hydraLevelsWithRate.forEach(({ label, rate }) => {
          const rawValue = userStat[label as keyof typeof userStat] || '0'
          const numericValue = parseNumber(rawValue)
          totalDamage += numericValue * rate
        })
      })
    } else {
      totalDamage = normalDamage + hardDamage + brutalDamage + nightmareDamage
    }

    const labelTotalDamage = formatLocalized(totalDamage)

    return {
      period: item.id,
      normalDamage,
      hardDamage,
      brutalDamage,
      nightmareDamage,
      totalDamage,
      labelTotalDamage
    }
  })
}
