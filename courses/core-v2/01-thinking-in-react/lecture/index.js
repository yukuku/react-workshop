import React from 'react'
import ReactDOM from 'react-dom'
import { FaTrash } from 'react-icons/fa'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

// Declarative: What
// Imperative: How

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  )
}

function App() {
  const onClick = () => {
    // removing task
  }
  return (
    <div>
      <Button onClick={onClick}>
        <FaTrash />
        <span>Remove Task</span>
        <FaTrash color="" />
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
