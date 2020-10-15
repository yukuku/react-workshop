import React, { useReducer } from 'react'
import { FaSignInAlt, FaExclamationCircle } from 'react-icons/fa'

import Heading from 'YesterTech/Heading'
import Notice from 'YesterTech/Notice'
import Centered from 'YesterTech/Centered'
import api from 'YesterTech/api'

// function useState(defaultState) {
//   return useReducer((_, newValue) => newValue, defaultState)
// }

function LoginForm({ onAuthenticated }) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'LOGIN':
          return { ...state, loading: true }
        case 'LOGIN_FAILED':
          return { ...state, loading: false, error: action.error }
        case 'TOGGLE_SHOW_PASSWORD':
          return { ...state, showPassword: !state.showPassword }
        case 'CHANGE_FIELD':
          return { ...state, [action.field]: action.value }
        default:
          return state
      }
    },
    {
      username: '',
      password: '',
      error: null,
      loading: false,
      showPassword: false
    }
  )

  const { username, password, error, loading, showPassword } = state

  function handleLogin(event) {
    event.preventDefault()
    dispatch({ type: 'LOGIN' })
    api.auth
      .login(username, password)
      .then(user => {
        if (typeof onAuthenticated === 'function') {
          onAuthenticated(user)
        }
      })
      .catch(error => {
        dispatch({ type: 'LOGIN_FAILED', error })
      })
  }

  function changeField(field, value) {
    dispatch({ type: 'CHANGE_FIELD', field, value })
  }

  return (
    <Centered className="spacing">
      <Heading>Login</Heading>
      <form onSubmit={handleLogin} className="spacing">
        {error && (
          <Notice type="error">
            <FaExclamationCircle />
            <span>{error}</span>
          </Notice>
        )}

        <div className="form-field">
          <input
            aria-label="Username"
            onChange={e => {
              changeField('username', e.target.value)
            }}
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="form-field">
          <input
            aria-label="Password"
            onChange={e => {
              changeField('password', e.target.value)
            }}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
          />
          <label>
            <input
              onChange={() => {
                dispatch({ type: 'TOGGLE_SHOW_PASSWORD' })
              }}
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
    </Centered>
  )
}

export default LoginForm
