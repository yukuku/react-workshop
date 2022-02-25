import { useState, Fragment } from 'react'

import { Icon } from 'course-platform/Icon'

// const states = []
// let calls = -1

// function useState(defaultState: any) {
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

// const root = ReactDOM.createRoot(document.getElementById('root'))
// function reRender() {
//   root.render(<Counter />)
// }

type CounterProps = {
  count: number
  setCount(count: number): void
  // min?: number
}

export function Counter({ count, setCount }: CounterProps) {
  const [error, setError] = useState<string | null>(null)

  function subtract() {
    setCount(count - 1) // queues a re-render of the comp, such that useState returns -1
    if (count - 1 < 0) {
      setError('Cannot be less than 0')
    }
  }

  function add() {
    setCount(count + 1)
    if (count + 1 > 0) {
      setError(null)
    }
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
