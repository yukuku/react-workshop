import React, { useState } from 'react'
import { useProducts } from './utils'
// import { useShoppingCart } from './ShoppingCartState'
import BrowseProductItem from './BrowseProductItem'

function BrowseProducts() {
  const products = useProducts()

  const { cart } = useContext(???)

  return (
    <div className="spacing">
      <nav>
        <span>View Cart ({cart.length})</span>
      </nav>
      <hr />
      {Array.isArray(products) &&
        products.map(product => {
          return (
            <BrowseProductItem
              key={product.id}
              productId={product.id}
              name={product.name}
              price={product.price}
              imagePath={product.imagePath}
            />
          )
        })}
    </div>
  )
}

export default BrowseProducts
