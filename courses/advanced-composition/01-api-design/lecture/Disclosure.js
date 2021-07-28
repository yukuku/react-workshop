import * as React from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

// Import or write our own:
import { useId } from '../../useId'

const Context = React.createContext()

export function Disclosure({ children, onChange, defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = React.useState(defaultIsOpen)

  const id = useId()

  function onSelect() {
    setIsOpen(!isOpen)
    onChange(!isOpen)
  }

  const context = {
    isOpen,
    onSelect,
    panelId: `disclosure-panel-${id}`,
  }

  return <Context.Provider value={context}>{children}</Context.Provider>
}

export const DisclosureButton = React.forwardRef(({ children, ...props }, forwardedRef) => {
  const { onSelect, isOpen, panelId } = React.useContext(Context)
  return (
    <button
      {...props}
      ref={forwardedRef}
      onClick={onSelect}
      data-disclosure-button
      data-state={isOpen ? 'open' : 'collapsed'}
      aria-controls={panelId}
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
      id={panelId}
      className={`disclosure-panel ${isOpen ? 'open' : 'collapsed'}`}
      hidden={!isOpen}
    >
      {children}
    </div>
  )
}
