import ReactDOM from 'react-dom'
// import { BrowseCourses } from './BrowseCourses.final'
import { BrowseCourses } from './BrowseCourses'

import './styles.scss'

function App() {
  return <BrowseCourses></BrowseCourses>
}

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(<App />)
