export const formatLocalized = (
  value: number,
  maximumFractionDigits: number = 2,
  compactDisplay: 'short' | 'long' | undefined = 'short',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay,
    maximumFractionDigits
  }).format(value)
}
