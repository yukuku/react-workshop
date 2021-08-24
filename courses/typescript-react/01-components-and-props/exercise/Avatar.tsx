import * as React from 'react'
import classnames from 'classnames'
import { VisuallyHidden } from '@reach/visually-hidden'
import 'YesterTech/Avatar.scss'

interface AvatarProps extends React.ComponentPropsWithoutRef<'div'> {
  alt: string;
  src?: string;
  size?: number;
}

function Avatar({
  className,
  alt,
  children,
  style,
  src,
  size = 3,
  ...domProps
}: AvatarProps) {
  className = classnames('avatar', className)
  if (src) {
    return <img src={src} alt={alt} style={style} className={className} {...domProps} />
  }

  return (
    <div style={{ fontSize: `${size}rem`, ...style }} className={className} {...domProps}>
      <VisuallyHidden>{alt}</VisuallyHidden>
      <div aria-hidden>{children}</div>
    </div>
  )
}

export default Avatar
