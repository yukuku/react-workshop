import React, { useState, useCallback, useMemo } from 'react'
import Heading from 'YesterTech/Heading'

export default function App() {
  const [count, setCount] = useState(0)

  const onClick = useCallback(() => {}, [])

  const user = useMemo(() => {
    // this function is called
    return {}
  }, [])

  return (
    <div className="align-center spacing">
      <Heading size={4}>Parent Component (App)</Heading>
      <button className="button" onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <hr />
      <UserProfile user={user} onClick={onClick} />
    </div>
  )
}

const UserProfile = React.memo(({ userId, onClick }) => {
  console.log('Render..')

  return (
    <div>
      <h1>{userId}</h1>
      <p className="text-small">
        Check the console to see how many times I render when the parent state changes
      </p>
      <button></button>
    </div>
  )
})
