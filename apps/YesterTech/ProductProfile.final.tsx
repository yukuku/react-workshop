import React, { useCallback } from 'react'
// @ts-ignore
import { Columns, Column } from 'react-flex-columns'
import { useParams } from 'react-router-dom'

import api from 'YesterTech/api/index.final'
import usePromise from 'YesterTech/usePromise.final'
import Heading from 'YesterTech/Heading.final'
import Quantity from 'YesterTech/Quantity.final'
import Tiles from 'YesterTech/Tiles.final'
import StarRatings from 'YesterTech/StarRatings.final'
import ProductImage from 'YesterTech/ProductImage.final'
import ShoppingCartButton from 'YesterTech/ShoppingCartButton.final'
import { useShoppingCart } from 'YesterTech/ShoppingCartState.final'
import ProductTile from 'YesterTech/ProductTile.final'

function ProductProfile() {
  const { productId: productIdString } = useParams<{ productId: string }>()
  const productId = parseInt(productIdString, 10)

  // Cart
  const { addToCart, updateQuantity, getQuantity } = useShoppingCart()
  const quantity = getQuantity(productIdString)

  // Get Product
  const getProduct = useCallback(() => api.products.getProduct(productId), [productId])
  const [product] = usePromise(getProduct)

  if (!product) return <div>Loading...</div>

  return (
    <div className="spacing">
      <Columns gutters>
        <Column>
          <ProductImage src={product.imagePath} alt={product.name} size={15} />
        </Column>
        <Column flex className="spacing">
          <Heading>{product.name}</Heading>
          <StarRatings rating={product.rating} />
          <hr />
          <Columns split>
            <Column>
              <div className="text-small">
                <div>
                  <strong>Price: ${product.price.toFixed(2)}</strong>
                </div>
                <div>Brand: {product.brand}</div>
                <div>Category: {product.category}</div>
                <div>Condition: {product.condition}</div>
              </div>
            </Column>
            <Column className="spacing-small">
              <ShoppingCartButton
                onClick={() => addToCart(productIdString, product.name, product.price)}
                quantity={quantity}
              />
              {quantity > 0 && (
                <div className="align-right">
                  <Quantity
                    onChange={(q) => updateQuantity(productIdString, q)}
                    quantity={quantity}
                  />
                </div>
              )}
            </Column>
          </Columns>
          <p>{product.description}</p>
        </Column>
      </Columns>

      {Array.isArray(product.relatedProducts) && (
        <>
          <hr />
          <div>
            <Heading as="h2" size={4}>
              Related Products
            </Heading>
            <Tiles>
              {product.relatedProducts.map((relatedProductId) => (
                <ProductTile key={relatedProductId} productId={relatedProductId} />
              ))}
            </Tiles>
          </div>
        </>
      )}
    </div>
  )
}

export default ProductProfile
