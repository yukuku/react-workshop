import React, { useState, useEffect } from 'react'
import './styles.scss'

export default function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState(null)
  const [saving, setSaving] = useState(false)

  const countRef = React.useRef()
  countRef.current = count

  useEffect(() => {
    if (saving) {
      setTimeout(() => {
        setMessage(`We saved a count of ${count}, but the latest count is ${countRef.current}`)
      }, 3000)
    }
  }, [count, saving])

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
