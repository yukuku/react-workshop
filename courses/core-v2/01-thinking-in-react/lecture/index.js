import React from 'react'
import ReactDOM from 'react-dom'
import { FaTrash } from 'react-icons/fa'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

function Button({ children, className = '', ...props }) {
  return (
    <button {...props} className={`button ${className}`}>
      {children}
    </button>
  )
}

function App() {
  function onClick() {
    console.log('this is the logic for removing a task')
  }
  return (
    <div>
      <Button onClick={onClick} className="workshop">
        <FaTrash />
        <span>Remove Task</span>
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
