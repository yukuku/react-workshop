import React from 'react'
import ReactDOM from 'react-dom'
import { FaTrash } from 'react-icons/fa'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

const Button = ({ onClick, children, className, ...props }) => {
  return (
    <button {...props} onClick={onClick} className={`button ${className}`}>
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
      <Button onClick={onClick} className="foo">
        <FaTrash />
        <span>Remove Task</span>
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
