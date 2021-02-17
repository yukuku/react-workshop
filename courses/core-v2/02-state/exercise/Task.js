import React, { useState } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { Progress } from 'ProjectPlanner/Progress'
import { Minutes } from './Minutes'

// Remember, there are more detailed instructions in the README.md
// file with every exercise

export const Task = () => {
  // Task 1: Make this variable "stateful" using useState. Then go
  // down to where it says "Task 1" below and uncomment the part
  // that changes this state when the progress slider changes
  const [completedMinutes, setCompletedMinutes] = useState(0)

  // Step 2: You need to "lift" the state from the Minutes component
  // to here. That means you'll move the useState() line in Minutes
  // to here and pass down a `minutes` and an `onChange` prop like this:
  // <Minutes minutes={minutes} onChange={fn}>
  // Replace fn with a function that calls setMinutes.
  const [minutes, setMinutes] = useState(0)

  // For more tasks, see the README.md

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
          status="progress"
          // Task 1:
          onChange={(completedMinutes) => {
            setCompletedMinutes(completedMinutes)
          }}
        />
      </div>

      {minutes > 0 && (
        <div>
          <button
            className={`button`}
            onClick={() => {
              setCompletedMinutes(minutes)
            }}
          >
            Complete
          </button>
        </div>
      )}
    </div>
  )
}
