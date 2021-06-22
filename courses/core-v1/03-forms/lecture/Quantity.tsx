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
      if (quantity >= 1) {
        return quantity - 1
      }
      return quantity
    })
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
        <div className="input-container">
          <input
            type="text"
            aria-label="quantity"
            value={quantity}
            onChange={(event) => {
              let input = event.target;
              let value = input.value
              let numberValue = parseInt(value, 10)

              if (typeof numberValue === 'number' && !isNaN(numberValue)) {
                setQuantity(numberValue)
              } else if (value === '') {
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
