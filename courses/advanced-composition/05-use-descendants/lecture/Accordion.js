import * as React from 'react'
import { wrapEvent } from '../../utils'
import { useId } from '../../useId'

const AccordionContext = React.createContext()

/**
 * Accordion
 */

export const Accordion = React.forwardRef(
  (
    { children, index: controlledIndex, onChange, defaultIndex = 0, id, ...props },
    forwardedRef
  ) => {
    const [selectedIndex, setSelectedIndex] = React.useState(defaultIndex)
    const accordionId = useId(id)

    const isControlled = controlledIndex != null
    const { current: startedControlled } = React.useRef(isControlled)
    if (startedControlled !== isControlled) {
      console.error('You cannot change from uncontrolled to controlled...')
    }

    let indexes = -1

    const context = {
      accordionId,
      selected: (index) => (isControlled ? controlledIndex === index : selectedIndex === index),
      selectPanel: (index) => {
        onChange && onChange(index)
        setSelectedIndex(index)
      },
      registerItem: (ref) => {
        if (!ref.current) {
          ref.current = ++indexes
        }
        return ref.current
      },
    }

    return (
      <AccordionContext.Provider value={context}>
        <div data-accordion="" ref={forwardedRef} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    )
  }
)

Accordion.displayName = 'Accordion'

/**
 * Accordion Item
 */

const ItemContext = React.createContext()

export const AccordionItem = React.forwardRef(({ children, ...props }, forwardedRef) => {
  const { selected, registerItem, accordionId, selectPanel } = React.useContext(AccordionContext)

  const itemRef = React.useRef()
  const index = registerItem(itemRef)

  const context = {
    panelId: `accordion-${accordionId}-panel-${index}`,
    buttonId: `accordion-${accordionId}-button-${index}`,
    isSelected: selected(index),
    onSelectPanel: () => selectPanel(index),
  }

  return (
    <ItemContext.Provider value={context}>
      <div
        {...props}
        data-accordion-item=""
        data-state={selected ? 'open' : 'collapsed'}
        ref={forwardedRef}
      >
        {children}
      </div>
    </ItemContext.Provider>
  )
})

AccordionItem.displayName = 'AccordionItem'

/**
 * Accordion Button
 */

export const AccordionButton = React.forwardRef(({ children, onClick, ...props }, forwardedRef) => {
  const { panelId, isSelected, onSelectPanel } = React.useContext(ItemContext)

  return (
    <button
      {...props}
      onClick={wrapEvent(onClick, onSelectPanel)}
      data-accordion-button=""
      data-state={isSelected ? 'open' : 'collapsed'}
      aria-expanded={isSelected}
      aria-controls={panelId}
      ref={forwardedRef}
    >
      {children}
    </button>
  )
})

AccordionButton.displayName = 'AccordionButton'

/**
 * Accordion Panel
 */

export const AccordionPanel = React.forwardRef(({ children, ...props }, forwardedRef) => {
  const { buttonId, panelId, isSelected } = React.useContext(ItemContext)

  return (
    <div
      role="region"
      {...props}
      id={panelId}
      aria-labelledby={buttonId}
      hidden={!isSelected}
      data-accordion-panel=""
      data-state={isSelected ? 'open' : 'collapsed'}
      ref={forwardedRef}
    >
      {children}
    </div>
  )
})

AccordionPanel.displayName = 'AccordionPanel'
