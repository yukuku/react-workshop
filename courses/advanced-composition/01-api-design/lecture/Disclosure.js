import * as React from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

// Import or write our own:
import { useId } from '../../useId'

export function Disclosure({ children, onChange, defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = React.useState(defaultIsOpen)

  const id = useId()
  const panelId = `disclosure-panel-${id}`

  function onSelect() {
    onChange && onChange(!isOpen)
    setIsOpen(!isOpen)
  }

  children = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      isOpen,
      onSelect,
      panelId,
    })
  })

  return <div className="disclosure">{children}</div>
}

export const DisclosureButton = React.forwardRef(
  ({ children, isOpen, onSelect, panelId, ...props }, forwardedRef) => {
    return (
      <button
        {...props}
        aria-controls={panelId}
        onClick={onSelect}
        data-disclosure-button=""
        ref={forwardedRef}
        data-status={`${isOpen ? 'open' : 'collapsed'}`}
        aria-expanded={isOpen}
      >
        <span>{children}</span>
      </button>
    )
  }
)

DisclosureButton.displayName = 'DisclosureButton'

export const DisclosurePanel = ({ children, isOpen, panelId, ...props }) => {
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
