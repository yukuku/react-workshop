import React, { useState, useRef, useEffect } from 'react'
// import { useUndoState, useLocalStorage } from './utils'

function useUndoState(state) {
  const [value, setValue] = state
  const historyRef = useRef([])

  function undo() {
    const previousValue = historyRef.current.pop()
    setValue(previousValue)
  }

  function updateValue(newValue) {
    historyRef.current.push(value)
    setValue(newValue)
  }

  return [value, updateValue, undo]
}

function useLocalStorage(state, key) {
  const [value, setValue] = state

  useEffect(() => {
    localStorage.setItem(key, value)
  }, [key, value])

  return [value, setValue]
}

function App() {
  const [color, setColor, undo] = useUndoState(
    useLocalStorage(
      useState(() => {
        return localStorage.getItem('color') || '#ff0000'
      }),
      'color'
    )
  )

  function changeColor(e) {
    setColor(e.target.value)
  }

  return (
    <div className="composing-state spacing">
      <div
        className="color-preview"
        style={{
          padding: '1rem',
          backgroundColor: color
        }}
      >
        <input type="color" value={color || ''} onChange={changeColor} aria-label="Color Picker" />
      </div>
      <button className="button" onClick={undo}>
        Undo
      </button>
    </div>
  )
}

export default App
