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

function App() {
  function onClick() {
    console.log('logic for removing a task')
  }
  return (
    <div>
      <Button onClick={onClick}>
        <FaTrash color="red" />
        <span>Remove Task</span>
        <FaTrash color="blue" />
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
