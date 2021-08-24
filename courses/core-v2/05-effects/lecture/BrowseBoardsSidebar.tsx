import React, { useState, useLayoutEffect } from 'react'
import { RecentBoards } from 'ProjectPlanner/RecentBoards'
import { ActiveUsers } from 'ProjectPlanner/ActiveUsers'
import 'ProjectPlanner/BrowseBoardsSidebar.scss'

type Props = {
  width?: number
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false) // wrong probably

  useLayoutEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches) // initialState

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

export const BrowseBoardsSidebar: React.FC<Props> = ({ width = 900 }) => {
  const isWide = useMediaQuery(`(min-width: ${width}px)`)
  const darkMode = useMediaQuery(`(prefers-color-scheme: dark)`)

  return isWide ? (
    <aside className="browse-boards-sidebar spacing">
      <div>{darkMode ? 'dark' : 'light'}</div>
      <RecentBoards />
      <ActiveUsers />
    </aside>
  ) : null
}
