import React, { useState, createContext, useContext } from 'react'
import ReactDOM from 'react-dom'
import { Login } from './utils/Login'
import { Signup } from './utils/Signup'
import './styles.scss'

const TabsContext = createContext()

export function Tabs({ children, ...props }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const context = {
    selectedIndex,
    setSelectedIndex,
  }

  return (
    <TabsContext.Provider value={context}>
      <div {...props} className="tabs">
        {children}
      </div>
    </TabsContext.Provider>
  )
}

function TabList({ children, ...props }) {
  const { selectedIndex, setSelectedIndex } = useContext(TabsContext)

  children = React.Children.map(children, (tab, index) => {
    return React.cloneElement(tab, {
      selected: index === selectedIndex,
      onClick: () => setSelectedIndex(index),
    })
  })

  return (
    <div {...props} className="tab-list">
      {children}
    </div>
  )
}

function Tab({ children, selected, onClick, ...props }) {
  return (
    <button
      role="tab"
      {...props}
      aria-selected={selected}
      className="tab"
      data-selected={selected ? '' : undefined}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function TabPanels({ children, ...props }) {
  const { selectedIndex, setSelectedIndex } = useContext(TabsContext)

  children = React.Children.map(children, (panel, index) => {
    return React.cloneElement(panel, {
      selected: index === selectedIndex,
    })
  })

  return (
    <div {...props} className="tab-panels">
      {children}
    </div>
  )
}

function TabPanel({ children, selected, ...props }) {
  return selected ? (
    <div {...props} className="tab-panel">
      {children}
    </div>
  ) : null
}

function App() {
  return (
    <Tabs>
      <TabList>
        <Tab>Login</Tab>
        <Tab>Signup</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Login></Login>
        </TabPanel>
        <TabPanel>
          <Signup></Signup>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
