import React from 'react'
import ReactDOM from 'react-dom'
import { FaTrash } from 'react-icons/fa'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

const Button = ({ onClick, children }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  )
}

function App() {
  function onClick() {
    console.log('logic for removing a task')
  }
  return (
    <div>
      <Button onClick={onClick}>
        <span>
          Remove
          <FaTrash color="red" /> Task
        </span>
      </Button>

      {/* <Button label="Remove Task" onClick={onClick} icon={<FaTrash color="red" />} /> */}
      {/* <Button label="Remove Task" onClick={onClick} icon={FaTrash} /> */}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
