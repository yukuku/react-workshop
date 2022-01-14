import React from 'react'
import ReactDOM from 'react-dom'
import { FaTrash } from 'react-icons/fa'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  )
}

function App() {
  function removeTask() {
    console.log('Click')
  }

  return (
    <div>
      <Button onClick={removeTask}>
        <FaTrash color="red" />
        <span>Remove</span>
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
