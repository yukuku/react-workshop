import * as React from 'react'
import { useId } from '../../useId'
import { wrapEvent } from '../../utils'

const Context = React.createContext()

export function Disclosure({ children, onChange, defaultOpen = false, ...props }) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)
  const id = useId(props.id)
  const panelId = `panel-${id}`

  const context = {
    isOpen,
    panelId,
    onSelect: () => {
      const nextIsOpen = !isOpen
      setIsOpen(nextIsOpen)
      onChange && onChange(nextIsOpen)
    },
  }

  return <Context.Provider value={context} children={children} />
}

export const DisclosureButton = React.forwardRef(
  ({ children, onClick, ...props }, forwardedRef) => {
    const { onSelect, isOpen, panelId } = React.useContext(Context)
    return (
      <button
        {...props}
        onClick={wrapEvent(onClick, onSelect)}
        data-disclosure-button=""
        data-state={isOpen ? 'open' : 'collapsed'}
        aria-expanded={isOpen}
        aria-controls={panelId}
        ref={forwardedRef}
      >
        {children}
      </button>
    )
  }
)

DisclosureButton.displayName = 'DisclosureButton'

export const DisclosurePanel = React.forwardRef(({ children, ...props }, forwardedRef) => {
  const { isOpen, panelId } = React.useContext(Context)
  return (
    <div
      {...props}
      id={panelId}
      hidden={!isOpen}
      data-disclosure-panel=""
      data-state={isOpen ? 'open' : 'collapsed'}
      ref={forwardedRef}
    >
      {children}
    </div>
  )
})

DisclosurePanel.displayName = 'DisclosurePanel'
