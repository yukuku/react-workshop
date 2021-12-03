import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { FaTrash, FaUser } from 'react-icons/fa'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

function Button({ onClick, children, ...props }) {
  return (
    <button {...props} onClick={onClick} className="button" type="button">
      {children}
    </button>
  )
}

function App() {
  function onRemoveTask() {
    console.log('logic for removing a task')
  }

  return (
    <div>
      <Button onClick={onRemoveTask} aria-controls="">
        Submit
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
