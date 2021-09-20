import * as React from 'react'
import './styles.scss'

export default function App() {
  const [count, setCount] = React.useState(0)
  const [message, setMessage] = React.useState<string | null>(null)
  const [saving, setSaving] = React.useState(false)

  const countRef = React.useRef<number>()
  countRef.current = count

  React.useEffect(() => {
    if (saving) {
      setTimeout(() => {
        setMessage(`We saved a count of ${count}, but the latest count is: ${countRef.current}`)
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
