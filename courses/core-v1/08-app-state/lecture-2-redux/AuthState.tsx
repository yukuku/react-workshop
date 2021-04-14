import * as React from 'react'
import { UserNoPassword } from 'YesterTech/types'

// Might need to convert to a function for redux, unsure why 🧐
const initialState: AuthState = {
  authenticated: false,
  user: null,
}

function authReducer(state: AuthState, action: AuthActions): AuthState {
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

const AuthStateContext = React.createContext<AuthState>(initialState)
const AuthDispatchContext = React.createContext<AuthDispatch>(function dispatch() {})

export const AuthStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState)

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>{children}</AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  )
}

export function useAuthDispatch(): AuthDispatch {
  return React.useContext(AuthDispatchContext)
}

export function useAuthState(): AuthState {
  return React.useContext(AuthStateContext)
}

export interface AuthState {
  authenticated: boolean
  user: null | UserNoPassword
}

type AuthDispatch = React.Dispatch<AuthActions>

type AuthActions =
  | {
      type: 'LOGIN'
      user: UserNoPassword
    }
  | {
      type: 'LOGOUT'
    }

// 👀
type MappedRootAction<P extends string, T> = T extends { type: string }
  ? { type: `${P}/${T['type']}` } & Omit<T, 'type'>
  : never
type ReduxAuthActions = MappedRootAction<'auth', AuthActions>
