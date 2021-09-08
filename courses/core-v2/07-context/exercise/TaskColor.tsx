import React, { useEffect } from 'react'
import { Task } from './index'
import { useTheme } from './ThemeContext'

type Props = {
  task?: Task | null
}

export const TaskColor: React.FC<Props> = ({ task, children }) => {
  const colors = useTheme()

  let statusColor: string | null = null
  if (colors) {
    if (task) {
      if (task.completedMinutes === 0) {
        statusColor = colors.red
      } else if (task.completedMinutes >= task.minutes) {
        statusColor = colors.green
      } else {
        statusColor = colors.blue
      }
    }
  }

  return <div style={{ '--taskColor': statusColor }}>{children}</div>
}
