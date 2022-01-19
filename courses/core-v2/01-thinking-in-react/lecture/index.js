import React from 'react'
import ReactDOM from 'react-dom'
import { FaTrash } from 'react-icons/fa'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

function Button({ onClick, children, className, ...rest }) {
  return (
    <button {...rest} onClick={onClick} className={`button ${className}`}>
      {children}
    </button>
  )
}

function App() {
  function onClick(event) {
    console.log('click')
  }

  return (
    <div>
      <Button onClick={onClick} className="special">
        <FaTrash color="blue" />
        <span>Remove Task</span>
        <FaTrash color="red" />
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
