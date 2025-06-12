export const parseNumber = (value: string): number => {
  return Number(value.replace(/\s/g, '') || '0')
}
