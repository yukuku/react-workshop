import React, { useContext, useRef, useEffect } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { getTheme } from './utils'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

//////// ThemeContext.js

const Context = React.createContext()

export function ThemeProvider({ children }) {
  const colors = getTheme()
  const [count, setCount] = React.useState(0)

  const context = React.useMemo(() => {
    return { colors, count, setCount }
  }, [])

  return <Context.Provider value={context} children={children} />
}

export function useTheme() {
  const context = useContext(Context)
  if (!context) {
    throw Error()
  }
  return context
}

////////

export const App = () => {
  return (
    <ThemeProvider>
      <PrimaryLayout />
    </ThemeProvider>
  )
}

const PrimaryLayout = React.memo(() => {
  console.log('primary layout render')
  return <Board />
})

const Board = () => {
  return <TaskCard />
}

const TaskCard = () => {
  const taskRef = useRef()
  const { colors, count, setCount } = useContext(Context)

  useEffect(() => {
    taskRef.current.style.setProperty(`--taskColor`, colors.blue)
  }, [colors])

  return (
    <div className="task-card spacing" ref={taskRef}>
      <button className="button" onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <Heading>Task Card</Heading>
      <span>{colors?.blue}</span>
    </div>
  )
}
