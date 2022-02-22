import { Outlet, NavLink } from 'react-router-dom'
import { Logo } from 'course-platform/Logo'
import { Icon } from 'course-platform/Icon'
import styles from '../../../../apps/course-platform/AppLayout/AppLayout.module.scss'
import subNavStyles from '../../../../apps/course-platform/AppSubLayouts/AppSubLayouts.module.scss'

export function AppLayout() {
  return (
    <div className={`${styles.component} flex flex-columns`}>
      <header className="primary-header flex-split" data-theme="dark">
        <div>
          <Logo />
        </div>
        <nav>{/* Nav Goes Here Later */}</nav>
      </header>
      <div className="flex-1 flex">
        <aside className="primary-sidebar">
          <nav>
            <NavLink to="courses">
              <Icon name="courses" size={2} />
              <span>Courses</span>
            </NavLink>
            <NavLink to="students">
              <Icon name="student" size={2} />
              <span>Students</span>
            </NavLink>
            <NavLink to="chat">
              <Icon name="chat" size={2} />
              <span>Chat</span>
            </NavLink>
          </nav>
        </aside>
        <div className="primary-content flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export const AppSubLayout: React.FC = ({ children }) => {
  return (
    <div className={subNavStyles.component}>
      <header className="flex-split">
        <nav className="horizontal-spacing-large">{children}</nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export function CoursesSubLayout() {
  return (
    <AppSubLayout>
      <NavLink to="courses" end>
        <Icon name="home" />
        <span>All Courses</span>
      </NavLink>
      <NavLink to="add" end>
        <Icon name="createCourse" />
        <span>Add Course</span>
      </NavLink>
    </AppSubLayout>
  )
}
