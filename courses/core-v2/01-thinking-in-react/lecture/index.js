import React from 'react'
import ReactDOM from 'react-dom'
import { FaTrash } from 'react-icons/fa'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

function Button(props) {
  return (
    <button className="button" onClick={props.onClick}>
      {props.children}
    </button>
  )
}

function App() {
  function removeTask() {
    console.log('click')
  }

  const boards = [
    { id: 1, name: 'Board One' },
    { id: 2, name: 'Board One' },
    { id: 3, name: 'Board Two' },
    { id: 4, name: 'Board Two' },
    { id: 12, name: 'Board Two' },
  ]

  return (
    <div>
      {boards.map(function (board) {
        return (
          <div key={board.id}>
            <h1>{board.name}</h1>
            <Button onClick={removeTask}>
              <FaTrash />
              <span>Remove Button</span>
              <FaTrash />
            </Button>
          </div>
        )
      })}
      <form>
        <input type="text" />
      </form>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
