import * as React from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

// Import or write our own:
import { useId } from '../../useId'

export function Disclosure({ children, onChange, defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = React.useState(defaultIsOpen)

  function onSelect() {
    setIsOpen(!isOpen)
    onChange && onChange(!isOpen)
  }

  const id = useId()
  const panelId = `disclosure-panel-${id}`

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
  ({ children, isOpen, panelId, onSelect, ...props }, ref) => {
    return (
      <button
        {...props}
        onClick={onSelect}
        data-disclosure-button
        ref={ref}
        data-state={isOpen ? 'open' : 'collapsed'}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        {children}
      </button>
    )
  }
)

DisclosureButton.displayName = 'DisclosureButton'

export const DisclosurePanel = React.forwardRef(({ children, panelId, isOpen, ...props }, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      id={panelId}
      data-disclosure-panel=""
      data-state={isOpen ? 'open' : 'collapsed'}
      hidden={!isOpen}
    >
      {children}
    </div>
  )
})

DisclosurePanel.displayName = 'DisclosurePanel'
