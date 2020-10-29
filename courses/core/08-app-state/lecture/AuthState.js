import React, { useContext, useReducer, useEffect } from 'react'
import api from 'YesterTech/api'

const AuthStateContext = React.createContext()

const initialState = {
  authenticated: false,
  user: null
}

export function AuthStateProvider({ children }) {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return { ...state, authenticated: true, user: action.user }
      case 'LOGOUT':
        return { ...initialState }
      default:
        return state
    }
  }, initialState)

  useEffect(() => {
    api.auth.getAuthenticatedUser().then(user => {
      dispatch({ type: 'LOGIN', user })
    })
  }, [])

  const value = {
    ...state,
    dispatch
  }

  return <AuthStateContext.Provider value={value} children={children} />
}

export function useAuthState() {
  return useContext(AuthStateContext)
}
