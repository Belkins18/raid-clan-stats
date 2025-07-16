import type { FC } from 'react'

import { Layout } from 'antd'

import { LayoutComponents } from '@/layouts'

import { style } from './footer.style'

const playlist = [
  new URL('/src/assets/audio/experimental-cinematic-hip-hop-315904.mp3', import.meta.url).href,
  new URL('/src/assets/audio/epic-orchestra-of-powerful-motivation-313465.mp3', import.meta.url).href,
  new URL('/src/assets/audio/invisible-flow-experimental-deep-fashion-groove-353166.mp3', import.meta.url).href,
  new URL('/src/assets/audio/RAID Shadow Legends OST - Storyline Theme [TubeRipper.com].mp3', import.meta.url).href
]

export const Footer: FC = () => {
  return (
    <Layout.Footer style={style.footer}>
      <LayoutComponents.AudioPlayer playlist={playlist} />©{new Date().getFullYear()} Created by Belkins{' '}
      <p>
        Build: {__APP_VERSION__} ({__BUILD_DATE__})
      </p>
    </Layout.Footer>
  )
}
