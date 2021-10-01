import React, { useState, useLayoutEffect } from 'react'
import { RecentBoards } from 'ProjectPlanner/RecentBoards'
import { ActiveUsers } from 'ProjectPlanner/ActiveUsers'
import 'ProjectPlanner/BrowseBoardsSidebar.scss'

// function useMedia(query) {
//   const [matches, setMatches] = useState(false)

//   useLayoutEffect(() => {
//     const media = window.matchMedia(query)
//     setMatches(media.matches)
//     const listener = () => {
//       setMatches(media.matches)
//     }
//     media.addEventListener('change', listener)
//     return () => {
//       media.removeEventListener('change', listener)
//     }
//   }, [query])

//   return matches
// }

type Props = {
  width?: number
}

export const BrowseBoardsSidebar: React.FC<Props> = ({ width = 900 }) => {
  const query = `(min-width: ${width}px)`

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

  return matches ? (
    <aside className="browse-boards-sidebar spacing">
      <RecentBoards />
      <ActiveUsers />
    </aside>
  ) : null
}
