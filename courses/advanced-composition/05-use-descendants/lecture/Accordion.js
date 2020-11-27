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

    const countRef = useRef(0)

    const context = {
      accordionId,
      registerAccordionItem: ref => {
        if (!ref.current) {
          countRef.current++
          ref.current = countRef.current
        }
        return ref.current
      },
      selected: index => (isControlled ? controlledIndex === index : selectedIndex === index),
      selectPanel: index => {
        onChange && onChange(index)
        if (!isControlled) {
          setSelectedIndex(index)
        }
      }
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
  const { selected, registerAccordionItem, accordionId } = useContext(AccordionContext)

  const itemRef = useRef()
  const index = registerAccordionItem(itemRef)

  const context = {
    index,
    panelId: `accordion-${accordionId}-panel-${index}`,
    buttonId: `accordion-${accordionId}-button-${index}`
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
  const { selected, selectPanel } = useContext(AccordionContext)
  const { panelId, buttonId, index } = useContext(AccordionItemContext)
  const isSelected = selected(index)

  return (
    <button
      {...props}
      id={buttonId}
      onClick={wrapEvent(onClick, () => selectPanel(index))}
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

export const AccordionPanel = forwardRef(({ children, ...props }, forwardedRef) => {
  const { selected } = useContext(AccordionContext)
  const { panelId, buttonId, index } = useContext(AccordionItemContext)
  const isSelected = selected(index)

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
