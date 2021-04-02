import React, { useState } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { Progress } from 'ProjectPlanner/Progress'
import { Minutes } from './Minutes'

// Remember, there are more detailed instructions in the README.md
// file with every exercise

export const Task = () => {
  const [completedMinutes, setCompletedMinutes] = useState(0)
  const [minutes, setMinutes] = useState(0)

  const complete = minutes > 0 && completedMinutes === minutes

  return (
    <div className="spacing">
      <div className="spacing-small">
        <Heading as="h2" size={4}>
          Total Task Minutes:
        </Heading>
        <Minutes minutes={minutes} setMinutes={setMinutes} />
      </div>

      <div className="spacing-small">
        <Heading as="h2" size={4}>
          Minutes Completed: {completedMinutes}/{minutes}
        </Heading>
        <Progress
          completedMinutes={completedMinutes}
          totalMinutes={minutes}
          status={complete ? 'complete' : 'progress'}
          // Task 1:
          onChange={(completedMinutes) => {
            setCompletedMinutes(completedMinutes)
          }}
        />
      </div>

      {minutes > 0 && (
        <div>
          <button
            onClick={() => {
              setCompletedMinutes(minutes)
            }}
            className={`button ${complete ? 'button-green' : ''}`}
          >
            Complete
          </button>
        </div>
      )}
    </div>
  )
}
