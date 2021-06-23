import React, { useState, useRef, useReducer } from 'react'
import { FaSignInAlt, FaExclamationCircle } from 'react-icons/fa'
import { User } from 'ProjectPlanner/types'
import { Heading } from 'ProjectPlanner/Heading'
import { Notice } from 'ProjectPlanner/Notice'
import { api } from 'ProjectPlanner/api'

type Props = {
  onAuthenticated(user: User): void
}

export const LoginForm: React.FC<Props> = ({ onAuthenticated }) => {
  // const [state, fn] = useReducer(fn, init)

  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'LOGIN':
          return { ...state, loading: true }
        case 'LOGIN_FAILED':
          return { ...state, loading: false, error: action.error }
        case 'CHANGE_FIELD':
          return { ...state, [action.field]: action.value }
        default:
          return state
      }
    },
    {
      error: null,
      loading: false,
      username: '',
      password: '',
    }
  )

  const { error, loading, username, password } = state

  const usernameRef = useRef<HTMLInputElement>()

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
        usernameRef.current.focus()
      })
  }

  function handleShowPassword(event: React.ChangeEvent) {
    // Explain generics for React.ChangeEvent or .checked wont work
    // console.log(event.target.checked)
    // Ultimately we don't need the event if we have "source of truth"
    // state for the checkbox.
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
              dispatch({ type: 'CHANGE_FIELD', field: 'username', value: event.target.value })
            }}
            ref={usernameRef}
          />
        </div>
        <div>
          <input
            required
            className="form-field"
            aria-label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              dispatch({ type: 'CHANGE_FIELD', field: 'password', value: event.target.value })
            }}
          />
          <label>
            <input className="passwordCheckbox" type="checkbox" /> show password
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
