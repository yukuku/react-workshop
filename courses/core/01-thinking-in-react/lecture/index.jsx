import ReactDOM from 'react-dom'
import { FaTrash } from 'react-icons/fa'
import './styles.scss'

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="button" type="button">
      {children}
    </button>
  )
}

function App() {
  const data = [
    { id: 1, name: 'CSS' },
    { id: 2, name: 'JS' },
    { id: 3, name: 'HTML' },
    { id: 4, name: 'TypeSC' },
  ]

  function onClick() {
    console.log('logic for removing a course')
  }

  return (
    <div>
      {data.map((course) => {
        return (
          <div key={course.id}>
            <h1>{course.name}</h1>
            <Button onClick={onClick}>
              <FaTrash color="blue" />
              <span>Remove Course</span>
            </Button>
          </div>
        )
      })}
      <form action=""></form>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
