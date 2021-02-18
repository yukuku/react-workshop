import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { FaCheck, FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'
import { Dialog } from 'ProjectPlanner/Dialog'
import { AvatarGroup } from 'ProjectPlanner/AvatarGroup'
import { Heading } from 'ProjectPlanner/Heading'
import { Minutes } from 'ProjectPlanner/Minutes'
import { Progress } from 'ProjectPlanner/Progress'
import { TaskColor } from 'ProjectPlanner/TaskColor'
import { useBoardContext } from './BoardContext'
import { Task } from 'ProjectPlanner/types'
import 'ProjectPlanner/TaskDialog.scss'

type Props = {
  taskId: number
  siblingTaskIds: number[]
  onChangeTaskId(taskId: number): void
  onClose(): void
}

export const TaskDialog: React.FC<Props> = ({
  taskId,
  siblingTaskIds,
  onChangeTaskId,
  onClose,
}) => {
  const { getTask, updateTask } = useBoardContext()

  const [task, setTask] = useState<Task | undefined>(undefined)
  const [edited, setEdited] = useState(false)

  useEffect(() => {
    setTask(getTask(taskId))
  }, [getTask, taskId])

  const complete = (task && task.minutes === task.completedMinutes && task.minutes > 0) || false
  const i = siblingTaskIds.indexOf(taskId)
  const prevTaskId = i > 0 && siblingTaskIds[i - 1]
  const nextTaskId = i < siblingTaskIds.length - 1 && siblingTaskIds[i + 1]

  function update(partialTask: Partial<Task>) {
    if (!task) return
    console.log('real time typing')
    setTask({ ...task, ...partialTask })
    setEdited(true)
  }

  useEffect(() => {
    if (task && edited) {
      const id = setTimeout(() => {
        console.log('update the database and context')
        updateTask(taskId, task)
      }, 1000)
      return () => {
        clearTimeout(id)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task, edited])

  return (
    <Dialog onClose={onClose} aria-label="Edit Task">
      <TaskColor task={task}>
        <div className="spacing">
          <div className="flex">
            <div className="flex-1 spacing">
              <input
                className="form-field"
                type="text"
                placeholder="Task Name"
                value={task?.name || ''}
                onChange={(e) => {
                  update({ name: e.target.value })
                }}
              />
              <textarea
                className="form-field"
                style={{ minHeight: '9rem' }}
                placeholder="Task"
                value={task?.content || ''}
                onChange={(e) => {
                  update({ content: e.target.value })
                }}
              />
            </div>
            <div className="w-40 ml-4 spacing">
              <div className="spacing-small">
                <Heading as="h2" size={4}>
                  Assigned To:
                </Heading>
                {task ? <AvatarGroup userIds={task.assignedTo} /> : '...'}
              </div>

              <div className="spacing-small">
                <Heading as="h2" size={4}>
                  Total Task Minutes:
                </Heading>
                {task && (
                  <Minutes
                    minutes={task.minutes}
                    min={task.completedMinutes}
                    onChange={(minutes) => update({ minutes })}
                  />
                )}
              </div>

              <div className="spacing-small">
                <Heading as="h2" size={4}>
                  Minutes Completed: {task?.completedMinutes}/{task?.minutes}
                </Heading>
                {task && task.minutes > 0 && (
                  <Progress
                    totalMinutes={task.minutes || 0}
                    completedMinutes={task.completedMinutes || 0}
                    onChange={(completedMinutes) => update({ completedMinutes })}
                  />
                )}
                <p className="text-small">
                  {task && task.minutes === 0 && <i>Set Minutes First</i>}
                  {task && task.minutes > 0 && (
                    <span className="task-completion-status">
                      {((task.completedMinutes / task.minutes) * 100).toFixed(0)}% Complete
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
          <footer className="flex-split">
            <div className="horizontal-spacing">
              <button
                aria-label="Previous Task"
                disabled={!prevTaskId}
                className="prev-task"
                onClick={() => {
                  if (prevTaskId) onChangeTaskId(prevTaskId)
                }}
              >
                <FaArrowCircleLeft />
              </button>
              <button
                aria-label="Next Task"
                disabled={!nextTaskId}
                className="next-task"
                onClick={() => {
                  if (nextTaskId) onChangeTaskId(nextTaskId)
                }}
              >
                <FaArrowCircleRight />
              </button>
            </div>
            <div className="horizontal-spacing">
              <button className="button button-outline" onClick={onClose}>
                Close
              </button>

              {task && task.minutes > 0 && (
                <button
                  className={classnames('button', { 'button-green': complete })}
                  onClick={() => {
                    if (complete) {
                      onClose()
                    } else {
                      update({ completedMinutes: task.minutes })
                    }
                  }}
                >
                  {complete ? (
                    <>
                      <FaCheck />
                      <span>Done</span>
                    </>
                  ) : (
                    <span>Complete</span>
                  )}
                </button>
              )}
            </div>
          </footer>
        </div>
      </TaskColor>
    </Dialog>
  )
}
