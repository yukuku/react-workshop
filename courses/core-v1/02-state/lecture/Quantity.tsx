import * as React from 'react'
// import * as ReactDOM from "react-dom"
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

export default function Quantity() {
  const [state, setState] = React.useState({
    quantity: 1,
    error: null,
  })
  const { quantity, error } = state
  // const quantity = state.quantity;
  // const error = state.error

  function subtract() {
    if (quantity > 0) {
      setState({
        quantity: quantity - 1,
        error: null,
      })
    } else {
      setState({
        ...state,
        error: 'Quantity must be above zero!',
      })
    }
  }

  function add() {
    setState({
      quantity: quantity + 1,
      error: null,
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
