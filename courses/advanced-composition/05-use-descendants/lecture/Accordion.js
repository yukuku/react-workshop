import React, { useState, useContext, useRef, forwardRef } from 'react'
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

export const Accordion = forwardRef(
  (
    { children, onChange, index: controlledIndex, defaultIndex = 0, id, ...props },
    forwardedRef
  ) => {
    const [selectedIndex, setSelectedIndex] = useState(defaultIndex)
    const accordionId = useId(id)

    const isControlled = controlledIndex != null
    const { current: startsControlled } = useRef(isControlled)
    if (isControlled !== startsControlled) {
      console.warn('Cannot change from controlled to uncontrolled or vice versa.')
    }

    let itemsCount = -1

    const context = {
      registerIndex: (ref) => {
        if (!ref.current) {
          ref.current = ++itemsCount
        }
        return ref.current
      },
      accordionId,
      selected: (index) => (isControlled ? controlledIndex === index : selectedIndex === index),
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

export const AccordionItem = forwardRef(({ children, ...props }, forwardedRef) => {
  const { selected, accordionId, registerIndex, selectPanel } = useContext(AccordionContext)

  const itemRef = useRef()
  const index = registerIndex(itemRef)
  const isSelected = selected(index)

  const context = {
    panelId: `accordion-${accordionId}-panel-${index}`,
    buttonId: `accordion-${accordionId}-button-${index}`,
    onClick: () => selectPanel(index),
    selected: isSelected,
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

export const AccordionButton = forwardRef(({ children, onClick, ...props }, forwardedRef) => {
  const { panelId } = useContext(AccordionContext)
  const { onSelect, selected } = useContext(AccordionItemContext)

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

export const AccordionPanel = forwardRef(({ children, ...props }, forwardedRef) => {
  // const { buttonId, panelId, selected } = useContext(AccordionContext)
  const { buttonId, panelId, selected } = useContext(AccordionItemContext)

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
