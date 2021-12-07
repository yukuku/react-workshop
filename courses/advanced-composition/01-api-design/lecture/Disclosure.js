import * as React from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

// Import or write our own:
import { useId } from '../../useId'

export function Disclosure({ children, onChange, defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = React.useState(defaultIsOpen)

  const id = useId()
  const panelId = `panel-${id}`

  function onSelect() {
    setIsOpen(!isOpen)
    onChange && onChange(!isOpen)
  }

  children = React.Children.map(children, (child) => {
    return React.cloneElement(child, { isOpen, onSelect, panelId })
  })

  return children
}

export const DisclosureButton = React.forwardRef(
  ({ children, isOpen, onSelect, panelId, ...rest }, forwardedRef) => {
    return (
      <button
        {...rest}
        ref={forwardedRef}
        onClick={onSelect}
        data-disclosure-button=""
        data-state={isOpen ? 'open' : 'collapsed'}
        aria-controls={panelId}
      >
        {children}
      </button>
    )
  }
)

DisclosureButton.displayName = 'DisclosureButton'

export const DisclosurePanel = ({ children, panelId, isOpen, ...rest }) => {
  return (
    <div
      {...rest}
      id={panelId}
      data-disclosure-panel=""
      data-state={isOpen ? 'open' : 'collapsed'}
      hidden={!isOpen}
    >
      {children}
    </div>
  )
}
