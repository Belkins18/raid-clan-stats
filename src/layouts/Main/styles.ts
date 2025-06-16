const header: React.CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 1,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingInlineEnd: '16px',
  paddingInlineStart: '42px'
}

const content: React.CSSProperties = {
  overflow: 'auto',
  paddingInline: '16px',

}

const layout = {
  display: 'flex',
  overflow: 'hidden',
  minHeight: '100vh'
}

export const mainStyle = {
  header,
  content,
  layout
}
