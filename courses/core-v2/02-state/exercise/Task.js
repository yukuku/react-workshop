import React, { useState } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { Progress } from 'ProjectPlanner/Progress'
import { Minutes } from './Minutes'

export const Task = () => {
  const [completedMinutes, setCompletedMinutes] = useState(0)
  const [minutes, setMinutes] = useState(0)

  return (
    <div className="spacing">
      <div className="spacing-small">
        <Heading as="h2" size={4}>
          Total Task Minutes:
        </Heading>
        <Minutes minutes={minutes} setMinutes={setMinutes} min={completedMinutes} />
      </div>

      <div className="spacing-small">
        <Heading as="h2" size={4}>
          Minutes Completed: {completedMinutes}/{minutes}
        </Heading>
        <Progress
          completedMinutes={completedMinutes}
          totalMinutes={minutes}
          status="progress"
          // Task 1:
          onChange={(completedMinutes) => {
            setCompletedMinutes(completedMinutes)
          }}
        />
      </div>

      {minutes > 0 && (
        <div>
          <button className={`button`} onClick={() => setCompletedMinutes(minutes)}>
            Complete
          </button>
        </div>
      )}
    </div>
  )
}
