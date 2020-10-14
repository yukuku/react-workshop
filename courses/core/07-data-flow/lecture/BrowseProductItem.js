import React, { useState } from 'react'
import Quantity from './Quantity'
import { useShoppingCart } from './ShoppingCartState'
import ProductImage from 'YesterTech/ProductImage'

function BrowseProductItem({ productId, name, price, imagePath, quantity }) {
  const { addToCart, updateQuantity } = useShoppingCart()

  return (
    <div className="browse-product-item">
      <ProductImage src={imagePath} size={7} alt={name} />
      <div>{name}</div>
      <div className="spacing-small">
        <button
          onClick={() => {
            addToCart(productId, name, price)
          }}
          className="button"
        >
          Add To Cart
        </button>
        {quantity > 0 && (
          <div className="align-right">
            <Quantity
              quantity={quantity}
              setQuantity={quantity => {
                updateQuantity(productId, quantity)
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default BrowseProductItem
