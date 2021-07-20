import * as React from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

function Quantity() {
  const [quantity, setQuantity] = React.useState(1)

  function add() {
    setQuantity((quantity) => quantity + 1)
  }

  function subtract() {
    setQuantity((quantity) => {
      if (quantity > 0) {
        return quantity - 1
      }
      return quantity
    })
  }

  console.log({ quantity })

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
        <div className="input-container">
          <input
            type="text"
            aria-label="quantity"
            value={quantity}
            onChange={(event) => {
              let rawValue = event.target.value
              let value = parseInt(rawValue, 10)
              if (!isNaN(value) && value >= 0) {
                setQuantity(value)
              } else if (rawValue === '') {
                setQuantity(0)
              }
             }}
          />
        </div>
        <div>
          <button type="button" className="icon-button" aria-label="Add an item" onClick={add}>
            <FaPlusCircle />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Quantity
