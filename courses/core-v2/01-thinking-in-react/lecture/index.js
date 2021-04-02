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
    console.log('click')
  }

  const tasks = [
    { id: 1, name: 'Task One' },
    { id: 2, name: 'Task Two' },
  ]

  return (
    <div>
      {tasks.map((task, index) => {
        return (
          <div>
            <h1>Task</h1>
            <Button onClick={onClick}>
              <FaTrash />
              <span>Remove Task</span>
            </Button>
          </div>
        )
      })}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
