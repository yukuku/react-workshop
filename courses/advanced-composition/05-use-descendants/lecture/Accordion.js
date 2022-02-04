import * as React from 'react'
import { wrapEvent, useForkedRef } from '../../utils'
import { useId } from '../../useId'

// import {
//   createDescendantContext,
//   DescendantProvider,
//   useDescendant,
//   useDescendants
// } from '@reach/descendants'

// const DescendantContext = createDescendantContext('DescendantContext')
const AccordionContext = React.createContext()

/**
 * Accordion
 */

export const Accordion = React.forwardRef(
  (
    { children, onChange, index: controlledIndex, defaultIndex = 0, id, ...props },
    forwardedRef
  ) => {
    const [selectedIndex, setSelectedIndex] = React.useState(defaultIndex)
    const accordionId = useId(id)

    const isControlled = controlledIndex != null
    const { current: startsControlled } = React.useRef(isControlled)
    if (isControlled !== startsControlled) {
      console.warn('Cannot change from controlled to uncontrolled or vice versa.')
    }

    let itemId = 0
    const context = {
      registerItem: (ref) => {
        if (!ref.current) {
          ref.current = ++itemId
        }
        return ref.current
      },
      accordionId,
      isSelected: (index) => (isControlled ? controlledIndex === index : selectedIndex === index),
      selectPanel: (index) => {
        onChange && onChange(index)
        if (!isControlled) {
          setSelectedIndex(index)
        }
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

const AccordionItemContext = React.createContext()

export const AccordionItem = React.forwardRef(({ children, ...props }, forwardedRef) => {
  const { isSelected, selectPanel, accordionId, registerItem } = React.useContext(AccordionContext)

  const indexRef = React.useRef()
  const index = registerItem(indexRef)
  const selected = isSelected(index)

  const context = {
    selected,
    panelId: `accordion-${accordionId}-panel-${index}`,
    buttonId: `accordion-${accordionId}-button-${index}`,
    onSelect: () => selectPanel(index),
  }

  return (
    <AccordionItemContext.Provider value={context}>
      <div
        {...props}
        data-accordion-item=""
        data-state={selected ? 'open' : 'collapsed'}
        ref={forwardedRef}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
})

AccordionItem.displayName = 'AccordionItem'

/**
 * Accordion Button
 */

export const AccordionButton = React.forwardRef(({ children, onClick, ...props }, forwardedRef) => {
  const { panelId, selected, onSelect } = React.useContext(AccordionItemContext)

  return (
    <button
      {...props}
      onClick={wrapEvent(onClick, onSelect)}
      data-accordion-button=""
      data-state={selected ? 'open' : 'collapsed'}
      aria-expanded={selected}
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
  const { buttonId, panelId, selected } = React.useContext(AccordionItemContext)

  return (
    <div
      role="region"
      {...props}
      id={panelId}
      aria-labelledby={buttonId}
      hidden={!selected}
      data-accordion-panel=""
      data-state={selected ? 'open' : 'collapsed'}
      ref={forwardedRef}
    >
      {children}
    </div>
  )
})

AccordionPanel.displayName = 'AccordionPanel'
