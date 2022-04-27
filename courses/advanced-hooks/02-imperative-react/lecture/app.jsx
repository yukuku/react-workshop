import * as React from 'react'
import { createPortal } from 'react-dom'
import { position } from './utils'
import './styles.scss'

// const targetRect = targetRef.current.getBoundingClientRect()
// const popoverRect = popoverRef.current.getBoundingClientRect()
// setStyles(position(targetRect, popoverRect))

const Popover = ({ children }) => {
  return <div className="popover">{children}</div>
}

const Define = ({ children }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <button onClick={() => setOpen(!open)}>{children}</button>
      {open && <Popover>Hooks are a way to compose behavior into components</Popover>}
    </>
  )
}

export function App() {
  return (
    <p>
      Modern React is filled with <Define>Hooks</Define>. They work with function-components and
      they give us an ability to use state and other React features similarly to class-based
      components.
    </p>
  )
}
