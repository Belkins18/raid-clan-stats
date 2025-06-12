import type { CSSProperties } from 'react'

const header: CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 1,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingInlineEnd: '16px',
  paddingInlineStart: '16px'
}

const headerMenu: CSSProperties = {
  flex: 1,
  minWidth: 0,
  marginInlineStart: '-16px',
  fontWeight: 700
}

export const style = {
  header,
  headerMenu
}
