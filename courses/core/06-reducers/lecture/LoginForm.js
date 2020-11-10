import React, { useReducer } from 'react'
import { FaSignInAlt, FaExclamationCircle } from 'react-icons/fa'

import Heading from 'YesterTech/Heading'
import Notice from 'YesterTech/Notice'
import Centered from 'YesterTech/Centered'
import api from 'YesterTech/api'

function useState(defaultState) {
  return useReducer((_, newState) => newState, defaultState)
}

const machine = {
  idle: {
    FETCH: 'loading'
  },
  loading: {
    SUCCESS: 'success',
    FAIL: 'fail'
  },
  success: {},
  fail: {
    RETRY: 'loading'
  }
}

function LoginForm({ onAuthenticated }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [state, dispatch] = useReducer(
    (state, event) => {
      const nextState = machine[state.current][event.type]
      return nextState
        ? {
            current: nextState,
            ...event.payload
          }
        : state
    },
    {
      current: 'idle'
    }
  )

  console.log(state)

  const { error, loading } = state

  function handleLogin(event) {
    event.preventDefault()
    dispatch({ type: 'FETCH' })
    api.auth
      .login(username, password)
      .then(user => {
        if (typeof onAuthenticated === 'function') {
          onAuthenticated(user)
        }
        dispatch({ type: 'SUCCESS', payload: user })
      })
      .catch(error => {})
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
              setUsername(e.target.value)
            }}
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="form-field">
          <input
            aria-label="Password"
            onChange={e => {
              setPassword(e.target.value)
            }}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
          />
          <label>
            <input
              onChange={() => setShowPassword(!showPassword)}
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
