import * as React from 'react'
import { useId } from '../../useId'

export function Disclosure({ children, render defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = React.useState(defaultIsOpen)
  const panelId = useId()

  function onSelect() {
    setIsOpen(!isOpen)
  }

  children = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      isOpen,
      onClick: onSelect,
      panelId,
    })
  })

  return <div data-disclosure>{typeof children === 'function' ? children() : children}</div>
}

export const DisclosureButton = React.forwardRef(
  ({ children, isOpen, panelId, onClick, ...props }, forwardedRef) => {
    return (
      <button
        {...props}
        ref={forwardedRef}
        onClick={onClick}
        aria-controls={panelId}
        aria-expanded={isOpen}
        data-disclosure-button=""
        data-state={isOpen ? 'open' : 'collapsed'}
      >
        <span>{children}</span>
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
        data-disclosure-panel=""
        data-state={isOpen ? 'open' : 'collapsed'}
        hidden={!isOpen}
        id={panelId}
      >
        {children}
      </div>
    )
  }
)

DisclosurePanel.displayName = 'DisclosurePanel'
