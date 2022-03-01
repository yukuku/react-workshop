import React, { useState } from 'react'
import { Icon } from 'course-platform/Icon'

// const states: any = []
// let calls = -1

// function useState(defaultState: any) {
//   const callId = ++calls

//   if (states[callId]) {
//     return states[callId]
//   }

//   function setState(newState: any) {
//     states[callId][0] = newState
//     calls = -1
//     reRender()
//   }

//   const state = [defaultState, setState]
//   states[callId] = state // push
//   return state
// }

// const root = ReactDOM.createRoot(document.getElementById('root')!) // warning
// function reRender() {
//   root.render(<Counter />)
// }

type CounterProps = {
  count: number
  setCount(count: number): void
  min?: number
}

export function Counter({ count, setCount, min = 0 }: CounterProps) {
  const [showError, setShowError] = useState(false)

  function subtract() {
    const nextCount = count - 1
    setCount(nextCount)
    if (nextCount < min) {
      setShowError(true)
    }
  }

  function add() {
    setCount(count + 1)
  }

  return (
    <>
      <div className="counter inline-flex flex-gap">
        <div>
          <button onClick={subtract} className="button button-small">
            <Icon name="minus" />
          </button>
        </div>
        <input
          type="text"
          value={count}
          onChange={(event) => {
            setCount(parseInt(event.target.value))
          }}
        />
        <div>
          <button onClick={add} className="button button-small">
            <Icon name="plus" />
          </button>
        </div>
      </div>
      {showError && <p>Cannot be below zero</p>}
    </>
  )
}
