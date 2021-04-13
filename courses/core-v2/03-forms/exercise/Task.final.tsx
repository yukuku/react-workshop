import React, { useReducer, useRef } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { Minutes } from 'ProjectPlanner/Minutes'
import { Progress } from 'ProjectPlanner/Progress'
import { LoadingOverlay } from './LoadingOverlay'

interface TaskData {
  name: string
  content: string
  minutes: number
  completedMinutes: number
}

interface State extends TaskData {
  formState: 'UPDATING' | 'IDLE'
}

const initialState: State = {
  name: '',
  content: '',
  minutes: 20,
  completedMinutes: 0,
  formState: 'IDLE',
}

type Action =
  | { type: 'CHANGE_FIELD'; field: 'name' | 'content'; value: string }
  | { type: 'CHANGE_FIELD'; field: 'minutes' | 'completedMinutes'; value: number }
  | { type: 'REQUEST_UPDATE' }
  | { type: 'RESET_FORM' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'CHANGE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      }
    case 'REQUEST_UPDATE':
      return {
        ...state,
        formState: 'UPDATING',
      }
    case 'RESET_FORM':
      return {
        ...state,
        ...initialState,
      }
    default:
      return state
  }
}

export const Task = () => {
  const [{ formState, ...task }, dispatch] = useReducer(reducer, initialState)
  const complete = task.minutes > 0 && task.minutes === task.completedMinutes
  const nameRef = useRef<HTMLInputElement>()

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    dispatch({ type: 'REQUEST_UPDATE' })
    updateTask(task).then((newTask) => {
      console.log(newTask)
      dispatch({ type: 'RESET_FORM' })
      nameRef.current.focus()
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <div className="flex-1 spacing">
            <input
              className="form-field"
              type="text"
              placeholder="Task Name"
              required
              ref={nameRef}
              value={task.name}
              onChange={(event) => {
                dispatch({
                  type: 'CHANGE_FIELD',
                  field: 'name',
                  value: event.target.value,
                })
              }}
            />
            <textarea
              className="form-field"
              placeholder="Task"
              required
              value={task.content}
              onChange={(event) => {
                dispatch({
                  type: 'CHANGE_FIELD',
                  field: 'content',
                  value: event.target.value,
                })
              }}
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
                onChange={(minutes) => {
                  dispatch({
                    type: 'CHANGE_FIELD',
                    field: 'minutes',
                    value: minutes,
                  })
                }}
              />
            </div>

            <div className="spacing-small">
              <Heading as="h2" size={4}>
                Minutes Completed: {task.completedMinutes}/{task.minutes}
              </Heading>
              <Progress
                completedMinutes={task.completedMinutes}
                totalMinutes={task.minutes}
                onChange={(completedMinutes) => {
                  dispatch({
                    type: 'CHANGE_FIELD',
                    field: 'completedMinutes',
                    value: completedMinutes,
                  })
                }}
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
