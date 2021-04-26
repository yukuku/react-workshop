import * as React from 'react'
import * as ReactDOM from 'react-dom'
import debounce from 'lodash.debounce'
import { saveClapsToDatabase } from './utils'

const ClapButton = () => {
  const [claps, setClaps] = React.useState(0)
  const [queueClaps, setQueueClaps] = React.useState(0)

  React.useEffect(() => {
    if (queueClaps > 0) {
      const id = setTimeout(() => {
        saveClapsToDatabase(queueClaps).then((latestClaps) => {
          setQueueClaps(0)
          setClaps(latestClaps)
        })
      }, 1000)
      return () => {
        clearTimeout(id)
      }
    }
  }, [queueClaps])

  const clap = () => {
    setQueueClaps(queueClaps + 1)
  }

  return (
    <div className="align-center spacing debounce">
      <button onClick={clap} className="button">
        Clap
      </button>
      <hr />
      <div className="horizontal-spacing">
        <span>Queue Claps: {queueClaps}</span>
        <span>Claps: {claps}</span>
      </div>
    </div>
  )
}

ReactDOM.render(<ClapButton />, document.getElementById('root'))

// One of our instructors wrote a blog article on this exact topic of "debouncing claps":
// https://reacttraining.com/blog/blog-claps-and-lessons-on-hooks/

interface ClapButtonProps {}

interface ClapButtonState {
  claps: number
  queueClaps: number
}
