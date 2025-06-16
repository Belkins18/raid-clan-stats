import { StrictMode, useEffect } from 'react'

import { theme as antdTheme, ConfigProvider } from 'antd'

import App from '@/App.tsx'
import { useThemeStore } from '@/store'
import { createRoot } from 'react-dom/client'

import '@/index.css'

const ThemedApp = () => {
  const mode = useThemeStore((state) => state.mode)

  const htmlEl = document.querySelector('html')

  useEffect(() => {
    htmlEl?.setAttribute('data-prefers-color', mode)
  }, [htmlEl, mode])

  return (
    <ConfigProvider
      theme={{
        algorithm: mode === 'dark' ? antdTheme.defaultAlgorithm : antdTheme.compactAlgorithm,
        token: {
          colorPrimary: mode === 'dark' ? '#000' : '#000'
          // colorBgBase: mode === 'dark' ? '#fff' : '#fff',
          // colorText: mode === 'dark' ? '#000' : '#000',
        },
        components: {
          Layout: {
            headerBg: mode === 'dark' ? '#ffffff' : '#ffffff',
            footerBg: mode === 'dark' ? '#ffffff' : '#ffffff'
          }
        }
      }}
    >
      <App />
    </ConfigProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemedApp />
  </StrictMode>
)
