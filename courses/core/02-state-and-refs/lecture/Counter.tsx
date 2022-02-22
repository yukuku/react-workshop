import { useState } from 'react'
// import ReactDOM from 'react-dom'
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
  min?: number
}

export function Counter({ count, setCount, min = 0 }: CounterProps) {
  const [error, setError] = useState<string | null>(null)

  function subtract() {
    setCount(count - 1)
    if (count - 1 < min) {
      setError(`Count cannot be less than ${min}`)
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
        <div className="input">{count}</div>
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
