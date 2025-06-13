const removeUnicodeSpaces = (input: string): string => input.replace(/[\u00A0\u202F\u2007\s]/g, '')

export const parseNumber = (value: string): number => {
  if (typeof value !== 'string') return 0
  const cleaned = removeUnicodeSpaces(value.trim())
  const parsed = Number(cleaned)
  return isNaN(parsed) ? 0 : parsed
}

export const parseNumberSafe = (value: string | number | undefined | null): number => {
  if (typeof value === 'number') return value
  if (typeof value === 'string') return parseNumber(value)
  return 0
}
