import React from 'react'
import { connect, useSelector } from 'react-redux'
import Counter from './Counter'

// https://react-redux.js.org/api/hooks#useselector-examples

function PrimaryLayout() {
  const count = useSelector(({ counterState }) => {
    return counterState.count
  })

  return (
    <div>
      <h1>Redux Counter</h1>
      <div>Count: {count}</div>
      <Counter />
    </div>
  )
}

export default PrimaryLayout
