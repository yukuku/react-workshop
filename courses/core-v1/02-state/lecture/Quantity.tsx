import * as React from 'react'
// import * as ReactDOM from "react-dom"
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

export default function Quantity() {
  let [quantity, setQuantity] = React.useState(5)
  let [error, setError] = React.useState(null)

  function subtract() {
    if (quantity > 1) {
      setQuantity(quantity - 1)
      setError(null)
    } else {
      setError('Quantity must be at least 1!')
    }
  }

  function add() {
    setQuantity(quantity + 1)
    setError(null)
  }

  return (
    <div className="quantity-picker">
      <div>
        <div>
          <button
            type="button"
            className="icon-button"
            aria-label="Remove an item"
            onClick={subtract}
          >
            <FaMinusCircle />
          </button>
        </div>
        <div className="input-container">{quantity}</div>
        <div>
          <button type="button" className="icon-button" aria-label="Add an item" onClick={add}>
            <FaPlusCircle />
          </button>
        </div>
      </div>
      <div>{error}</div>
    </div>
  )
}
