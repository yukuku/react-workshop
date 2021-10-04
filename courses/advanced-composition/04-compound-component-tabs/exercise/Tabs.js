import * as React from 'react'
import { useId } from '../../useId'
import { wrapEvent } from '../../utils'

const TabsContext = React.createContext()
const TabListContext = React.createContext()

export const Tabs = ({ children, ...props }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const context = {
    selectedIndex,
    onSelect: setSelectedIndex,
  }

  return (
    <TabsContext.Provider value={context}>
      <div {...props} data-tabs="">
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export const TabList = ({ children, ...props }) => {
  children = React.Children.map(children, (child, index) => {
    const context = { index }
    return <TabListContext.Provider value={context}>{child}</TabListContext.Provider>
  })

  return (
    <div {...props} data-tab-list="">
      {children}
    </div>
  )
}

export const Tab = ({ children, ...props }) => {
  const { index } = React.useContext(TabListContext)
  const { selectedIndex, onSelect } = React.useContext(TabsContext)
  const selected = index === selectedIndex

  return (
    <div
      {...props}
      data-tab=""
      onClick={() => onSelect(index)}
      data-selected={selected ? '' : undefined}
    >
      {children}
    </div>
  )
}

export const TabPanels = ({ children, ...props }) => {
  return (
    <div {...props} data-tab-panels="">
      {children}
    </div>
  )
}

export const TabPanel = ({ children, ...props }) => {
  return (
    <div {...props} data-tab-panel="">
      {children}
    </div>
  )
}
