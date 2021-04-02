import React from 'react'
import ReactDOM from 'react-dom'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'ProjectPlanner/Minutes.scss'

// const states = []
// let calls = -1

// function useState(defaultState) {
//   const callId = ++calls

//   if (states[callId]) {
//     return states[callId]
//   }

//   function setState(newValue) {
//     states[callId][0] = newValue
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

export const Minutes = ({ minutes, setMinutes }) => {
  const [error, setError] = React.useState(null) // 1

  function subtract() {
    const nextMinutes = minutes - 1
    setMinutes(nextMinutes)
    if (nextMinutes < 0) {
      setError('Cannot be less than 0')
    }
  }

  function add() {
    setMinutes(minutes + 1)
  }

  return (
    <>
      <div className="minutes">
        <div>
          <button type="button" onClick={subtract}>
            <FaMinusCircle />
          </button>
        </div>
        <input value={minutes} onChange={(e) => setMinutes(parseInt(e.target.value))} />
        <div>
          <button type="button" onClick={add}>
            <FaPlusCircle />
          </button>
        </div>
      </div>
      <p></p>
    </>
  )
}
