import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
// @ts-ignore
import { Columns, Column } from 'react-flex-columns'

import Heading from 'YesterTech/Heading.final'
import ProductImage from 'YesterTech/ProductImage.final'
import usePromise from 'YesterTech/usePromise.final'
import api from 'YesterTech/api/index.final'

interface ProductTileProps {
  productId: string
}

function ProductTile({ productId }: ProductTileProps) {
  const getProduct = useCallback(() => api.products.getProduct(productId), [productId])
  const [product] = usePromise(getProduct)

  if (!product) return null

  return (
    <div className="product-tile">
      <Columns gutterSize={0.5}>
        <Column>
          <ProductImage src={product.imagePath} alt={product && product.name} size={5} />
        </Column>
        <Column flex className="spacing-small">
          <Heading as="h2" size={4} className="no-wrap">
            {product.name}
          </Heading>
          <div className="text-small">
            <Link to={`/products/${productId}`}>View Product</Link>
          </div>
        </Column>
      </Columns>
    </div>
  )
}

export default ProductTile
