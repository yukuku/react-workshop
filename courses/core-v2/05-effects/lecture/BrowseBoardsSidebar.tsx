import React, { useState, useEffect } from 'react'
import { RecentBoards } from 'ProjectPlanner/RecentBoards'
import { ActiveUsers } from 'ProjectPlanner/ActiveUsers'
import 'ProjectPlanner/BrowseBoardsSidebar.scss'

type Props = {
  width?: number
}

function useMedia(query) {
  const [matches, setMatches] = useState<null | boolean>(null)

  React.useLayoutEffect(() => {
    const media = window.matchMedia(query)
    const listener = () => {
      setMatches(media.matches)
    }
    media.addEventListener('change', listener)
    setMatches(media.matches)
    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return matches
}

export const BrowseBoardsSidebar: React.FC<Props> = ({ width = 900 }) => {
  const isWide = useMedia(`(min-width: ${width}px)`)
  const darkMode = useMedia(`(prefers-color-scheme: dark)`)

  return isWide ? (
    <aside className="browse-boards-sidebar spacing">
      <RecentBoards />
      <ActiveUsers />
    </aside>
  ) : null
}