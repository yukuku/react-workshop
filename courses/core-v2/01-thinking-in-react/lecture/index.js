import React from 'react'
import ReactDOM from 'react-dom'
import { FaTrash } from 'react-icons/fa'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  )
}

// OOP: Class -> Object
// React: Comp -> Elements

function App() {
  function onClick() {
    console.log('here is the logic for removing a task')
  }

  return (
    <div>
      <Button onClick={onClick}>
        <FaTrash />
        <span>Remove Task</span>
        <FaTrash />
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
