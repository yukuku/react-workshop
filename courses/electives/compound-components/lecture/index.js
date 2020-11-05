import React, { useState, useContext, useRef } from 'react'
import ReactDOM from 'react-dom'
import LoginForm from 'YesterTech/LoginForm'
import SignupForm from 'YesterTech/SignupForm'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

const TabsContext = React.createContext()

export function Tabs({ children, index: controlledIndex, onChange, defaultIndex = 0, ...props }) {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex)

  const isControlled = controlledIndex != null
  const { current: startedControlled } = useRef(controlledIndex)
  if (startedControlled !== isControlled) {
    console.warn('You cannot change from controlled to uncontrolled...')
  }

  const context = {
    selectedIndex: isControlled ? controlledIndex : selectedIndex,
    setSelected: index => {
      onChange && onChange(index)
      setSelectedIndex(index)
    }
  }

  return (
    <TabsContext.Provider value={context}>
      <div {...props} className="tabs">
        {children}
      </div>
    </TabsContext.Provider>
  )
}

const TabListContext = React.createContext()

function TabList({ children, ...props }) {
  const { selectedIndex, setSelected } = useContext(TabsContext)

  children = React.Children.map(children, (child, index) => {
    const context = {
      selected: index === selectedIndex,
      onClick: () => setSelected(index)
    }

    return <TabListContext.Provider value={context}>{child}</TabListContext.Provider>
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
    <div {...props} className="tab-panel" hidden={selected}>
      {children}
    </div>
  )
}

function App() {
  // Controlled vs Uncontrolled
  // Sub Context
  // Descendants?

  return (
    <div>
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
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
