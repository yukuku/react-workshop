import React from 'react'
import classnames from 'classnames'
import 'YesterTech/Avatar.scss'

interface AvatarProps {
  src?: string
  /**
   * The font size (in rems)
   * @default 3
   */
  size?: number
  className?: string
}

function Avatar({ src, size = 3, className = undefined, ...rest }: AvatarProps) {
  const Component = src ? 'img' : 'div'
  return (
    <Component
      src={src}
      alt="Avatar"
      style={{ fontSize: `${size}rem` }}
      className={classnames('avatar', className)}
      {...rest}
    />
  )
}

export default Avatar
