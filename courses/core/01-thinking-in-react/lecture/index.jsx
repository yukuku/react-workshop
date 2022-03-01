// import React from 'react'
import ReactDOM from 'react-dom'
import { FaTrash } from 'react-icons/fa'
import './styles.scss'

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} type="button" className="button">
      {children}
    </button>
  )
}

function App() {
  const courses = [
    { id: 1, name: 'JS' },
    { id: 2, name: 'HTML' },
    { id: 3, name: 'CSS' },
  ]

  function onClick() {
    console.log('this is the logic for removing a course')
  }

  return (
    <div>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <h1>{course.name}</h1>
            <Button onClick={onClick}>
              <FaTrash />
              <span>Remove Course</span>
            </Button>
          </div>
        )
      })}
      <form action=""></form>
    </div>
  )
}

// React 18
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
