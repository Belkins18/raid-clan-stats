import { useEffect, useState, type FC } from 'react'
import { Breadcrumb } from 'antd'
import { useLocation, Link } from 'react-router-dom'
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import { HomeOutlined } from '@ant-design/icons'

interface IBreadcrumbsProps {
  items?: ItemType[]
}

export const Breadcrumbs: FC<IBreadcrumbsProps> = ({ items = [] }) => {
  const location = useLocation()
  const { pathname } = location

  const [dynamicItems, setDynamicItems] = useState<ItemType[]>([])

  useEffect(() => {
    if (!pathname) return

    const levelPath = pathname.split('/').filter(Boolean)

    const dynamicPart = levelPath.map((item, index) => {
      const isLast = index === levelPath.length - 1
      const url = `/${levelPath.slice(0, index + 1).join('/')}`

      return {
        title: isLast ? decodeURIComponent(item) : <Link to={url}>{decodeURIComponent(item)}</Link>
      }
    })

    setDynamicItems(dynamicPart)
  }, [pathname])

  const breadcrumbItems: ItemType[] = [
    {
      title: (
        <Link to="/">
          <HomeOutlined />
        </Link>
      )
    },
    ...dynamicItems
  ]

  return <Breadcrumb style={{ margin: '16px', textTransform: 'capitalize' }} items={[...items, ...breadcrumbItems]} />
}
