import type { CSSProperties } from 'react'

const audioWrapper: CSSProperties = {
  // display: 'flex',
  // alignItems: 'center',
  justifyContent: 'center',
  marginBlockEnd: '16px'
}
const audioProgress: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
  overflow: 'hidden'
}

const audioTrackText: CSSProperties = {
  maxWidth: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: '10px'
}

const audioControls: CSSProperties = {
  // display: 'flex',
  // justifyContent: 'center',
  // alignItems: 'center',
  gap: '2px',
  fontSize: '8px'
}

export const style = {
  audioWrapper,
  audioProgress,
  audioTrackText,
  audioControls
}
