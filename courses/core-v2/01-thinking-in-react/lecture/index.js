import React from 'react'
import ReactDOM from 'react-dom'
import { FaTrash } from 'react-icons/fa'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

function Button({ onClick, children, icon: Icon }) {
  return (
    <button onClick={onClick} className="button" type="button">
      {children}
    </button>
  )
}

function App() {
  function onClick() {
    console.log('removing a task')
  }
  return (
    <div>
      <Button onClick={onClick}>
        <FaTrash />
        <span>Remove Task</span>
        <FaTrash color="red" />
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
