import { useCallback } from 'react'
import { UserNoPassword } from 'YesterTech/types'
import { useSelector, useDispatch } from './store'

export const initialState: AuthState = {
  authenticated: false,
  user: null,
}

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
  state = state || initialState
  switch (action.type) {
    case 'auth/LOGIN': {
      return { ...state, authenticated: true, user: action.user }
    }
    case 'auth/LOGOUT': {
      return { ...initialState }
    }
    default:
      return state
  }
}

export function useAuthDispatch() {
  const dispatch = useDispatch()
  return useCallback(
    (action: LocalAuthActions) => {
      return dispatch({ ...action, type: `auth/${action.type}` } as AuthActions)
    },
    [dispatch]
  )
}

export function useAuthState(): AuthState {
  return useSelector((state) => state.auth)
}

export type AuthActionTypes = 'auth/LOGIN' | 'auth/LOGOUT'

export interface AuthState {
  authenticated: boolean
  user: null | UserNoPassword
}

type AuthActions =
  | {
      type: 'auth/LOGIN'
      user: UserNoPassword
    }
  | {
      type: 'auth/LOGOUT'
    }

type LocalAuthActions =
  | {
      type: 'LOGIN'
      user: UserNoPassword
    }
  | {
      type: 'LOGOUT'
    }
