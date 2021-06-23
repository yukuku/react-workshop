import React, { useState, useLayoutEffect } from 'react'
import { RecentBoards } from 'ProjectPlanner/RecentBoards'
import { ActiveUsers } from 'ProjectPlanner/ActiveUsers'
import 'ProjectPlanner/BrowseBoardsSidebar.scss'

export const BrowseBoardsSidebar: React.FC<{ width?: number }> = ({ width = 900 }) => {
  const query = `(min-width: ${width}px)`
  const [isWide, setIsWide] = useState(true)

  useLayoutEffect(() => {
    const media = window.matchMedia(query)
    const listener = () => {
      setIsWide(media.matches)
    }
    media.addEventListener('change', listener)
    setIsWide(media.matches)
    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return isWide ? (
    <aside className="browse-boards-sidebar spacing">
      <RecentBoards />
      <ActiveUsers />
    </aside>
  ) : null
}
