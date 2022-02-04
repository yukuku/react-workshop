import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { api } from 'ProjectPlanner/api'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'ProjectPlanner/ThemeContext'
import { PrimaryLayout } from './PrimaryLayout'
import { UnauthenticatedLayout } from './UnauthenticatedLayout'
import { AuthProvider, useAuth } from './AuthContext'
import 'ProjectPlanner/styles/global-styles.scss'

const App = () => {
  const { authenticated, login, logout } = useAuth() // useContext()

  // We want to run this code once when we first mount
  useEffect(() => {
    let isCurrent = true
    api.auth.getAuthenticatedUser().then((user) => {
      if (user && isCurrent) {
        login(user)
      } else {
        logout()
      }
    })
    return () => {
      isCurrent = false
    }
  }, [login, logout])

  return authenticated ? <PrimaryLayout /> : <UnauthenticatedLayout />
}

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
