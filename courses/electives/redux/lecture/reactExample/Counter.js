import * as React from 'react'
import { connect, useDispatch } from 'react-redux'
import { actions } from './state/counterState'
import store from './store'

function Counter() {
  function decrement() {
    store.dispatch(actions.decrement())
  }
  function increment() {
    store.dispatch(actions.increment())
  }

  return (
    <div className="horizontal-spacing">
      <button className="button" onClick={decrement}>
        Decrement
      </button>
      <button className="button" onClick={increment}>
        Increment
      </button>
    </div>
  )
}

export default connect()(Counter)
