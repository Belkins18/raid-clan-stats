import { type FC } from 'react'

import { Button, Layout, Menu, type MenuProps, theme } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

import { LayoutComponents } from '@/layouts'
import { useThemeStore } from '@/store'
import { SunFilled, SunOutlined } from '@ant-design/icons'
import type { ItemType, MenuItemType } from 'antd/es/menu/interface'

import { style } from './header.style'

interface IHeaderComponentProps {
  pageNavigation?: ItemType<MenuItemType>[]
}

export const Header: FC<IHeaderComponentProps> = ({ pageNavigation }) => {
  const toggle = useThemeStore((state) => state.toggle)
  const mode = useThemeStore((state) => state.mode)
  const { token } = theme.useToken()
  const navigate = useNavigate()
  const location = useLocation()

  const currentPath = location.pathname.split('/')[1]

  const menuHandler: MenuProps['onClick'] = (e) => {
    navigate(`/${e.key}`)
  }

  return (
    <Layout.Header
      style={{ ...style.header, background: token.colorBgContainer }}
    >
      <LayoutComponents.Brand text="[BiБр]" />
      <Menu
        mode="horizontal"
        selectedKeys={[currentPath]}
        onClick={menuHandler}
        items={pageNavigation ?? []}
        style={style.headerMenu}
      />
      <Button
        onClick={toggle}
        icon={mode === 'dark' ? <SunFilled /> : <SunOutlined />}
      />
    </Layout.Header>
  )
}
