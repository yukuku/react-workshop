import * as React from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

// Import or write our own:
import { useId } from '../../useId'

const Context = React.createContext()

export function Disclosure({ children, onChange, defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = React.useState(defaultIsOpen)

  const id = useId()
  const panelId = `panel-${id}`

  function onSelect() {
    setIsOpen(!isOpen)
    onChange(!isOpen)
  }

  const context = {
    isOpen,
    onSelect,
    panelId,
  }

  return <Context.Provider value={context}>{children}</Context.Provider>
}

export const DisclosureButton = React.forwardRef(({ children, ...props }, forwardedRef) => {
  const { isOpen, onSelect, panelId } = React.useContext(Context)

  return (
    <button
      {...props}
      ref={forwardedRef}
      onClick={onSelect}
      aria-expanded={isOpen}
      data-state={`${isOpen ? 'open' : 'collapsed'}`}
      aria-controls={panelId}
      data-disclosure-button=""
    >
      {children}
    </button>
  )
})

DisclosureButton.displayName = 'DisclosureButton'

export const DisclosurePanel = ({ children, ...props }) => {
  const { isOpen, panelId } = React.useContext(Context)

  return (
    <div
      {...props}
      className={`disclosure-panel ${isOpen ? 'open' : 'collapsed'}`}
      data-disclosure-panel=""
      hidden={!isOpen}
      id={panelId}
    >
      {children}
    </div>
  )
}
