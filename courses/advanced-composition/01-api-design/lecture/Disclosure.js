import React, { useState, useRef } from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

// Import or write our own:
import { useId } from '../../useId'

export function Disclosure({ children, onChange, defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  const id = useId()
  const panelId = `panel-${id}`

  function onSelect() {
    onChange && onChange(!isOpen)
    setIsOpen(!isOpen)
  }

  children = React.Children.map(children, child => {
    return React.cloneElement(child, {
      isOpen,
      onSelect,
      panelId
    })
  })

  return children
}

export const DisclosureButton = React.forwardRef(
  ({ children, isOpen, onSelect, panelId, ...props }, forwardedRef) => {
    return (
      <button
        {...props}
        ref={forwardedRef}
        onClick={onSelect}
        aria-controls={panelId}
        data-disclosure-button=""
        data-state={isOpen ? 'open' : 'collapsed'}
      >
        {children}
      </button>
    )
  }
)

DisclosureButton.displayName = 'DisclosureButton'

export const DisclosurePanel = React.forwardRef(
  ({ children, isOpen, panelId, ...props }, forwardedRef) => {
    return (
      <div
        {...props}
        ref={forwardedRef}
        id={panelId}
        data-disclosure-panel=""
        data-state={isOpen ? 'open' : 'collapsed'}
        hidden={!isOpen}
      >
        {children}
      </div>
    )
  }
)

DisclosurePanel.displayName = 'DisclosurePanel'
