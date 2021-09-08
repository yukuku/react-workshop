import React, { useContext, useRef, useEffect } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { getTheme } from './utils'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

/////////
const ThemeContext = React.createContext()

export function ThemeProvider({ children }) {
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case '': {
          return { ...state }
        }
        default:
          return state
      }
    },
    {
      colors: getTheme(),
    }
  )

  const context = {
    colors: state.colors,
    dispatch,
  }

  return <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw Error()
  }
  return context
}

/////////

export const App = () => {
  return (
    <ThemeProvider>
      <PrimaryLayout />
    </ThemeProvider>
  )
}

const PrimaryLayout = () => {
  return <Board />
}

const Board = () => {
  return <TaskCard />
}

const TaskCard = () => {
  const { colors, setColors } = useTheme()

  function darkMode() {
    setColors({
      red: '#000',
      green: '#000',
      blue: '#000',
    })
  }

  return (
    <div className="task-card spacing" style={{ '--taskColor': colors.blue }}>
      <Heading>Task Card</Heading>
      <span>{colors?.blue}</span>
      <button className="button" onClick={darkMode}>
        Click
      </button>
    </div>
  )
}
