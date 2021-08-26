import * as React from 'react'
import { UserNoPassword } from 'YesterTech/types'

const initialState: AuthState = {
  authenticated: false,
  user: null,
}

const AuthStateContext = React.createContext<AuthStateContextValue>(initialState)

const AuthDispatchContext = React.createContext<AuthDispatch>(() => {})

export const AuthStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(function authReducer(
    state: AuthState,
    action: AuthActions
  ): AuthState {
    switch (action.type) {
      case 'LOGIN':
        return { ...state, authenticated: true, user: action.user }
      case 'LOGOUT':
        return { ...initialState }
      default:
        return state
    }
  },
  initialState)
  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>{children}</AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  )
}

export function useAuthState() {
  return React.useContext(AuthStateContext)
}

type AuthState = {
  authenticated: boolean
  user: null | UserNoPassword
}

type AuthDispatch = React.Dispatch<AuthActions>

type AuthStateContextValue = AuthState

type AuthActions =
  | {
      type: 'LOGIN'
      user: UserNoPassword
    }
  | {
      type: 'LOGOUT'
    }

// 👀👀👀
export function useAuthDispatch() {
  return React.useContext(AuthDispatchContext)
}
