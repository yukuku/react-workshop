import React, { useState, useLayoutEffect } from 'react'
import { RecentBoards } from 'ProjectPlanner/RecentBoards'
import { ActiveUsers } from 'ProjectPlanner/ActiveUsers'
import 'ProjectPlanner/BrowseBoardsSidebar.scss'

function useMedia(query) {
  const [matches, setMatches] = useState(false)

  useLayoutEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)
    const listener = () => {
      setMatches(media.matches)
    }
    media.addEventListener('change', listener)
    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return matches
}

type Props = {
  width?: number
}

export const BrowseBoardsSidebar = ({ width = 900 }: Props) => {
  const isWide = useMedia(`(min-width: ${width}px)`)
  const darkMode = useMedia(`(prefers-color-scheme: dark)`)

  return isWide ? (
    <aside className="browse-boards-sidebar spacing">
      {darkMode ? 'dark' : 'light'}
      <RecentBoards />
      <ActiveUsers />
    </aside>
  ) : null
}
