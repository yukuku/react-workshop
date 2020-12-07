import React, { useState, forwardRef, useContext } from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

// Import or write our own:
import { useId } from '../../useId'

const Context = React.createContext()

export function Disclosure({ children, onChange, defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  const disclosureId = useId()

  function onSelect() {
    setIsOpen(!isOpen)
    onChange && onChange(!isOpen)
  }

  const context = {
    panelId: `disclosure-${disclosureId}-panel`,
    onSelect,
    isOpen,
  }

  return (
    <Context.Provider value={context}>
      <div className="disclosure">{children}</div>
    </Context.Provider>
  )
}

export const DisclosureButton = forwardRef(({ children, ...props }, ref) => {
  const { isOpen, onSelect, panelId } = useContext(Context)

  return (
    <button
      {...props}
      ref={ref}
      onClick={onSelect}
      data-disclosure-button=""
      aria-expanded={isOpen}
      aria-controls={panelId}
      data-state={isOpen ? 'open' : 'collapsed'}
    >
      {children}
    </button>
  )
})

DisclosureButton.displayName = DisclosureButton

export const DisclosurePanel = ({ children }) => {
  const { isOpen, panelId } = useContext(Context)
  return (
    <div
      id={panelId}
      className={`disclosure-panel ${isOpen ? 'open' : 'collapsed'}`}
      hidden={!isOpen}
    >
      {children}
    </div>
  )
}
