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
  minHeight: 'calc(100vh - 64px)'
}

const sider: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff'
}

const footer: React.CSSProperties = {
  textAlign: 'center',
  paddingInline: '16px'
}

const layout = {
  display: 'flex',
  overflow: 'hidden'
  // flex: 1
}

export const mainStyle = {
  header,
  sider,
  content,
  footer,
  layout
}
