import React, { useState, useContext } from 'react'
import ReactDOM from 'react-dom'
import LoginForm from 'YesterTech/LoginForm'
import SignupForm from 'YesterTech/SignupForm'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

const TabsContext = React.createContext()

export function Tabs({ children, index: controlledIndex, onChange, ...props }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const controlled = controlledIndex != null

  const context = {
    selectedIndex: controlled ? controlledIndex : selectedIndex,
    setSelected: index => {
      setSelectedIndex(index)
      onChange && onChange(index)
    }
  }

  return (
    <TabsContext.Provider value={context}>
      <div className="tabs" {...props}>
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
    return <TabListContext.Provider children={child} value={context} />
  })

  return (
    <div className="tab-list" {...props}>
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

  return <div className="tab-panels">{children}</div>
}

function TabPanel({ children, selected, ...props }) {
  return (
    <div className="tab-panel" hidden={!selected}>
      {children}
    </div>
  )
}

function App() {
  const [index, setIndex] = useState(0)
  return (
    <div>
      <p>
        we are on tab {index}
        <button
          onClick={() => {
            setIndex(1)
          }}
        >
          Change Tab
        </button>
      </p>
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
