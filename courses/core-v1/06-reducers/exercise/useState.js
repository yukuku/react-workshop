import * as React from 'react'
import isFunction from 'lodash.isfunction'

// This shows how useReducer can be used under the hood to re-create useState.
// TS made this really verbose and hard to read, so I added types separately.

export function useState(initialState) {
  let [state, dispatch] = React.useReducer(
    reducer,
    isFunction(initialState) ? initialState() : initialState
  )

  const setState = React.useCallback((next) => {
    dispatch({ next })
  }, [])

  return [state, setState]
}

function reducer(prevState, action) {
  return isFunction(action.next) ? action.next(prevState) : action.next
}
