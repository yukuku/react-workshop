import React, { createContext, useContext, useState, useEffect } from 'react'

import type { User } from 'course-platform/utils/types'

type Context = {
  authenticated: boolean | null
  user: User | null
  login(user: User): void
  logout(): void
}

const AuthContext = createContext<Context>(null!)

export const AuthProvider: React.FC = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [user, setUser] = useState<User | null>(null)

  const login = React.useCallback((user: User) => {
    setAuthenticated(true)
    setUser(user)
  }, [])

  const logout = React.useCallback(() => {
    setAuthenticated(false)
    setUser(null)
  }, [])

  const context: Context = {
    authenticated,
    user,
    login,
    logout,
  }

  return <AuthContext.Provider value={context} children={children} />
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw Error('Use of `useAuthContext` is outside of `AuthProvider`')
  }
  return context || {}
}
