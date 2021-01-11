import React from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

interface QuantityProps {
  onChange: (value: number) => void
  quantity?: number
}

function Quantity({ onChange, quantity = 1 }: QuantityProps) {
  function subtract() {
    if (quantity > 0) {
      onChange(quantity - 1)
    }
  }

  function add() {
    onChange(quantity + 1)
  }

  function handleChange(value: string) {
    const int = parseInt(value, 10)
    // disallow non-numeric values
    if (!isNaN(int)) {
      onChange(int)
    }
  }

  function handleInputBlur(event: React.FocusEvent<HTMLInputElement>) {
    if (event.target.value.trim() === '') {
      onChange(0)
    }
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    // keep cursor from going back/forth
    event.preventDefault()
    if (event.key === 'ArrowUp') {
      add()
    } else if (event.key === 'ArrowDown') {
      subtract()
    }
  }

  return (
    <div className="quantity-picker">
      <div>
        <div>
          <button type="button" className="icon-button" onClick={subtract}>
            <FaMinusCircle />
          </button>
        </div>
        <div className="input-container">
          <input
            type="text"
            aria-label="quantity"
            value={quantity}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
          />
        </div>
        <div>
          <button type="button" className="icon-button" onClick={add}>
            <FaPlusCircle />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Quantity
