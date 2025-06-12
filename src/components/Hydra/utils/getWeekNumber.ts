export const getWeekNumber = (date: Date): number => {
  const target = new Date(date.getTime())
  target.setHours(0, 0, 0, 0)

  // ISO week: 1st Thursday is in week 1
  target.setDate(target.getDate() + 3 - ((target.getDay() + 6) % 7))

  const firstThursday = new Date(target.getFullYear(), 0, 4)
  firstThursday.setDate(firstThursday.getDate() + 3 - ((firstThursday.getDay() + 6) % 7))

  const weekNumber =
    1 +
    Math.round(
      ((target.getTime() - firstThursday.getTime()) / 86400000 -
        3 +
        ((firstThursday.getDay() + 6) % 7)) /
        7
    )

  return weekNumber
}
