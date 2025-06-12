import { type FC } from 'react'

import { Layout } from 'antd'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { LayoutComponents } from '@/layouts'
import { ChimeraPage, HomePage, HydraPage } from '@/pages'
import type { ItemType, MenuItemType } from 'antd/es/menu/interface'

import { mainStyle } from './styles'

const { Content } = Layout

interface IMainLayoutProps {
  pageNavigation?: ItemType<MenuItemType>[]
}

export const MainLayout: FC<IMainLayoutProps> = ({ pageNavigation }) => {
  return (
    <BrowserRouter>
      <Layout style={mainStyle.layout}>
        <LayoutComponents.Header pageNavigation={pageNavigation} />
        <LayoutComponents.Breadcrumbs items={[]} />
        <Content style={mainStyle.content}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hydra">
              <Route index element={<HydraPage.Main.Layout />} />
              <Route path=":user" element={<HydraPage.Main.Slug.StatisticPage />} />
            </Route>
            <Route path="/chimera" element={<ChimeraPage />} />
          </Routes>
        </Content>
        <LayoutComponents.Footer />
      </Layout>
    </BrowserRouter>
  )
}
