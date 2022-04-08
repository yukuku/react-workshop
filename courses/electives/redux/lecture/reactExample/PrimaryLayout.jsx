import { connect, useSelector } from 'react-redux'
import Counter from './Counter'

function useCounter() {
  const { count } = useSelector((state) => {
    return {
      count: state.counterState.count,
    }
  })
  return count
}

function PrimaryLayout() {
  const count = useCounter()

  return (
    <div>
      <h1>Redux Counter</h1>
      <div>Count: {count}</div>
      <Counter />
    </div>
  )
}

export default PrimaryLayout
