import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useParams } from 'react-router-dom'
import './styles.scss'

function App() {
  return (
    <div className="App">
      <Count />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

function useStableRef(value) {
  let valueRef = React.useRef(value)
  React.useEffect(() => {
    valueRef.current = value
  }, [value])
  return valueRef
}

function Count() {
  const [count, setCount] = React.useState(0)

  let countRef = useStableRef(count)

  React.useEffect(() => {
    let id = window.setInterval(() => {
      console.log(`Count is: ${countRef.current}`)
    }, 2000)

    return () => {
      window.clearInterval(id)
    }
  }, [countRef])

  return (
    <div>
      <p>{count}</p>
      <button className="button" onClick={() => setCount((c) => c + 1)}>
        Increment
      </button>
    </div>
  )
}
