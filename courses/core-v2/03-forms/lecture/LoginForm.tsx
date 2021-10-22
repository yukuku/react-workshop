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
  // const [error, setError] = useState(null)
  // const [loading, setLoading] = useState(false)
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')

  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'LOGIN':
          return { ...state, loading: true }
        case 'LOGIN_FAILED':
          return { ...state, loading: false, error: action.error }
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

  const { error, loading, password, username } = state

  const usernameRef = useRef<HTMLInputElement>()
  // const passwordRef = useRef<HTMLInputElement>()

  function handleLogin(event: React.FormEvent) {
    event.preventDefault()
    dispatch({ type: 'LOGIN' }) //describe what happened

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
            onChange={(e) => {
              setUsername(e.target.value)
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
            onChange={(e) => {
              setPassword(e.target.value)
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
