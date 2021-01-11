import React from 'react'
import { Link } from 'react-router-dom'
import { MdShoppingCart } from 'react-icons/md'

interface ShoppingCartButtonProps {
  quantity: number
  onClick: React.DOMAttributes<HTMLButtonElement>['onClick']
}

function ShoppingCartButton({ quantity, onClick }: ShoppingCartButtonProps) {
  return quantity > 0 ? (
    <Link to="/checkout" className="button cta-button">
      <MdShoppingCart />
      <span>Checkout</span>
    </Link>
  ) : (
    <button className="button" onClick={onClick}>
      Add To Cart
    </button>
  )
}

export default ShoppingCartButton
