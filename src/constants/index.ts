export const CACHE_TTL = 1000 * 60 * 60 // 1 hour in ms

export const DIFFICULTIES = {
  Normal: 'Normal',
  Hard: 'Hard',
  Brutal: 'Brutal',
  Nightmare: 'Nightmare'
} as const

export const AVAILABLE_YEARS = [
  { value: '2025', label: '2025' },
  { value: '2026', label: '2026' },
  { value: '2027', label: '2027' }
]

export const getDefaultYear = (): string => new Date().getFullYear().toString()
