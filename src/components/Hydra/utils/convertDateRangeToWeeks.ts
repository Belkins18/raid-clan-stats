import { getWeekNumber } from './getWeekNumber'

export const convertDateRangeToWeeks = (range: string) => {
  if (!range) return ''
  const [startStr, endStr] = range.split('_')
  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('-').map(Number)
    return new Date(year, month - 1, day)
  }

  const startDate = parseDate(startStr)
  const endDate = parseDate(endStr)

  const startWeek = getWeekNumber(startDate)
  const endWeek = getWeekNumber(endDate)

  return `${startWeek}=>${endWeek}`
}
