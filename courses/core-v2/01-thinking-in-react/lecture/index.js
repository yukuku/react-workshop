import React from 'react'
import ReactDOM from 'react-dom'
import { FaTrash } from 'react-icons/fa'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

function Button({ children }) {
  return <button className="button">{children}</button>
}

function App() {
  return (
    <div>
      <Button>
        <FaTrash color="red" />
        <span>Remove Task</span>
        <FaTrash color="blue" />
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
