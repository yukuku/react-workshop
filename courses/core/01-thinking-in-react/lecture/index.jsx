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

const App = () => {
  function onClick() {
    console.log('logic for removing a course')
  }

  return (
    <div>
      <Button onClick={onClick}>
        <FaTrash />
        <span>Remove Course</span>
      </Button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
