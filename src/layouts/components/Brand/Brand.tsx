import { type HTMLAttributes } from 'react'
import { Flex, Typography } from 'antd'
import classNames from 'classnames'

import { Avatar } from 'antd'
import { Link } from 'react-router-dom'

const { Text } = Typography

interface IBrandProps extends HTMLAttributes<HTMLDivElement> {
  text?: string
}

export const Brand = ({ className, text, ...rest }: IBrandProps) => {
  return (
    <Link to="/">
      <Flex
        gap={8}
        className={classNames(className)}
        style={{
          display: 'inlineFlex',
          alignItems: 'center',
          width: '140px'
        }}
        {...{ ...rest }}
      >
        <Avatar src={<img src={'/logo.avif'} alt="avatar" style={{ flexShrink: 0 }} />} />
        <Text
          style={{
            textWrap: 'wrap',
            fontWeight: 700,
            fontSize: '14px'
          }}
        >
          {text}
        </Text>
      </Flex>
    </Link>
  )
}
