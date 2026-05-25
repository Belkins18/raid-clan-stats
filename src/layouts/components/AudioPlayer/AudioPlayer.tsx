/* eslint-disable react-hooks/exhaustive-deps */
import { PauseCircleOutlined, PlayCircleOutlined, StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons'
import { Button, Flex, Slider, Tooltip, Typography } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { style } from './audioPlayer.style'

const { Text } = Typography

export interface AudioPlayerProps {
  playlist: AudioPlayerTrack[]
}

export type AudioPlayerTrack =
  | string
  | {
      type: 'audio'
      src: string
      title?: string
    }
  | {
      type: 'youtube'
      title: string
      videoId?: string
      channelId?: string
    }

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ playlist }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const youtubeRef = useRef<HTMLIFrameElement>(null)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const currentTrack = playlist[currentTrackIndex]
  const isYoutubeTrack = typeof currentTrack !== 'string' && currentTrack.type === 'youtube'
  const audioTrackSrc = typeof currentTrack === 'string' ? currentTrack : currentTrack.type === 'audio' ? currentTrack.src : undefined
  const currentTrackTitle = typeof currentTrack === 'string' ? currentTrack.split('/').pop() : currentTrack.title

  const youtubeSrc =
    typeof currentTrack !== 'string' && currentTrack.type === 'youtube'
      ? currentTrack.videoId
        ? `https://www.youtube.com/embed/${currentTrack.videoId}?enablejsapi=1&autoplay=1&controls=0&rel=0`
        : `https://www.youtube.com/embed/live_stream?channel=${currentTrack.channelId}&enablejsapi=1&autoplay=1&controls=0&rel=0`
      : undefined

  const sendYoutubeCommand = (func: string, args: unknown[] = []) => {
    youtubeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args }), 'https://www.youtube.com')
  }

  const togglePlay = () => {
    if (isYoutubeTrack) {
      sendYoutubeCommand(isPlaying ? 'pauseVideo' : 'playVideo')
      setIsPlaying(!isPlaying)
      return
    }

    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch((err) => console.warn('Play error:', err))
    }
    setIsPlaying(!isPlaying)
  }

  const playNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length)
  }

  const playPrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length)
  }

  const onVolumeChange = (value: number) => {
    const normalizedVolume = value / 100
    setVolume(normalizedVolume)
    if (isYoutubeTrack) {
      sendYoutubeCommand('setVolume', [value])
    } else if (audioRef.current) {
      audioRef.current.volume = normalizedVolume
    }
  }

  const onTimeUpdate = () => {
    const audio = audioRef.current
    if (audio) {
      setProgress((audio.currentTime / audio.duration) * 100)
    }
  }

  const onProgressChange = (value: number) => {
    const audio = audioRef.current
    if (audio && !isYoutubeTrack && Number.isFinite(audio.duration)) {
      audio.currentTime = (value / 100) * audio.duration
      setProgress(value)
    }
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || isYoutubeTrack) return

    audio.loop = false

    const handleEnded = () => playNext()
    const handleLoadedMetadata = () => setDuration(audio.duration)

    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [currentTrackIndex, isYoutubeTrack, playlist])

  useEffect(() => {
    setProgress(0)
    setDuration(0)

    if (isYoutubeTrack) {
      audioRef.current?.pause()

      const timer = window.setTimeout(() => {
        sendYoutubeCommand('setVolume', [volume * 100])
        sendYoutubeCommand('playVideo')
      }, 500)

      setIsPlaying(true)

      return () => window.clearTimeout(timer)
    }

    const audio = audioRef.current

    if (audio) {
      sendYoutubeCommand('pauseVideo')
      audio.volume = volume
      audio.load()
      audio.play().catch(() => {})
      setIsPlaying(true)
    }
  }, [currentTrack, isYoutubeTrack])

  return (
    <div style={style.audioWrapper}>
      <Flex gap={8} justify="space-between" align="center">
        <Flex gap={8} justify="space-between" align="center">
          <Button icon={<StepBackwardOutlined />} onClick={playPrev} />
          <Button style={{ width: '64px' }} icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />} onClick={togglePlay} />
          <Button icon={<StepForwardOutlined />} onClick={playNext} />
        </Flex>

        <Tooltip title={`Volume: ${(volume * 100).toFixed(0)}%`}>
          <Slider min={0} max={100} value={volume * 100} onChange={onVolumeChange} style={{ width: '25%' }} />
        </Tooltip>
      </Flex>

      <div style={style.audioProgress}>
        <Flex gap={8} flex={1} justify="space-between" align="center" style={{ width: '100%' }}>
          <Slider
            min={0}
            max={100}
            value={progress}
            onChange={onProgressChange}
            disabled={isYoutubeTrack}
            tooltip={{ formatter: null }}
            style={{ width: '70%', flexShrink: 0 }}
          />
          <Text>
            {isYoutubeTrack ? 'Live' : `${formatTime((progress / 100) * duration)} / ${formatTime(duration)}`}
          </Text>
        </Flex>
        <Text strong style={style.audioTrackText}>
          {currentTrackTitle}
        </Text>
      </div>

      <audio ref={audioRef} src={audioTrackSrc} onTimeUpdate={onTimeUpdate} />

      {youtubeSrc && (
        <iframe
          ref={youtubeRef}
          src={youtubeSrc}
          title={currentTrackTitle}
          allow="autoplay; encrypted-media"
          style={style.youtubeFrame}
        />
      )}
    </div>
  )
}
