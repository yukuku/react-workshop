import * as React from 'react'
import { connect } from 'react-redux'
import { actions } from './state/counterState'
import store from './store'

function Counter({ count }) {
  function decrement() {
    store.dispatch(actions.decrement())
  }
  function increment() {
    store.dispatch(actions.increment())
  }

  console.log('>>>', count)

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

function mapStateToProps({ counterState }) {
  return { count: counterState.count }
}

export default connect(mapStateToProps)(Counter)
