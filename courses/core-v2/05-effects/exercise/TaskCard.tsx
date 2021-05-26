import React, { useRef, useEffect } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

const colors = {
  red: '#ff5656',
  green: '#4dd579',
  blue: '#04b3ff',
}

export const TaskCard: React.FC<{ color: string }> = ({ color }) => {
  const taskRef = useRef(null)

  useEffect(() => {
    taskRef.current.style.setProperty(`--taskColor`, colors[color])
  }, [color])

  return (
    <div className="task-card spacing" ref={taskRef}>
      <Heading>Task Card</Heading>
      {color && (
        <span>
          {color}: {colors[color]}
        </span>
      )}
    </div>
  )
}
