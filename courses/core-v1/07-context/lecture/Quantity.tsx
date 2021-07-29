/* eslint-disable no-dupe-args */
import * as React from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

function Quantity({ subtract, add, quantity, handleInputChange }): React.ReactElement {
  return (
    <div className="quantity-picker">
      <div>
        <div>
          <button
            onClick={subtract}
            type="button"
            className="icon-button"
            aria-label="Remove an item"
          >
            <FaMinusCircle />
          </button>
        </div>
        <div className="input-container">
          <input
            type="text"
            aria-label="quantity"
            value={quantity}
            pattern="[0-9]"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button onClick={add} type="button" className="icon-button" aria-label="Add an item">
            <FaPlusCircle />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Quantity
