import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'ProjectPlanner/Minutes.scss'

// const states = []
// let count = -1

// function useState(defaultState) {
//   const countId = ++count

//   if (states[countId]) {
//     return states[countId]
//   }

//   function setState(newState) {
//     states[countId][0] = newState
//     count = -1
//     reRender()
//   }

//   const state = [defaultState, setState]
//   states[countId] = state
//   return state
// }

// function reRender() {
//   ReactDOM.render(<Minutes />, document.getElementById('root'))
// }

export const Minutes = () => {
  const [minutes, setMinutes] = useState(0)
  const [error, setError] = useState<string>(null)

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
          <button onClick={subtract} type="button">
            <FaMinusCircle />
          </button>
        </div>
        <input
          type="text"
          value={minutes + 1}
          onChange={(e) => {
            setMinutes(parseInt(e.target.value))
          }}
        />
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
