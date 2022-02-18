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

function App() {
  const courses = [
    { id: 1, name: 'JS' },
    { id: 2, name: 'React' },
    { id: 3, name: 'CSS' },
  ]

  function onClick() {
    console.log('button was clicked')
  }

  return (
    <div>
      <div className="spacing">
        {courses.map((course) => {
          return (
            <div>
              <div>
                <h1>{course.name}</h1>
                <Button onClick={onClick}>
                  <FaTrash />
                  <span>Remove Course</span>
                </Button>
              </div>
              <hr />
            </div>
          )
        })}
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
