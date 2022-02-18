import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from 'course-platform/App'
import { CoursesProvider } from 'course-platform/CoursesContext'
import { AuthProvider } from './AuthContext'

import 'course-platform/styles/all.scss'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <BrowserRouter>
    <CoursesProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </CoursesProvider>
  </BrowserRouter>
)
