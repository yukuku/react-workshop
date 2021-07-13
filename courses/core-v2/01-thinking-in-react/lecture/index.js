import React from 'react'
import ReactDOM from 'react-dom'
import { FaTrash } from 'react-icons/fa'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

function Button({ onClick, children, className, ...props }) {
  return (
    <button {...props} className={`${className} button`} onClick={onClick}>
      {children}
    </button>
  )
}

function App() {
  function removeTask() {
    // logic for removing a task
  }

  return (
    <div>
      <Button onClick={removeTask} className="my-button">
        <FaTrash color="red" />
        <span>Remove Task</span>
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
