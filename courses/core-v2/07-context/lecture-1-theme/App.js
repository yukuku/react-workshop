import React, { useContext, useRef, useEffect } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { getTheme } from './utils'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

//////////

const Context = React.createContext()

export function ThemeProvider({ children }) {
  const colors = getTheme()

  return <Context.Provider value={colors}>{children}</Context.Provider>
}

export function useTheme() {
  return useContext(Context)
}

///////////

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
  const colors = useTheme()
  const taskRef = useRef()

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
