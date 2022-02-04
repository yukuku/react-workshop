import * as React from 'react'
import * as ReactDOM from 'react-dom'
import debounce from 'lodash.debounce'
import { saveClapsToDatabase } from './utils'

const ClapButton = () => {
  const [claps, setClaps] = React.useState(0)
  const [queueClaps, setQueueClaps] = React.useState(0)

  const queueClapsRef = React.useRef(0)

  // React.useEffect(() => {
  //   if (queueClaps > 0) {

  //     return () => {
  //       clearTimeout(id)
  //     }
  //   }
  // }, [queueClaps])

  const save = debounce(() => {
    saveClapsToDatabase(queueClaps).then((latestClaps) => {
      setClaps(latestClaps)
      setQueueClaps(0)
    })
  })

  const clap = () => {
    queueClapsRef.current++
    save()
  }

  return (
    <div className="align-center spacing debounce">
      <button onClick={clap} className="button">
        Clap {queueClaps + claps}
      </button>
    </div>
  )
}

ReactDOM.render(<ClapButton />, document.getElementById('root'))

// One of our instructors wrote a blog article on this exact topic of "debouncing claps":
// https://reacttraining.com/blog/blog-claps-and-lessons-on-hooks/
