import * as React from 'react'
import { connect, useSelector } from 'react-redux'
import Counter from './Counter'

function PrimaryLayout() {
  const count = useSelector((newState) => {
    return newState.counterState.count
  })

  return (
    <div>
      <h1>Redux Counter</h1>
      <div>Count: {count}</div>
      <Counter />
    </div>
  )
}

export default PrimaryLayout

// function mapStateToProps(newState) {
//   return {
//     count: newState.counterState.count,
//   }
// }

// export default connect(mapStateToProps)(PrimaryLayout)
