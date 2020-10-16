import React, { useState, forwardRef, useRef } from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

// Import or write our own:
// import { useId } from '../../useId'

let id = -1
function useId() {
  const { current } = useRef(++id)
  return current
}

export function Disclosure({ children, defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  const id = useId()
  const panelId = `panel-${id}`

  children = React.Children.map(children, child => {
    return React.cloneElement(child, {
      isOpen,
      panelId,
      onSelect: () => {
        setIsOpen(!isOpen)
      }
    })
  })

  return children
}

export const DisclosureButton = forwardRef(
  ({ children, isOpen, onSelect, panelId, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        onClick={onSelect}
        data-disclosure-button
        aria-expanded={isOpen}
        aria-controls={panelId}
        data-state={isOpen ? 'open' : 'collapsed'}
      >
        {children}
      </button>
    )
  }
)

DisclosureButton.displayName = 'DisclosureButton'

export const DisclosurePanel = forwardRef(({ children, isOpen, panelId, ...props }, ref) => {
  return (
    <div
      {...props}
      id={panelId}
      ref={ref}
      data-disclosure-panel
      data-state={isOpen ? 'open' : 'collapsed'}
      hidden={!isOpen}
    >
      {children}
    </div>
  )
})

DisclosurePanel.displayName = 'DisclosurePanel'
