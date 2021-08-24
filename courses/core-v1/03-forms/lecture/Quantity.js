import * as React from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

function Quantity() {
  let [state, dispatch] = React.useReducer(reducer, { error: null, quantity: 1 })
  let { quantity } = state

  function add(by = 1) {
    dispatch({ type: 'ADD' })
  }

  function subtract(by = 1) {
    dispatch({ type: 'SUBTRACT', by })
  }

  return (
    <div className="quantity-picker">
      <div>
        <div>
          <button
            type="button"
            className="icon-button"
            aria-label="Remove an item"
            onClick={() => subtract()}
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
              dispatch({ type: 'INPUT', value: event.target.value })
            }}
          />
        </div>
        <div>
          <button
            type="button"
            className="icon-button"
            aria-label="Add an item"
            onClick={() => add()}
          >
            <FaPlusCircle />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Quantity

// type State = {
//   error: null | string
//   quantity: number
// }

/**
 * @typedef {{ error: null | string; quantity: number }} State
 */
/**
 * @typedef {{ type: 'ADD'; by?: number }
 *   | { type: 'SUBTRACT'; by?: number }
 *   | { type: 'INPUT'; value: string }
 * } Action
 */

/**
 *
 * @param {State} state
 * @param {Action} action
 * @returns {State}
 */
function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return {
        error: null,
        quantity: state.quantity + (action.by ?? 1),
      }
    case 'SUBTRACT':
      let newValue = state.quantity - (action.by ?? 1)
      if (newValue >= 1) {
        return {
          error: null,
          quantity: newValue,
        }
      }
      return {
        error: 'Value must be at least 1',
        quantity: state.quantity,
      }

    case 'INPUT': {
      let stringValue = action.value
      let value = parseInt(stringValue, 10)
      if (!isNaN(value) && value >= 1) {
        return {
          quantity: value,
          error: null,
        }
      } else if (stringValue === '') {
        return {
          quantity: 0,
          error: null,
        }
      }
      return state
    }
    default:
      throw Error('No bueno')
  }
}
