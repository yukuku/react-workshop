import React, { useRef, useLayoutEffect } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

const colors = {
  red: '#ff5656',
  green: '#4dd579',
  blue: '#04b3ff',
}

function TaskColor({ color, children }) {
  const taskRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    taskRef.current.style.setProperty(`--taskColor`, colors[color])
  }, [color])

  return <div ref={taskRef}>{children}</div>
}

export const TaskCard: React.FC<{ color: string }> = ({ color }) => {
  return (
    <TaskColor color={color}>
      <div className="task-card spacing">
        <Heading>Task Card</Heading>
        {color && (
          <span>
            {color}: {colors[color]}
          </span>
        )}
      </div>
    </TaskColor>
  )
}
