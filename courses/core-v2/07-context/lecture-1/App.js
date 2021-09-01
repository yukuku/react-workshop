import React, { useContext, useState, useEffect } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

//////////

const AuthContext = React.createContext()

function AuthProvider({ children }) {
  const [user] = React.useState({ name: 'brad' })

  const context = {
    user,
  }

  return <AuthContext.Provider value={context} children={children} />
}

///////

export const App = () => {
  return (
    <AuthProvider>
      <PrimaryLayout />
    </AuthProvider>
  )
}

const PrimaryLayout = React.memo(() => {
  return <Board />
})

const Board = () => {
  return <TaskCard />
}

const TaskCard = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className="task-card spacing">
      <div>User: {user.name}</div>
    </div>
  )
}
