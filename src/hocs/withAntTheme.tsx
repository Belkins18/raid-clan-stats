import React from 'react'

import { theme as antdTheme, ConfigProvider, type ThemeConfig } from 'antd'

import { useThemeStore } from '@/store'

interface WithAntThemeProps {
  children: React.ReactNode
}

export const WithAntTheme: React.FC<WithAntThemeProps> = ({ children }) => {
  const mode = useThemeStore((state) => state.mode)

  const darkThemeConfig: ThemeConfig = {
    algorithm: antdTheme.darkAlgorithm,
    token: {
      colorPrimary: '#1890ff',
      borderRadius: 6,
      colorBgContainer: '#141414'
    },
    components: {
      Menu: {
        darkItemBg: 'transparent',
        darkItemSelectedBg: '#1890ff',
        darkItemColor: 'rgba(255, 255, 255, 0.65)',
        darkItemSelectedColor: '#ffffff',
        darkItemHoverColor: 'rgba(255, 255, 255, 0.85)'
      },
      Slider: {
        railBg: 'rgba(255, 255, 255, 0.3)',
        trackBg: '#1890ff',
        handleSize: 14,
        handleSizeHover: 14
      },
      Table: {
        cellPaddingBlock: 8,
        cellPaddingInline: 8
      }
    }
  }

  const lightThemeConfig: ThemeConfig = {
    algorithm: antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: '#1890ff',
      borderRadius: 6,
      colorBgContainer: '#ffffff'
    },
    components: {
      Menu: {
        itemBg: 'transparent',
        itemSelectedBg: '#e6f7ff',
        itemColor: 'rgba(0, 0, 0, 0.65)',
        itemSelectedColor: '#1890ff',
        itemHoverColor: '#1890ff'
      },
      Slider: {
        railBg: 'rgba(0, 0, 0, 0.1)',
        trackBg: '#1890ff',
        handleSize: 14,
        handleSizeHover: 14
      },
      Table: {
        cellPaddingBlock: 8,
        cellPaddingInline: 8
      }
    }
  }

  const themeConfig = mode === 'dark' ? darkThemeConfig : lightThemeConfig

  return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
}
