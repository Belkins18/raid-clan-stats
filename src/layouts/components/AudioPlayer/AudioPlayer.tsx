/* eslint-disable react-hooks/exhaustive-deps */
import {
  PauseCircleOutlined,
  PlayCircleOutlined,
  StepBackwardOutlined,
  StepForwardOutlined
} from '@ant-design/icons'
import { Button, Flex, Slider, Tooltip, Typography } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { style } from './audioPlayer.style'

const { Text } = Typography

export interface AudioPlayerProps {
  playlist: string[]
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ playlist }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const currentTrack = playlist[currentTrackIndex]

  const togglePlay = () => {
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
    if (audioRef.current) {
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
    if (audio) {
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
    if (!audio) return

    audio.loop = false

    const handleEnded = () => playNext()

    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration))

    return () => {
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentTrackIndex, playlist])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load()
      audioRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }, [currentTrack])

  return (
    <div style={style.audioWrapper}>
      <Flex gap={8} justify="space-between" align="center">
        <Flex gap={8} justify="space-between" align="center">
          <Button icon={<StepBackwardOutlined />} onClick={playPrev} />
          <Button
            style={{ width: '64px' }}
            icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
            onClick={togglePlay}
          />
          <Button icon={<StepForwardOutlined />} onClick={playNext} />
        </Flex>

        <Tooltip title={`Volume: ${(volume * 100).toFixed(0)}%`}>
          <Slider
            min={0}
            max={100}
            value={volume * 100}
            onChange={onVolumeChange}
            style={{ width: '25%' }}
          />
        </Tooltip>
      </Flex>

      <div style={style.audioProgress}>
        <Flex gap={8} flex={1} justify="space-between" align="center" style={{ width: '100%' }}>
          <Slider
            min={0}
            max={100}
            value={progress}
            onChange={onProgressChange}
            tooltip={{ formatter: null }}
            style={{ width: '70%', flexShrink: 0 }}
          />
          <Text>
            {formatTime((progress / 100) * duration)} / {formatTime(duration)}
          </Text>
        </Flex>
        <Text strong style={style.audioTrackText}>
          {currentTrack.split('/').pop()}
        </Text>
      </div>

      <audio ref={audioRef} src={currentTrack} onTimeUpdate={onTimeUpdate} />
    </div>
  )
}
