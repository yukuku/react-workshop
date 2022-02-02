import React, { useContext, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Heading } from 'ProjectPlanner/Heading'
import { api } from 'ProjectPlanner/api'
import { FaSignInAlt, FaExclamationCircle } from 'react-icons/fa'
import { Notice } from 'ProjectPlanner/Notice'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

///////

const AuthContext = React.createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    let isCurrent = true
    api.auth.getAuthenticatedUser().then((user) => {
      if (user && isCurrent) {
        setUser(user)
      }
    })
    return () => (isCurrent = false)
  }, [])

  const context = {
    user,
    setUser,
  }

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw Error('You are trying to consumer AuthContext but youre not in the provider')
  }
  return context
}

///////

function App() {
  const { user } = useContext(AuthContext)
  return user ? <PrimaryLayout /> : <UnauthenticatedLayout />
}

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
)

//////

function PrimaryLayout() {
  const { user, setUser } = useContext(AuthContext)

  function logout() {
    api.auth.logout().then(() => {
      setUser(null)
    })
  }

  return (
    <div className="card spacing">
      <Heading>Welcome {user.name}</Heading>
      <div>
        <button onClick={logout} className="button">
          Logout
        </button>
      </div>
    </div>
  )
}

function UnauthenticatedLayout() {
  const { setUser } = useAuth() // useContext(AuthContext)

  function login(user) {
    setUser(user)
  }

  return (
    <div className="card spacing">
      <LoginForm onAuthenticated={login} />
    </div>
  )
}

function LoginForm({ onAuthenticated }) {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function handleLogin(event) {
    event.preventDefault()
    setLoading(true)
    api.auth
      .login(username, password)
      .then((user) => {
        onAuthenticated(user)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }

  return (
    <>
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
            onChange={(e) => setUsername(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>
            <input
              className="passwordCheckbox"
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
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
    </>
  )
}
