import React, { useState, forwardRef } from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

// Import or write our own:
// import { useId } from '../../useId'
// function useId() {}

export function Disclosure({ children, defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  function onSelect() {
    setIsOpen(!isOpen)
  }

  return <div className="disclosure">{children}</div>
}

export const DisclosureButton = React.forwardRef(
  ({ children, isOpen, onSelect, ...props }, forwardedRef) => {
    return (
      <button
        {...props}
        ref={forwardedRef}
        onClick={onSelect}
        data-disclosure-button=""
        data-state={isOpen ? 'open' : 'collapsed'}
      >
        {isOpen ? <FaAngleDown /> : <FaAngleRight />}
        <span>{children}</span>
      </button>
    )
  }
)

DisclosureButton.displayName = 'DisclosureButton'

export const DisclosurePanel = ({ children, isOpen }) => {
  return (
    <div className={`disclosure-panel ${isOpen ? 'open' : 'collapsed'}`} hidden={!isOpen}>
      {children}
    </div>
  )
}
