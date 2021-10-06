import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'ProjectPlanner/Minutes.scss'

// const states = []
// let count = -1

// function useState(defaultState) {
//   const callId = ++count

//   if (states[callId]) {
//     return states[callId]
//   }

//   function setState(newState) {
//     states[callId][0] = newState
//     count = -1
//     render()
//   }

//   const state = [defaultState, setState]
//   states[callId] = state
//   return state
// }

// function render() {
//   ReactDOM.render(<Minutes />, document.getElementById('root'))
// }

export const Minutes = ({ minutes, setMinutes }) => {
  const [error, setError] = useState(null) // 1

  function subtract() {
    const newMinutes = minutes - 1
    setMinutes(newMinutes)
    if (newMinutes < 0) {
      setError('cannot be less than 0')
    }
  }

  function add() {
    setMinutes(minutes + 1)
  }

  return (
    <>
      <div className="minutes">
        <div>
          <button onClick={subtract} type="button">
            <FaMinusCircle />
          </button>
        </div>
        <div>{minutes}</div>
        <div>
          <button onClick={add} type="button">
            <FaPlusCircle />
          </button>
        </div>
      </div>
      {error && <p>{error}</p>}
    </>
  )
}

React.createElement(React.Fragment, null)
