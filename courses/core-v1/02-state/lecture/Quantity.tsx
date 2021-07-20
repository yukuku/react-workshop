import { any } from 'prop-types'
import * as React from 'react'
// import * as ReactDOM from "react-dom"
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

export default function QuantityFunction() {
  const [quantity, setQuantity] = React.useState(10)
  const [error, setError] = React.useState(null)

  function subtract() {
    if (quantity > 0) {
      setQuantity(quantity - 1)
      setError(null)
    } else {
      setError('Whooooah, quantity should at least be zero!')
    }
  }

  function add() {
    setQuantity(quantity + 1)
    setError(null)
  }

  return (
    <div>
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
      </div>
      <div>
        <div>{error}</div>
      </div>
    </div>
  )
}
