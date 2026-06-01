export const percentFromRounded = (
  value: number,
  total: number,
  decimals = 2
): number => {
  if (total === 0) return 0

  const result = (value / total) * 100
  return Number(result.toFixed(decimals))
}
