import React, { useState, useEffect, useRef } from 'react'
import './styles.scss'

export default function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState(null)
  const [saving, setSaving] = useState(false)

  const countRef = useRef()
  countRef.current = count

  useEffect(() => {
    if (saving) {
      setTimeout(() => {
        setMessage(`We saved a count of ${count}, but the latest count is ${countRef.current}`)
      }, 3000)
    }
  }, [saving])

  function saveToDatabase() {
    setSaving(true)
  }

  return (
    <div className="align-center spacing closure-basics">
      <button className="button" onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <hr />
      <button className="button" onClick={saveToDatabase}>
        Save Count to Database
      </button>
      {message && <p>{message}</p>}
    </div>
  )
}
