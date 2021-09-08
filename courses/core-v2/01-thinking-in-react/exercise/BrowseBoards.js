import React from 'react'
import { BsKanban } from 'react-icons/bs'

export const BrowseBoards = () => {
  const boards = [
    { id: 1, name: 'Board One' },
    { id: 2, name: 'Board Two' },
    { id: 3, name: 'Board Three' },
    { id: 4, name: 'Board Three' },
  ]

  function removeBoard(boardId) {
    console.log('Remove Board', boardId)
  }

  return (
    <div className="spacing">
      <Heading as="h2">Browse Boards</Heading>
      <div className="spacing">
        {boards.map((board) => {
          return (
            <div key={board.id} className="browse-board-item flex items-center">
              <BsKanban className="board-icon" color="var(--purple)" />
              <div className="spacing-small flex-1">
                <Heading>{board.name}</Heading>
              </div>
              <button className="button button-outline">Remove</button>
            </div>
          )
        })}
      </div>
      <form action="">
        <textarea name="" id="" cols="30" rows="10"></textarea>
        <button></button>
      </form>
    </div>
  )
}

// A nice visual explanation of keys
// https://twitter.com/dan_abramov/status/1415279090446204929

function Heading({ as: Comp = 'h1', children, size = 1, ...props }) {
  // For the bonus task, see if you can program this component to be used
  // instead of <h1> and <h2>. See the README for more info.
  return (
    <Comp {...props} className={`heading ${size}`}>
      {children}
    </Comp>
  )
}
