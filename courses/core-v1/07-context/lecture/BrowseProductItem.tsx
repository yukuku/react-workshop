import * as React from 'react'
import Quantity from './Quantity'
// import { useShoppingCart } from './ShoppingCartState'
import ProductImage from 'YesterTech/ProductImage'
import { CartContext } from './PrimaryLayout'

interface BrowseProductItemProps {
  productId: number
  name: string
  price: number
  imagePath: string
  year?: string
  condition?: string
  brand?: string
  category?: string
  rating?: number
}

function BrowseProductItem({ productId, name, price, imagePath }: BrowseProductItemProps) {
  let { getQuantity, updateQuantity, addToCart } = React.useContext(CartContext)

  let quantity = getQuantity(productId)

  function subtract() {
    if (quantity > 0) {
      updateQuantity(productId, quantity - 1)
    }
  }

  function add() {
    if (quantity > 0) {
      updateQuantity(productId, quantity + 1)
    } else {
      addToCart(productId, name, price)
    }
  }

  function handleInputChange(event) {
    const sanitizedValue = event.target.value.replace(/[^0-9]/g, '')
    const newVal = parseInt(sanitizedValue)
    if (quantity > 0 && !isNaN(newVal)) {
      updateQuantity(productId, newVal)
    } else {
      addToCart(productId, name, price, newVal)
    }
  }

  return (
    <div className="browse-product-item">
      <ProductImage src={imagePath} size={7} alt={name} />
      <div>{name}</div>
      <div className="spacing-small">
        <button className="button">Add To Cart ({quantity})</button>
        <div className="align-right">
          <Quantity
            quantity={quantity}
            add={add}
            subtract={subtract}
            onInputChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  )
}

export default BrowseProductItem
