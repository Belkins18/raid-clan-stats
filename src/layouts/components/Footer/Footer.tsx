import type { FC } from 'react'

import { Layout } from 'antd'

import { LayoutComponents } from '@/layouts'

import { style } from './footer.style'

const playlist = [
  '/src/assets/audio/RAID Shadow Legends OST - Storyline Theme [TubeRipper.com].mp3',
  '/src/assets/audio/epic-orchestra-of-powerful-motivation-313465.mp3',
  '/src/assets/audio/experimental-cinematic-hip-hop-315904.mp3',
  '/src/assets/audio/invisible-flow-experimental-deep-fashion-groove-353166.mp3'
]

export const Footer: FC = () => {
  return (
    <Layout.Footer style={style.footer}>
      <LayoutComponents.AudioPlayer playlist={playlist} />©{new Date().getFullYear()} Created by
      Belkins
    </Layout.Footer>
  )
}
