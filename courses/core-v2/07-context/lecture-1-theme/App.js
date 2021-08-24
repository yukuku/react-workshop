import React, { useContext, useRef, useEffect } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { getTheme } from './utils'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

/////////

const ThemeContext = React.createContext()

export function ThemeProvider({ children }) {
  const colors = getTheme()
  const context = colors
  return <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw Error()
  }
  return context
}

//////////

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
  const taskRef = useRef()
  const colors = useTheme()

  useEffect(() => {
    taskRef.current.style.setProperty(`--taskColor`, colors.blue)
  }, [colors])

  return (
    <div className="task-card spacing" ref={taskRef}>
      <Heading>Task Card</Heading>
      <span>{colors?.blue}</span>
    </div>
  )
}
