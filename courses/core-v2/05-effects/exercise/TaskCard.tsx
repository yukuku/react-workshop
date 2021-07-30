import React, { useRef, useLayoutEffect } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

const colors = {
  red: '#ff5656',
  green: '#4dd579',
  blue: '#04b3ff',
}

export const TaskCard: React.FC<{ color: string }> = ({ color }) => {
  const taskRef = useRef<HTMLDivElement>(null)

  // useLayoutEffect(() => {
  //   taskRef.current.style.setProperty(`--taskColor`, colors[color])
  // }, [color])

  return (
    <div className="task-card spacing" style={{ '--taskColor': colors[color] }}>
      <Heading>Task Card</Heading>
      {color && (
        <span>
          {color}: {colors[color]}
        </span>
      )}
    </div>
  )
}
