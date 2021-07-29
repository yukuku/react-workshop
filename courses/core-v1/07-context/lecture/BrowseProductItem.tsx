import * as React from 'react'
import Quantity from './Quantity'
import { useShoppingCart } from './ShoppingCartState'
import ProductImage from 'YesterTech/ProductImage'

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

function BrowseProductItem({ productId, name, price, imagePath }) {
  let { addToCart, updateQuantity, getQuantity } = useShoppingCart()

  const [quantity, setQuantity] = React.useState(0)

  function subtract() {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }

  function add() {
    setQuantity(quantity + 1)
  }

  let handleInputChange = (event) => {
    const sanitizedValue = event.target.value.replace(/[^0-9]/g, '')
    const newVal = parseInt(sanitizedValue)
    setQuantity(isNaN(newVal) ? 0 : newVal)
  }

  return (
    <div className="browse-product-item">
      <ProductImage src={imagePath} size={7} alt={name} />
      <div>{name}</div>
      <div className="spacing-small">
        <button
          className="button"
          onClick={() => {
            let itemsInCart = getQuantity(productId)
            if (itemsInCart < 1) {
              addToCart(productId, name, price, quantity)
            } else {
              updateQuantity(productId, quantity)
            }
            setQuantity(0)
          }}
        >
          Add To Cart
        </button>
        <div className="align-right">
          <Quantity
            add={add}
            quantity={quantity}
            subtract={subtract}
            handleInputChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  )
}

export default BrowseProductItem
