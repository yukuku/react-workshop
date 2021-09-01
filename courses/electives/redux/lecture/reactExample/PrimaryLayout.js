import * as React from 'react'
import { connect, useSelector } from 'react-redux'
import Task from './Task'

function PrimaryLayout({ task }) {
  return (
    <div>
      <h1>Redux Counter</h1>
      <div>{task?.name}</div>
      <br />
      <br />
      <br />
      <Task></Task>
    </div>
  )
}

function mapStateToProps({ taskState }) {
  return { task: taskState.task }
}

export default connect(mapStateToProps)(PrimaryLayout)
