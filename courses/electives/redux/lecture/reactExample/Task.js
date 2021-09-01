import * as React from 'react'
import { useSelector } from 'react-redux'
import { actions } from './state/taskState'
import store from './store'

function getTask() {
  return Promise.resolve({ name: 'Hello ' })
}

const Task = () => {
  const [, set] = useState()

  useEffect(() => {}, [taskId])

  // componentDidMount() {
  //   store.dispatch({ action: 'LOAD', .....})
  // }

  return <div>Task</div>
}
