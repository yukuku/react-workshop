import React, { useContext, useRef, useEffect } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { getTheme } from './utils'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

////////
const ThemeContext = React.createContext()

function ThemeProvider({ children }) {
  const [colors, setColors] = React.useState(getTheme())

  const context = {
    colors,
    setColors,
  }

  return <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
}

function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw Error()
  }
  return context
}

///////

export const App = () => {
  return (
    <ThemeProvider>
      <PrimaryLayout />
    </ThemeProvider>
  )
}

const PrimaryLayout = React.memo(() => {
  console.log('render primary layout')
  return <Board />
})

const Board = () => {
  return <TaskCard />
}

const TaskCard = () => {
  const taskRef = useRef()

  const { colors, setColors } = useTheme()

  useEffect(() => {
    taskRef.current.style.setProperty(`--taskColor`, colors.blue)
  }, [colors])

  return (
    <div className="task-card spacing" ref={taskRef}>
      <Heading>Task Card</Heading>
      <button onClick={() => setColors({ ...colors, blue: 'blue' })}>Dark Blue</button>
      <span>{colors?.blue}</span>
    </div>
  )
}
