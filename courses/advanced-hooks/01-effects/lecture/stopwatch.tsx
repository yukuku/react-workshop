import * as React from 'react'
import './styles.scss'

function useState(initialState) {
  return React.useReducer(
    (state, newState) => (typeof newState === 'function' ? newState(state) : newState),
    initialState
  )
}

export default function App() {
  const [active, setActive] = useState(false)
  const [seconds, setSeconds] = useState(0)

  React.useEffect(() => {
    if (active) {
      const id = setInterval(() => {
        setSeconds((seconds) => {
          return seconds + 1
        })
      }, 1000)
      return () => {
        clearInterval(id)
      }
    }
  }, [active])

  return (
    <div className="align-center spacing stopwatch">
      <div className="horizontal-spacing">
        <button className="button" onClick={() => setActive(true)}>
          Start
        </button>
        <button className="button" onClick={() => setActive(false)}>
          Stop
        </button>
      </div>
      <hr />
      <div>Seconds: {seconds}</div>
    </div>
  )
}
