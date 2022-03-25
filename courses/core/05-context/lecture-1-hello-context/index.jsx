import { memo, useState, useContext, createContext } from 'react'
import ReactDOM from 'react-dom'
import './styles.scss'

/**
 * Context is a little weird in TypeScript so we'll teach it with
 * vanilla JS first. https://reacttraining.com/blog/react-context-with-typescript/
 */

//////// CounterContext.tsx

// Make the provider but also the consumers that go with it
const CounterContext = createContext()

export function CounterProvider({ children }) {
  const [count, setCount] = useState(0)

  const value = {
    count,
    setCount,
  }

  return <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
}

export function useCounter() {
  const context = useContext(CounterContext)
  if (!context) {
    throw Error('....')
  }
  return context || {}
}

//////// App.tsx

function App() {
  return (
    <CounterProvider>
      <AppLayout />
    </CounterProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

//////// AppLayout.tsx

// AppLayout is now a "memoized" component which means it will
// not re-render unless its props change
const AppLayout = memo(() => {
  console.log('render')
  return <Page />
})

//////// Page.tsx

function Page() {
  return <Counter />
}

//////// Counter.tsx

function Counter() {
  const { count, setCount } = useCounter() // useContext(CounterContext)

  return (
    <div className="card spacing">
      <h1>Counter</h1>
      <button className="button" onClick={() => setCount(count + 1)}>
        Count {count}
      </button>
    </div>
  )
}
