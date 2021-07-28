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
  const { authenticated, login, logout } = useAuth()

  React.useEffect(() => {
    api.auth.getAuthenticatedUser().then((user) => {
      if (user) {
        login(user)
      } else {
        logout()
      }
    })
  }, [login, logout])

  return authenticated ? <PrimaryLayout /> : <UnauthenticatedLayout />
}

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <App></App>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
