import ReactDOM from 'react-dom'
import { FaTrash } from 'react-icons/fa'
import './styles.scss'

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  )
}

// ui -> f(s)

function App() {
  const courses = [
    { id: 1, name: 'HTML' },
    { id: 2, name: 'JS' },
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
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
