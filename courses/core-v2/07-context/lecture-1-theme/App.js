import React, { useContext, useRef, useEffect, useState } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { getTheme } from './utils'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

//////////

const Context = React.createContext()

export const ThemeProvider = ({ children }) => {
  const [colors, setColors] = React.useState(() => getTheme())
  const [count, setCount] = useState(0)

  const click = React.useCallback(() => {
    setCount(count + 1)
  }, [])

  const context = React.useMemo(() => {
    return {
      colors,
      setColors,
      click,
      count,
    }
  }, [click, colors, count])

  return <Context.Provider value={context}>{children}</Context.Provider>
}

export const useTheme = () => {
  return useContext(Context)
}

/////////

export const App = () => {
  return (
    <ThemeProvider>
      <PrimaryLayout />
    </ThemeProvider>
  )
}

const PrimaryLayout = React.memo(() => {
  return <Board />
})

const Board = () => {
  return <TaskCard />
}

const TaskCard = () => {
  const taskRef = useRef()

  const { colors, click, count } = useTheme()

  useEffect(() => {
    taskRef.current.style.setProperty(`--taskColor`, colors.red)
  }, [colors])

  return (
    <div className="task-card spacing" ref={taskRef}>
      <Heading>Task Card</Heading>
      <span>{colors?.blue}</span>
      <button onClick={click}>Click {count}</button>
    </div>
  )
}
