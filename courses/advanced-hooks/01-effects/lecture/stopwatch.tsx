import * as React from 'react'
import './styles.scss'

export default function App() {
  const [active, setActive] = React.useState(false)
  const [seconds, setSeconds] = React.useState(0)

  const secondsRef = React.useRef<number>()
  secondsRef.current = seconds

  React.useEffect(() => {
    if (active) {
      const id = setInterval(() => {
        console.log('Set Seconds')
        setSeconds(secondsRef.current + 1)
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
