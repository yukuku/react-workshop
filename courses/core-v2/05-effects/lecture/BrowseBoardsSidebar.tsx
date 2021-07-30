import React, { useState, useLayoutEffect, useEffect } from 'react'
import { RecentBoards } from 'ProjectPlanner/RecentBoards'
import { ActiveUsers } from 'ProjectPlanner/ActiveUsers'
import 'ProjectPlanner/BrowseBoardsSidebar.scss'

type Props = {
  width?: number
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

function useMedia(query) {
  const [matches, setMatches] = useState(true) // end

  useIsomorphicLayoutEffect(() => {
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
  const dark = useMedia(`(prefers-color-scheme: dark)`)

  return isWide ? (
    <aside className="browse-boards-sidebar spacing">
      {dark ? 'dark mode' : 'light mode'}
      <RecentBoards />
      <ActiveUsers />
    </aside>
  ) : null
}
