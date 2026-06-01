import type { FC } from 'react'

import { Layout } from 'antd'

import { LayoutComponents } from '@/layouts'

import { style } from './footer.style'
import { playlist } from './playlist'

export const Footer: FC = () => {
  return (
    <Layout.Footer style={style.footer}>
      <LayoutComponents.AudioPlayer playlist={playlist} />©
      {new Date().getFullYear()} Created by Belkins{' '}
      <p>
        Build: {__APP_VERSION__} ({__BUILD_DATE__})
      </p>
    </Layout.Footer>
  )
}
