import React, { useState } from 'react'
// import ReactDOM from 'react-dom'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'ProjectPlanner/Minutes.scss'

export const Minutes = () => {
  const [minutes, setMinutes] = useState(0)

  function subtract() {
    setMinutes(minutes - 1)
  }

  function add() {
    setMinutes(minutes + 1)
  }

  return (
    <div className="minutes">
      <div>
        <button onClick={subtract} type="button">
          <FaMinusCircle />
        </button>
      </div>
      <input
        type="text"
        value={minutes}
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
  )
}
