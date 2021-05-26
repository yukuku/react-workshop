import React, { useState, useRef, useReducer } from 'react'
import { FaSignInAlt, FaExclamationCircle } from 'react-icons/fa'
import { User } from 'ProjectPlanner/types'
import { Heading } from 'ProjectPlanner/Heading'
import { Notice } from 'ProjectPlanner/Notice'
import { api } from 'ProjectPlanner/api'

type Props = {
  onAuthenticated(user: User): void
}

type ReducerState = {
  username: string
  password: string
  error: null | string
  loading: boolean
  showPassword: boolean
}

export const LoginForm: React.FC<Props> = ({ onAuthenticated }) => {
  const [state, dispatch] = useReducer(
    (state: ReducerState, action) => {
      switch (action.type) {
        case 'LOGIN': {
          return { ...state, loading: true }
        }
        case 'LOGIN_FAILED': {
          return { ...state, loading: false, error: action.error }
        }
        case 'TOGGLE_SHOW_PASSWORD': {
          return { ...state, showPassword: !state.showPassword }
        }
        case 'CHANGE_FIELD': {
          return { ...state, [action.field]: action.value }
        }
        default:
          return state
      }
    },
    {
      username: '',
      password: '',
      error: null,
      loading: false,
      showPassword: false,
    }
  )

  const { username, password, error, loading, showPassword } = state

  function handleLogin(event: React.FormEvent) {
    event.preventDefault()
    dispatch({ type: 'LOGIN' })

    api.auth
      .login(username, password)
      .then((user: User) => {
        onAuthenticated(user)
      })
      .catch((error) => {
        dispatch({ type: 'LOGIN_FAILED', error })
      })
  }

  function handleShowPassword() {
    dispatch({ type: 'TOGGLE_SHOW_PASSWORD' })
  }

  function changeField(field, value) {
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
            value={username}
            onChange={(event) => {
              changeField('username', event.target.value)
            }}
          />
        </div>
        <div>
          <input
            required
            className="form-field"
            aria-label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(event) => {
              changeField('password', event.target.value)
            }}
          />
          <label>
            <input
              defaultChecked={showPassword}
              onChange={handleShowPassword}
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
