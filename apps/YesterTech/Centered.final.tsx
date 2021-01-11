import React from 'react'

interface CenteredProps {
  as?: 'div'
  size?: number
  className?: string
}

const Centered: React.FC<CenteredProps> = ({
  as: Component = 'div',
  size = 30,
  children,
  ...rest
}) => {
  return (
    <Component
      style={{
        margin: `0 auto`,
        maxWidth: `${size}rem`,
      }}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default Centered
