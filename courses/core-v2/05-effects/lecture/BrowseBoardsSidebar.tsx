import React, { useState, useLayoutEffect } from 'react'
import { RecentBoards } from 'ProjectPlanner/RecentBoards'
import { ActiveUsers } from 'ProjectPlanner/ActiveUsers'
import 'ProjectPlanner/BrowseBoardsSidebar.scss'

type Props = {
  width?: number
}

export const BrowseBoardsSidebar: React.FC<Props> = ({ width = 900 }) => {
  const query = `(min-width: ${width}px)`
  const [isWide, setIsWide] = useState(true)

  useLayoutEffect(() => {
    const media = window.matchMedia(query)
    setIsWide(media.matches)
    const listener = () => {
      setIsWide(media.matches)
    }
    media.addEventListener('change', listener)
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
