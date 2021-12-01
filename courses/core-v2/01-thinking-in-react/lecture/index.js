import React from 'react'
import ReactDOM from 'react-dom'
import { FaTrash } from 'react-icons/fa'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="button" type="button">
      {children}
    </button>
  )
}

function App() {
  function onClick() {
    console.log('here')
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

// OOP: Class -> Objects
// React: Comp -> El
