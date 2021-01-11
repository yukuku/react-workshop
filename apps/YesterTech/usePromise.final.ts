import { useReducer, useEffect } from 'react'

interface PromiseLoadingEvent {
  type: 'LOADING'
}

interface PromiseResolvedEvent<T> {
  type: 'RESOLVED'
  response: T
}

interface PromiseErrorEvent {
  type: 'ERROR'
  error: unknown
}

type PromiseEvent<T> = PromiseLoadingEvent | PromiseResolvedEvent<T> | PromiseErrorEvent

interface PromiseState<T> {
  loading: boolean
  response: T | null
  error: unknown | null
}

type PromiseReducer<T> = (state: PromiseState<T>, action: PromiseEvent<T>) => PromiseState<T>

function createPromiseReducer<T>(): PromiseReducer<T> {
  const promiseReducer: PromiseReducer<T> = (state, action) => {
    switch (action.type) {
      case 'LOADING':
        return { ...state, loading: true }
      case 'RESOLVED':
        return { ...state, loading: false, response: action.response, error: null }
      case 'ERROR':
        return { ...state, loading: false, response: null, error: action.error }
      default:
        return state
    }
  }

  return promiseReducer
}

export default function usePromise<T>(
  promise: () => Promise<T>
): [PromiseState<T>['response'], PromiseState<T>['loading'], PromiseState<T>['error']] {
  const [state, dispatch] = useReducer(createPromiseReducer<T>(), {
    loading: false,
    response: null,
    error: null,
  })

  useEffect(() => {
    let isCurrent = true
    dispatch({ type: 'LOADING' })
    promise()
      .then((response) => {
        if (!isCurrent) return
        dispatch({ type: 'RESOLVED', response })
      })
      .catch((error) => {
        dispatch({ type: 'ERROR', error })
      })
    return () => {
      isCurrent = false
    }
  }, [promise])

  return [state.response, state.loading, state.error]
}
