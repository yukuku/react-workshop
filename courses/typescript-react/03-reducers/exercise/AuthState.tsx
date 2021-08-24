import * as React from 'react'
import type { UserNoPassword } from 'YesterTech/types'

const initialState: AuthState = {
  authenticated: false,
  user: null,
}

const AuthStateContext = React.createContext<AuthState>(initialState)
const AuthDispatchContext = React.createContext<React.Dispatch<AuthAction>>(() => {})

export enum AuthActionType {
  Login = 'LOGIN',
  Logout = 'LOGOUT',
}

type AuthAction =
  | { type: AuthActionType.Login; user: UserNoPassword }
  | { type: AuthActionType.Logout }

function reducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionType.Login: {
      return {
        ...state,
        authenticated: true,
        user: action.user,
      }
    }
    case AuthActionType.Logout: {
      return initialState
    }
    default:
      return state
  }
}

export const AuthStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>{children}</AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  )
}

export function useAuthDispatch() {
  return React.useContext(AuthDispatchContext)
}

export function useAuthState() {
  return React.useContext(AuthStateContext)
}

interface AuthState {
  authenticated: boolean
  user: null | UserNoPassword
}
