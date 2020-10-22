import React, { useState, useContext, forwardRef, useRef } from 'react'
import { useId } from '../../useId'
import { wrapEvent } from '../../utils'

const TabsContext = React.createContext()

export const Tabs = ({ children, onChange, defaultIndex = 0, ...props }) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex)

  const context = {
    selectedIndex,
    onSelect: index => {
      onChange && onChange(index)
      setSelectedIndex(index)
    }
  }

  return (
    <TabsContext.Provider value={context}>
      <div {...props} data-tabs="">
        {children}
      </div>
    </TabsContext.Provider>
  )
}

const TabListContext = React.createContext()

export const TabList = ({ children, ...props }) => {
  children = React.Children.map(children, (child, index) => {
    return <TabListContext.Provider value={index}>{child}</TabListContext.Provider>
  })

  return (
    <div {...props} data-tab-list="">
      {children}
    </div>
  )
}

export const Tab = ({ children, disabled, ...props }) => {
  const { onSelect, selectedIndex } = useContext(TabsContext)
  const index = useContext(TabListContext)
  const isSelected = index === selectedIndex

  return (
    <div
      {...props}
      aria-selected={isSelected}
      disabled={disabled}
      data-tab=""
      data-selected={isSelected ? '' : undefined}
      onClick={disabled ? null : () => onSelect(index)}
    >
      {children}
    </div>
  )
}

const TabPanelContext = React.createContext()

export const TabPanels = ({ children, ...props }) => {
  children = React.Children.map(children, (child, index) => {
    return <TabPanelContext.Provider value={index}>{child}</TabPanelContext.Provider>
  })

  return (
    <div {...props} data-tab-panels="">
      {children}
    </div>
  )
}

export const TabPanel = ({ children, ...props }) => {
  const { selectedIndex } = useContext(TabsContext)
  const index = useContext(TabPanelContext)
  const isSelected = index === selectedIndex

  return (
    <div {...props} data-tab-panel="" hidden={!isSelected}>
      {children}
    </div>
  )
}
