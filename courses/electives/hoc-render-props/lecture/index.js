import React from 'react'
import ReactDOM from 'react-dom'
import UserProfile from './UserProfile'

export function App() {
  return (
    <div>
      <UserProfile isAdmin={true}></UserProfile>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
