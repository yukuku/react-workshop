import { useState, useContext, createContext, memo } from 'react'
import ReactDOM from 'react-dom'
import './styles.scss'

/**
 * Context is a little weird in TypeScript so we'll teach it with
 * vanilla JS first. https://reacttraining.com/blog/react-context-with-typescript/
 */

///////// CounterContext.tsx

const Context = createContext()

export function CounterProvider({ children }) {
  const [count, setCount] = useState(0)

  // useMemo
  const context = {
    count,
    setCount,
  }

  return <Context.Provider value={context}>{children}</Context.Provider>
}

export function useCounterContext() {
  const context = useContext(Context)
  if (!context) {
    throw Error('You are not in the right provider...')
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

// only re-render this comp if the props change
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
  const { count, setCount } = useCounterContext()

  return (
    <div className="card spacing">
      <h1>Counter</h1>
      <button className="button" onClick={() => setCount(count + 1)}>
        Count {count}
      </button>
    </div>
  )
}
