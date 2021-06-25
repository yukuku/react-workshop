import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'ProjectPlanner/ThemeContext'
import { PrimaryLayout } from './PrimaryLayout'
import { UnauthenticatedLayout } from './UnauthenticatedLayout'
import { AuthProvider, useAuth } from './AuthContext'
import { api } from 'ProjectPlanner/api'
import 'ProjectPlanner/styles/global-styles.scss'

const App = () => {
  const { authenticated, login, logout, dispatch } = useAuth()

  // Any variable that you are closing over that can change
  React.useEffect(() => {
    let isCurrent = true
    api.auth.getAuthenticatedUser().then((user) => {
      if (user && isCurrent) {
        login(user)
      } else {
        // logout()
        dispatch({ type: 'LOGOUT' })
      }
    })
    return () => {
      isCurrent = false
    }
  }, [dispatch, login])

  return authenticated ? <PrimaryLayout /> : <UnauthenticatedLayout />
}

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
