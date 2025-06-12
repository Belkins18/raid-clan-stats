import React, { forwardRef } from 'react'

import { theme as antdTheme, ConfigProvider, type ThemeConfig } from 'antd'

import { useThemeStore } from '@/store'

export const withAntTheme = <TProps extends object>(
  WrappedComponent: React.ComponentType<TProps>
) => {
  const ComponentWithTheme = forwardRef<unknown, TProps>((props, ref) => {
    const mode = useThemeStore((state) => state.mode)

    const darkThemeConfig: ThemeConfig = {
      algorithm: antdTheme.defaultAlgorithm,
      token: {
        // fontFamily: 'Iosevka, Arial, Helvetica, sans-serif',
      },
      components: {
        List: {
          itemPaddingSM: '2px 8px',
          fontSize: 10,
          lineHeight: 1.2
        },
        Tabs: {
          cardBg: 'rgba(0,0,0,0.2)',
          cardGutter: -2,
          horizontalMargin: '0px',
          itemColor: '#c0c0c0',
          itemHoverColor: '#c0c0c0',
          itemSelectedColor: '#c0c0c0',
          lineHeight: 1.1
        },
        Table: {
          // headerBorderRadius: 0,
          cellPaddingBlock: 4,
          cellPaddingInline: 8
        },
        Card: {
          bodyPadding: 0,
          colorBgBase: 'transparent'
        }
      }
    }

    const lightThemeConfig: ThemeConfig = {
      algorithm: antdTheme.compactAlgorithm,
      token: {
        // fontFamily: 'Iosevka, Arial, Helvetica, sans-serif',
      },
      components: {
        List: {
          itemPaddingSM: '2px 8px',
          fontSize: 10,
          lineHeight: 1.2
        },
        Table: {
          headerBorderRadius: 0,
          cellPaddingBlock: 4,
          cellPaddingInline: 8
        },
        Card: {
          bodyPadding: 0,
          colorBgBase: 'transparent'
        }
      }
    }

    const isDark = mode === 'dark'

    const themeConfig = isDark ? darkThemeConfig : lightThemeConfig

    return (
      <ConfigProvider theme={themeConfig}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <WrappedComponent {...props} ref={ref} />
      </ConfigProvider>
    )
  })

  ComponentWithTheme.displayName = `withAntTheme(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`

  return ComponentWithTheme
}
