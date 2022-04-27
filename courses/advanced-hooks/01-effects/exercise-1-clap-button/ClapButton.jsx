import { useState, useEffect } from 'react'
import { saveClapsToDatabase } from './utils'

export function ClapButton() {
  const [claps, setClaps] = useState(0)
  const [queueClaps, setQueueClaps] = useState(0)

  useEffect(() => {
    if (queueClaps > 0) {
      const id = setTimeout(() => {
        saveClapsToDatabase(queueClaps).then((latestClaps) => {
          setQueueClaps(0)
          setClaps(latestClaps)
        })        
      }, 1000);
      return () => clearTimeout(id);
    }
  }, [queueClaps])

  function clap() {
    setQueueClaps((old) => old + 1)
  }

  function saveClaps() {
      saveClapsToDatabase(this.state.queueClaps).then((latestClaps) => {
        this.setState({
          claps: latestClaps,
          queueClaps: 0,
        })
      })
  }

  return (
    <div className="text-center spacing">
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

// If you want to start from a function component instead of refactoring:

// function ClapButton() {
//   const [claps, setClaps] = useState(0)
//   const [queueClaps, setQueueClaps] = useState(0)

//   function clap() {
//   }

//   return (
//     <div className="text-center spacing">
//       <button onClick={clap} className="button">
//         Clap
//       </button>
//       <hr />
//       <div className="horizontal-spacing">
//         <span>Queue Claps: {queueClaps}</span>
//         <span>Claps: {claps}</span>
//       </div>
//     </div>
//   )
// }
