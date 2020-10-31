import React, { useState, useContext } from 'react'
import ReactDOM from 'react-dom'
import LoginForm from 'YesterTech/LoginForm'
import SignupForm from 'YesterTech/SignupForm'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

const TabsContext = React.createContext()

export function Tabs({ children, ...props }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const context = {
    selectedIndex,
    setSelectedIndex
  }

  return (
    <TabsContext.Provider value={context}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  )
}

const TabListContext = React.createContext()

function TabList({ children, ...props }) {
  const { selectedIndex, setSelectedIndex } = useContext(TabsContext)

  children = React.Children.map(children, (child, index) => {
    const context = {
      selected: index === selectedIndex,
      onClick: () => setSelectedIndex(index)
    }
    return <TabListContext.Provider value={context} children={child} />
  })

  return (
    <div {...props} className="tab-list">
      {children}
    </div>
  )
}

function Tab({ children, ...props }) {
  const { selected, onClick } = useContext(TabListContext)
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
  const { selectedIndex } = useContext(TabsContext)

  children = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      selected: index === selectedIndex
    })
  })

  return (
    <div {...props} className="tab-panels">
      {children}
    </div>
  )
}

function TabPanel({ children, selected, ...props }) {
  return (
    <div {...props} className="tab-panel" hidden={!selected}>
      {children}
    </div>
  )
}

///////

function App() {
  return (
    <Tabs>
      <TabList>
        <Tab>Login</Tab>
        <Tab>Signup</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <LoginForm />
        </TabPanel>
        <TabPanel>
          <SignupForm />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
