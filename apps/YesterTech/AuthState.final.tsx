import React, { useContext, useReducer, useCallback } from 'react'
import { UserData } from './types'

const AuthStateContext = React.createContext(null as any)

interface AuthState {
  authenticated: boolean
  user: UserData | null
}

const initialState = {
  authenticated: false,
  user: null,
}

interface LoginEvent {
  type: 'LOGIN'
  authenticated: boolean
  user: UserData
}

interface LogoutEvent {
  type: 'LOGOUT'
}

type AuthStateEvent = LoginEvent | LogoutEvent

const authStateReducer = (state: AuthState, action: AuthStateEvent): AuthState => {
  switch (action.type) {
    case 'LOGIN': {
      return { ...state, authenticated: true, user: action.user }
    }
    case 'LOGOUT': {
      return { ...initialState }
    }
    default:
      return state
  }
}

export const AuthStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authStateReducer, initialState)

  const value = {
    ...state,
    dispatch,
  }

  return <AuthStateContext.Provider value={value} children={children} />
}

export function useAuthState() {
  return useContext(AuthStateContext)
}
