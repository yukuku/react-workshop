import React, { useState, useReducer } from 'react'
import { FaSignInAlt, FaExclamationCircle } from 'react-icons/fa'
import { User as UserType } from 'ProjectPlanner/types'
import { Heading } from 'ProjectPlanner/Heading'
import { Notice } from 'ProjectPlanner/Notice'
import { api } from 'ProjectPlanner/api'

type Props = {
  onAuthenticated(user: UserType): void
}

type StateType = {
  username: string
  password: string
  showPassword: boolean
  error: string | null
  loading: boolean
}

type ActionTypes =
  | { type: 'FETCH' }
  | { type: 'ERROR'; error: string }
  | { type: 'SUCCESS' }
  | { type: 'TOGGLE_SHOW_PASSWORD' }
  | { type: 'CHANGE_FIELD'; field: string; value: string }

const initialState = {
  username: '',
  password: '',
  showPassword: false,
  error: null,
  loading: false,
}

function stateReducer(state: StateType, action: ActionTypes): StateType {
  switch (action.type) {
    case 'FETCH':
      return { ...state, error: null, loading: true }
    case 'ERROR':
      return { ...state, error: action.error, loading: false }
    case 'SUCCESS':
      return { ...state, error: null, loading: false }
    case 'TOGGLE_SHOW_PASSWORD':
      return { ...state, showPassword: !state.showPassword }
    case 'CHANGE_FIELD':
      if (!state.loading) {
        return { ...state, [action.field]: action.value }
      }
      return state
    default:
      return state
  }
}

export const LoginForm: React.FC<Props> = ({ onAuthenticated }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState)

  const { username, password, showPassword, error, loading } = state

  function handleLogin(event: React.FormEvent) {
    event.preventDefault()
    dispatch({ type: 'FETCH' })
    api.auth
      .login(username, password)
      .then((user: UserType) => {
        dispatch({ type: 'SUCCESS' })
        onAuthenticated(user)
      })
      .catch((error) => {
        dispatch({ type: 'ERROR', error })
      })
  }

  function handleShowPassword() {
    dispatch({ type: 'TOGGLE_SHOW_PASSWORD' })
  }

  function changeField(field: string, value: string) {
    dispatch({ type: 'CHANGE_FIELD', field, value })
  }

  return (
    <div>
      <Heading>Login</Heading>
      <form onSubmit={handleLogin} className="spacing">
        {error && (
          <Notice type="error">
            <FaExclamationCircle />
            <span>{error}</span>
          </Notice>
        )}

        <div>
          <input
            required
            className="form-field"
            aria-label="Username"
            type="text"
            placeholder="Username"
            onChange={(event) => changeField('username', event.target.value)}
          />
        </div>
        <div>
          <input
            required
            className="form-field"
            aria-label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            onChange={(event) => changeField('password', event.target.value)}
          />
          <label>
            <input
              onChange={handleShowPassword}
              defaultChecked={showPassword}
              className="passwordCheckbox"
              type="checkbox"
            />{' '}
            show password
          </label>
        </div>

        <footer>
          <button type="submit" className="button">
            {!loading ? (
              <>
                <FaSignInAlt /> <span>Login</span>
              </>
            ) : (
              <span>Loading ...</span>
            )}
          </button>
        </footer>
      </form>
    </div>
  )
}

export default LoginForm
