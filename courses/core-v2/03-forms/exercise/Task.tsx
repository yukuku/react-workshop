import React, { useState, useRef } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { Minutes } from 'ProjectPlanner/Minutes'
import { Progress } from 'ProjectPlanner/Progress'

type TaskType = {
  name: string
  content: string
  minutes: number
  completedMinutes: number
}

export const Task = () => {
  const [task, setTask] = useState<TaskType>({
    minutes: 20,
    completedMinutes: 0,
    name: '',
    content: '',
  })
  const complete = task.minutes > 0 && task.minutes === task.completedMinutes

  const usernameRef = useRef<HTMLInputElement>()

  function update(partialTask: Partial<TaskType>) {
    if (!task) return
    setTask({ ...task, ...partialTask })
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    console.log(task)
    setTask({
      minutes: 0,
      completedMinutes: 0,
      name: '',
      content: '',
    })
    usernameRef.current.focus()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex">
        <div className="flex-1 spacing">
          <input
            value={task.name}
            onChange={(event) => {
              const name = event.target.value
              update({ name })
            }}
            className="form-field"
            type="text"
            ref={usernameRef}
            placeholder="Task Name"
            required
          />
          <textarea
            value={task.content}
            onChange={(event) => {
              update({ content: event.target.value })
            }}
            className="form-field"
            placeholder="Task"
            required
          />
        </div>
        <div className="spacing w-40 ml-4">
          <div className="spacing-small">
            <Heading as="h2" size={4}>
              Total Task Minutes:
            </Heading>
            <Minutes
              minutes={task.minutes}
              min={task.completedMinutes}
              onChange={(minutes) => update({ minutes })}
            />
          </div>

          <div className="spacing-small">
            <Heading as="h2" size={4}>
              Minutes Completed: {task.completedMinutes}/{task.minutes}
            </Heading>
            <Progress
              completedMinutes={task.completedMinutes}
              totalMinutes={task.minutes}
              onChange={(completedMinutes) => update({ completedMinutes })}
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
  )
}
