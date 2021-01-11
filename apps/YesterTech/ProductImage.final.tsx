import React from 'react'
import classnames from 'classnames'

import 'YesterTech/ProductImage.scss'

interface ProductImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number
}

function ProductImage({ size = 7, className, ...rest }: ProductImageProps) {
  return (
    <img
      className={classnames('product-image', className)}
      style={{ fontSize: `${size}rem` }}
      alt={rest.alt || ''}
      {...rest}
    />
  )
}

export default ProductImage
