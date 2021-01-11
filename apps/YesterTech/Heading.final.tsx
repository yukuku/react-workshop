import React from 'react'
import classnames from 'classnames'

import 'YesterTech/Heading.scss'

interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: number
  className?: string
}

const Heading: React.FC<HeadingProps> = ({
  as: Component = 'h1',
  size = 1,
  className = undefined,
  ...rest
}) => {
  return <Component className={classnames('heading', `size-${size}`, className)} {...rest} />
}

export default Heading
