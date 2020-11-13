import React, { useReducer } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

function useState(defaultState) {
  return useReducer((_, newState) => newState, defaultState)
}

export default function Quantity() {
  const [quantity, setQuantity] = useState(0)
  const [error, setError] = useState(null)

  function subtract() {
    const nextQuantity = quantity - 1
    setQuantity(nextQuantity)
    if (nextQuantity < 0) {
      setError('Cannot be less than zero')
    }
  }

  function add() {
    setQuantity(quantity + 1)
  }

  return (
    <div className="quantity-picker">
      <div>
        <div>
          <button onClick={subtract} type="button" className="icon-button">
            <FaMinusCircle />
          </button>
        </div>
        <div className="input-container">{quantity}</div>
        <div>
          <button onClick={add} type="button" className="icon-button">
            <FaPlusCircle />
          </button>
        </div>
      </div>
      <p>{error}</p>
    </div>
  )
}
