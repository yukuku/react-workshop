import React, { useContext, useRef, useEffect, useState } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { getTheme } from './utils'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

const AuthContext = React.createContext()

function AuthProvider({ children }) {
  const [logged, setlogged] = useState(true)
  const [user, setUser] = useState('brad')
  // const [state, dispatch] = useReducer((state, action) => {
  //   switch(action.type) {
  //     case '': {
  //       return { ...state }
  //     }
  //     default: return state
  //   }
  // }, {})

  // function fake() {

  // }
  const context = { user, logged }

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}

//////////

const ThemeContext = React.createContext()

export const App = () => {
  const [colors, setColors] = React.useState(getTheme())

  return (
    <ThemeContext.Provider value={colors}>
      <AuthProvider>
        <PrimaryLayout />
      </AuthProvider>
    </ThemeContext.Provider>
  )
}

const PrimaryLayout = () => {
  return <Board />
}

const Board = () => {
  return (
    <ThemeContext.Provider value={{ blue: 'orange' }}>
      <TaskCard />
    </ThemeContext.Provider>
  )
}

const TaskCard = () => {
  const colors = useContext(ThemeContext)
  const taskRef = useRef()
  const { user } = useAuth()

  console.log(user)

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
