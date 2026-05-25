import type { AudioPlayerTrack } from '@/layouts/components/AudioPlayer/AudioPlayer'

export const playlist: AudioPlayerTrack[] = [
  {
    type: 'youtube',
    title: 'WORK MODE ACTIVATED 🚀 | Futuristic Beats for Deep Focus, Productivity & Creative Flow',
    videoId: 'H_POIV_Ve6Q'
  },
  {
    type: 'youtube',
    title: 'Lofi Girl - Synthwave Radio',
    videoId: '4xDzrJKXOOY'
  },
  {
    type: 'youtube',
    title: 'Best of Deep House [2026] | Melodic House & Progressive Flow',
    videoId: 'Il-ZpBuC8tA'
  },
  {
    type: 'audio',
    title: 'Experimental Cinematic Hip Hop',
    src: new URL('/src/assets/audio/experimental-cinematic-hip-hop-315904.mp3', import.meta.url).href
  },
  {
    type: 'audio',
    title: 'Epic Orchestra of Powerful Motivation',
    src: new URL('/src/assets/audio/epic-orchestra-of-powerful-motivation-313465.mp3', import.meta.url).href
  },
  {
    type: 'audio',
    title: 'Invisible Flow Experimental Deep Fashion Groove',
    src: new URL('/src/assets/audio/invisible-flow-experimental-deep-fashion-groove-353166.mp3', import.meta.url).href
  },
  {
    type: 'audio',
    title: 'RAID Shadow Legends OST - Storyline Theme',
    src: new URL('/src/assets/audio/RAID Shadow Legends OST - Storyline Theme [TubeRipper.com].mp3', import.meta.url).href
  }
]
