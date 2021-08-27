import React, { useState } from 'react'
// import ReactDOM from 'react-dom'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'ProjectPlanner/Minutes.scss'

// const states = []
// let calls = -1

// function useState(defaultState) {
//   const callId = ++calls

//   if (states[callId]) {
//     return states[callId]
//   }

//   function setState(newState) {
//     states[callId][0] = newState
//     calls = -1
//     reRender()
//   }

//   const state = [defaultState, setState]
//   states[callId] = state
//   return state
// }

// function reRender() {
//   ReactDOM.render(<Minutes />, document.getElementById('root'))
// }

export const Minutes = () => {
  const [minutes, setMinutes] = useState(0)
  const [error, setError] = useState(null) // 1

  function subtract() {
    const nextMinutes = minutes - 1
    setMinutes(nextMinutes)
    if (nextMinutes < 0) {
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
        <input
          type="text"
          value={minutes}
          onChange={(event) => {
            setMinutes(parseInt(event.target.value))
          }}
        />
        <div>
          <button onClick={add} type="button">
            <FaPlusCircle />
          </button>
        </div>
      </div>
      {error && <div>{error}</div>}
    </>
  )
}
