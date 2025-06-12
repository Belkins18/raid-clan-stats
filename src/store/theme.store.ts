import { create } from 'zustand'

type ThemeMode = 'light' | 'dark'

interface ThemeState {
  mode: ThemeMode
  toggle: () => void
}

const getInitialTheme = (): ThemeMode => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: getInitialTheme(),
  toggle: () =>
    set((state) => ({
      mode: state.mode === 'dark' ? 'light' : 'dark'
    }))
}))
