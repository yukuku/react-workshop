import React, { useState, Fragment } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'ProjectPlanner/Minutes.scss'

export const Minutes = ({ minutes, onChange, min = 0 }) => {
  function subtract() {
    if (minutes > min) {
      onChange(minutes - 1)
    }
  }

  function add() {
    onChange(minutes + 1)
  }

  return (
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
  )
}
