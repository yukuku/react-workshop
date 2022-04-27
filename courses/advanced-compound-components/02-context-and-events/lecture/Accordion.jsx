import * as React from 'react'
import { wrapEvent } from '../../utils'

/**
 * Accordion
 */

export const Accordion = React.forwardRef(
  ({ children, onChange, defaultIndex = 0, id, ...props }, forwardedRef) => {
    const [selectedIndex, setSelectedIndex] = React.useState(defaultIndex)
    const accordionId = React.useId(id)

    children = React.Children.map(children, (child, index) => {
      const panelId = `accordion-${accordionId}-panel-${index}`
      const buttonId = `accordion-${accordionId}-button-${index}`

      return React.cloneElement(child, {
        buttonId,
        panelId,
        selected: selectedIndex === index,
        selectPanel: () => {
          onChange && onChange(index)
          setSelectedIndex(index)
        },
      })
    })

    return (
      <div data-accordion="" ref={forwardedRef} {...props}>
        {children}
      </div>
    )
  }
)

Accordion.displayName = 'Accordion'

/**
 * Accordion Item
 */

export const AccordionItem = React.forwardRef(
  ({ children, buttonId, panelId, selected, selectPanel, ...props }, forwardedRef) => {
    children = React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        buttonId,
        panelId,
        selected,
        selectPanel,
      })
    })

    return (
      <div
        {...props}
        data-accordion-item=""
        data-state={selected ? 'open' : 'collapsed'}
        ref={forwardedRef}
      >
        {children}
      </div>
    )
  }
)

AccordionItem.displayName = 'AccordionItem'

/**
 * Accordion Button
 */

export const AccordionButton = React.forwardRef(
  ({ children, buttonId, panelId, selected, selectPanel, ...props }, forwardedRef) => {
    return (
      <button
        {...props}
        id={buttonId}
        onClick={selectPanel}
        data-accordion-button=""
        data-state={selected ? 'open' : 'collapsed'}
        aria-expanded={selected}
        aria-controls={panelId}
        ref={forwardedRef}
      >
        {children}
      </button>
    )
  }
)

AccordionButton.displayName = 'AccordionButton'

/**
 * Accordion Panel
 */

export const AccordionPanel = React.forwardRef(
  ({ children, buttonId, panelId, selected, ...props }, forwardedRef) => {
    // Since we're passing our internal implementations down through props,
    // and then also forwarding props, some unneeded things are being passed
    // to the DOM, like props.selectPanel in this case.
    return (
      <div
        role="region"
        {...props}
        aria-labelledby={buttonId}
        id={panelId}
        hidden={!selected}
        data-accordion-panel=""
        data-state={selected ? 'open' : 'collapsed'}
        ref={forwardedRef}
      >
        {children}
      </div>
    )
  }
)

AccordionPanel.displayName = 'AccordionPanel'
