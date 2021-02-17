import React, { useState, Fragment } from 'react'
// import ReactDOM from 'react-dom'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'ProjectPlanner/Minutes.scss'

export function App() {
  const [minutes, setMinutes] = useState(0)
  return <Minutes minutes={minutes} setMinutes={setMinutes} />
}

type Props = {
  minutes: number
  setMinutes: (x: number) => void
}

const Minutes: React.FC<Props> = ({ minutes, setMinutes }) => {
  const [error, setError] = useState('')

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
    <Fragment>
      <div className="minutes">
        <div>
          <button type="button" onClick={subtract}>
            <FaMinusCircle />
          </button>
        </div>
        <div>{minutes}</div>
        <div>
          <button type="button" onClick={add}>
            <FaPlusCircle />
          </button>
        </div>
      </div>
      {error && <p>{error}</p>}
    </Fragment>
  )
}
