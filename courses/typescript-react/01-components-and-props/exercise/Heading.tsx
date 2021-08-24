import * as React from 'react'
import classnames from 'classnames'
import 'YesterTech/Heading.scss'

interface HeadingProps extends React.ComponentPropsWithRef<'h3'> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size: 1 | 2 | 3 | 4
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      as: Component = 'h1',
      // Size can be between 1 & 4, only affects styling
      size = 1,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      // eslint-disable-next-line jsx-a11y/heading-has-content
      <h1 ref={ref} className={classnames('heading', `size-${size}`, className)} {...rest} />
    )
  }
)

export default Heading
