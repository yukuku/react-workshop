// @ts-nocheck
import React from 'react'
import classnames from 'classnames'
import 'YesterTech/Avatar.scss'

function Avatar({ src, size = 3, className = undefined, ...rest }) {
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
