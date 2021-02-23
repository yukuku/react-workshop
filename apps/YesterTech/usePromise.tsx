import * as React from 'react'

export function usePromise<ResponseType, ErrorType = any>(
  promise: () => Promise<ResponseType>
): [ResponseType | null, boolean, any] {
  const [state, dispatch] = React.useReducer(
    function promiseReducer(
      state: PromiseState<ResponseType>,
      action: PromiseActions<ResponseType, ErrorType>
    ): PromiseState<ResponseType> {
      switch (action.type) {
        case 'LOADING':
          return { ...state, loading: true }
        case 'RESOLVED':
          return {
            ...state,
            loading: false,
            response: action.response,
            error: null,
          }
        case 'ERROR':
          return {
            ...state,
            loading: false,
            response: null,
            error: action.error,
          }
        default:
          return state
      }
    },
    {
      loading: false,
      response: null,
      error: null,
    }
  )

  React.useEffect(() => {
    let isCurrent = true
    dispatch({ type: 'LOADING' })
    promise()
      .then((response) => {
        if (!isCurrent) {
          return
        }
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

export default usePromise

type PromiseState<ResponseType> = {
  loading: boolean
  response: null | ResponseType
  error: null | any
}

type PromiseActions<ResponseType, ErrorType> =
  | { type: 'LOADING' }
  | { type: 'RESOLVED'; response: ResponseType }
  | { type: 'ERROR'; error: ErrorType }
