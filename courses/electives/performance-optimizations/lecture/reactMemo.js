import * as React from 'react'
import Heading from 'YesterTech/Heading'

export default function App() {
  const [count, setCount] = React.useState(0)

  // // useCallback DOES NOT call that function
  // const onUpdate = React.useCallback(() => {
  //   console.log('User was updated')
  // }, [])

  // // useMemo calls the function and memoizes the response
  // const user = React.useMemo(() => {
  //   return {}
  // }, [])

  const user = {}

  const update = () => {}

  return (
    <div className="align-center spacing">
      <Heading size={4}>Parent Component (App)</Heading>
      <button className="button" onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <hr />
      <UserProfile user={user} userId={5} onUpdate={onUpdate} />
    </div>
  )
}

const UserProfile = () => {
  console.log('Render')

  return (
    <div>
      <Heading size={4}>Child Component (UserProfile)</Heading>
      <p className="text-small">
        Check the console to see how many times I render when the parent state changes
      </p>
    </div>
  )
}
