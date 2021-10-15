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
  function onClick() {
    // logic removing task
  }
  return (
    <div>
      <Button onClick={onClick}>
        <FaTrash color="red" />
        <span>
          Remove
          <FaTrash color="blue" /> Task
        </span>
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
