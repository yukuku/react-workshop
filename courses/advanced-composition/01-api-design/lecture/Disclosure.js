import * as React from 'react'

// Import or write our own:
import { useId } from '../../useId'

export const Disclosure = ({ children, onChange, defaultIsOpen = false }) => {
  const [isOpen, setIsOpen] = React.useState(defaultIsOpen)

  const id = useId()
  const panelId = `disclosure-panel-${id}`

  function onSelect() {
    setIsOpen(!isOpen)
    typeof onChange === 'function' && onChange(!isOpen)
  }

  children = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      isOpen,
      onSelect,
      panelId,
    })
  })

  return children
}

export const DisclosureButton = React.forwardRef(
  ({ children, onSelect, isOpen, panelId, ...props }, forwardedRef) => {
    return (
      <button
        {...props}
        onClick={onSelect}
        aria-controls={panelId}
        data-disclosure-button=""
        aria-expanded={isOpen}
        data-state={isOpen ? 'open' : 'collapsed'}
        ref={forwardedRef}
      >
        {children}
      </button>
    )
  }
)

DisclosureButton.displayName = 'DisclosureButton'

export const DisclosurePanel = ({ children, panelId, isOpen, ...props }) => {
  return (
    <div
      {...props}
      id={panelId}
      data-disclosure-panel=""
      data-state={isOpen ? 'open' : 'collapsed'}
      hidden={!isOpen}
    >
      {children}
    </div>
  )
}
