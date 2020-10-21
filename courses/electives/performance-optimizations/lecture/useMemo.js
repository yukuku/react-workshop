import React, { useState, useMemo } from 'react'
import { reallyLongRunningFunction } from './utils'

export default function App({ input }) {
  const [count, setCount] = useState(0)

  console.time()
  const x = useMemo(() => reallyLongRunningFunction(input), [input])
  console.timeEnd()

  return (
    <div className="align-center">
      <button className="button" onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <p>Notice the delay when we click!</p>
    </div>
  )
}
