import React, { useState, useRef } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { Minutes } from 'ProjectPlanner/Minutes'
import { Progress } from 'ProjectPlanner/Progress'
import { LoadingOverlay } from './LoadingOverlay'

// 👀
interface TaskData {
  name: string
  content: string
  minutes: number
  completedMinutes: number
}

export const Task = () => {
  let [minutes, setMinues] = useState(20)
  let [completedMinutes, setCompletedMinutes] = useState(0)

  let task = {
    // name, 👀
    // content, 👀
    minutes,
    completedMinutes,
  }

  let complete = minutes > 0 && minutes === completedMinutes
  let formState = 'IDLE' // 👀

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    console.log(task)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <div className="flex-1 spacing">
            <input className="form-field" type="text" placeholder="Task Name" required />
            <textarea className="form-field" placeholder="Task" required />
          </div>
          <div className="spacing w-40 ml-4">
            <div className="spacing-small">
              <Heading as="h2" size={4}>
                Total Task Minutes:
              </Heading>
              <Minutes
                minutes={task.minutes}
                min={task.completedMinutes}
                onChange={(minutes) => setMinues(minutes)}
              />
            </div>

            <div className="spacing-small">
              <Heading as="h2" size={4}>
                Minutes Completed: {task.completedMinutes}/{task.minutes}
              </Heading>
              <Progress
                completedMinutes={task.completedMinutes}
                totalMinutes={task.minutes}
                onChange={(completedMinutes) => setCompletedMinutes(completedMinutes)}
                status={complete ? 'complete' : 'progress'}
              />
            </div>
          </div>
        </div>
        <footer className="mt-4">
          <button className="button" type="submit">
            Submit
          </button>
        </footer>
      </form>
      {formState === 'UPDATING' ? <LoadingOverlay /> : null}
    </div>
  )
}

async function updateTask(task: TaskData) {
  return await new Promise<TaskData>((res) => window.setTimeout(() => res(task), 2000))
}
