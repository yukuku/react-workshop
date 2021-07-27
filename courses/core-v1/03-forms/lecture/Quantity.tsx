import * as React from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

function LoadingSpinner() {
  return null
}

const fetchReducer = (previousState, action) => {
  switch (action.type) {
    case 'FETCH':
      if (previousState === 'PENDING') {
        return previousState
      }

      return {
        error: null,
        status: 'PENDING',
        data: null,
      }
    case 'RESOLVED':
      if (action.statusCode >= 300) {
        return {
          error: action.message,
          status: 'ERROR',
          data: null,
        }
      }
      return {
        error: null,
        status: 'RESOLVED',
        data: action.data,
      }
    case 'REJECTED':
      return {
        error: action.message,
        status: 'ERROR',
        data: null,
      }
  }
}

const initialState = {
  error: null,
  status: 'IDLE',
  data: null,
}

function FetchButton() {
  let [state, dispatch] = React.useReducer(fetchReducer, initialState)
  let { status, error, data } = state

  React.useEffect(() => {
    if (status === 'PENDING') {
      fetch('https://someapi.com')
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          dispatch({
            type: 'RESOLVED',
            statusCode: data.statusCode,
            message: data.message,
            data,
          })
        })
        .catch((error) => {
          dispatch({
            type: 'REJECTED',
            message: error.message,
          })
        })
    }
  }, [status])

  if (status === 'RESOLVED') {
    return null
  }

  return (
    <div>
      <button
        disabled={status === 'PENDING'}
        onClick={() => {
          dispatch({ type: 'FETCH' })
        }}
      >
        {status === 'PENDING' ? <LoadingSpinner /> : 'Fetch Data'}
      </button>
      {status === 'ERROR' ? <p>{error}</p> : null}
      <div>
        <SomeCustomComponent
          status={status}
          triggerFetch={() => {
            dispatch({ type: 'FETCH' })
          }}
        />
      </div>
    </div>
  )
}

function SomeCustomComponent(props) {
  let triggerFetch = props.triggerFetch
  return (
    <div>
      <h2>Status Report</h2>
      <div>{props.status}</div>
      <button onClick={triggerFetch}>Fetch again</button>
    </div>
  )
}

const reducer = (previousState, action) => {
  switch (action.type) {
    case 'INPUT': {
      let value = action.value
      let numericValue = parseInt(value, 10)
      if (!isNaN(numericValue)) {
        if (numericValue >= 0) {
          return {
            quantity: numericValue,
            error: null,
          }
        }
      }
      return { ...previousState, error: 'Yo! Invalid number, try again' }
    }
    case 'ADD':
      return {
        error: null,
        quantity: previousState.quantity + 1,
      }
    case 'SUBTRACT':
      if (previousState.quantity < 1) {
        return {
          error: 'Ooops! Value should be at least 0',
          quantity: previousState.quantity,
        }
      }
      return {
        error: null,
        quantity: previousState.quantity - 1,
      }
    default:
      return previousState
  }
}

function Quantity() {
  const [state, dispatch] = React.useReducer(reducer, {
    quantity: 0,
    error: null,
  })

  const { quantity, error } = state

  function add() {
    dispatch({ type: 'ADD' })
  }
  function subtract() {
    dispatch({ type: 'SUBTRACT' })
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
              dispatch({
                type: 'INPUT',
                value: event.target.value,
              })
            }}
          />
        </div>
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

export default Quantity
