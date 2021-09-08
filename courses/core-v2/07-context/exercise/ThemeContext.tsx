import React, { useContext } from 'react'
import { getTheme } from './utils'

type Colors = {
  [key: string]: string
}
export const Context = React.createContext<Colors | null>(null)

export const ThemeProvider: React.FC = ({ children }) => {
  const colors = getTheme()

  return <Context.Provider value={colors} children={children} />
}

export const useTheme = () => {
  return useContext(Context)
}
