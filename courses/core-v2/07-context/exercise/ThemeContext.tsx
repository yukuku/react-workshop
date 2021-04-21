import React, { useContext } from 'react'
import { getTheme } from './utils'

type Colors = {
  [key: string]: string
}
const Context = React.createContext<Colors | null>(null)

export const ThemeProvider: React.FC = ({ children }) => {
  const colors = getTheme()

  return <Context.Provider value={colors}>{children}</Context.Provider>
}

export const useTheme = () => {
  const context = useContext(Context)
  if (context === undefined) {
    // throw
  }

  return context
}
