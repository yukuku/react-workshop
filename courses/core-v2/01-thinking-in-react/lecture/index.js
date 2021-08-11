import React from 'react'
import ReactDOM from 'react-dom'
import { FaTrash } from 'react-icons/fa'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

const Button = ({ onClick, children, ...rest }) => {
  return (
    <button {...rest} onClick={onClick} type="button" className="button">
      {children}
    </button>
  )
}

function App() {
  return (
    <div>
      <Button
        onClick={() => {
          console.log('business rules for removing a task')
        }}
        aria-label="our button"
      >
        <FaTrash color="red" />
        <span>Remove Task</span>
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
