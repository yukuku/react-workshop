import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { position } from './utils'
import './styles.scss'

function Portal({ children }) {
  const [node, setNode] = useState(null)

  useEffect(() => {
    const node = document.createElement('div')
    document.body.appendChild(node)
    setNode(node)
    return () => {
      document.body.removeChild(node)
    }
  }, [])

  return node ? createPortal(children, node) : null
}

function Popover({ children, targetRef }) {
  const popoverRef = useRef()
  const [styles, setStyles] = useState({})

  function initPopoverRef(node) {
    if (node && !popoverRef.current) {
      popoverRef.current = node
      const targetRect = targetRef.current.getBoundingClientRect()
      const popoverRect = popoverRef.current.getBoundingClientRect()
      setStyles(position(targetRect, popoverRect))
    }
  }

  function handleClick(e) {
    e.stopPropagation()
  }

  return (
    <Portal>
      <div
        onClick={handleClick}
        ref={initPopoverRef}
        style={{ position: 'absolute', ...styles }}
        className="popover"
      >
        {children}
      </div>
    </Portal>
  )
}

function Define({ children }) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef()

  useEffect(() => {
    window.addEventListener('click', () => {
      setOpen(false)
    })
  }, [])

  function handleClick(e) {
    e.stopPropagation()
    setOpen(!open)
  }

  return (
    <>
      <button ref={buttonRef} onClick={handleClick} className="as-link">
        {children}
      </button>
      {open && (
        <Popover targetRef={buttonRef}>Hooks are a way to compose behavior into components</Popover>
      )}
    </>
  )
}

export default function App() {
  return (
    <p>
      Modern React is filled with <Define>Hooks</Define>.They work with function-components and they
      give us an ability to use state and other React features similarly to class-based components.
    </p>
  )
}