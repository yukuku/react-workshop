import React, { useState, useEffect } from 'react'
import './styles.scss'

export default function App() {
  const [active, setActive] = useState(false)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (active) {
      setInterval(() => {
        console.log('Set Seconds')
        setSeconds(seconds => {
          return seconds + 1
        })
      }, 1000)
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
