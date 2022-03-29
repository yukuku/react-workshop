import { useState } from 'react'
import { Icon } from 'course-platform/Icon'

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
//     reRender()
//   }

//   const state = [defaultState, setState]
//   states[callId] = state // same as a push
//   return state
// }

// function reRender() {
// }

type CounterProps = {
  count: number
  setCount(count: number): void
  min?: number
}

export function Counter({ count, setCount, min = 0 }: CounterProps) {
  const [error, setError] = useState<string | null>(null)

  function subtract() {
    setCount(count - 1)
    if (count - 1 < 0) {
      setError('Cannot be less than 0')
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
          onChange={(e) => {
            setCount(parseInt(e.target.value))
          }}
        />
        <div>
          <button onClick={add} className="button button-small">
            <Icon name="plus" />
          </button>
        </div>
      </div>
      {error && <p>{error}</p>}
    </>
  )
}
