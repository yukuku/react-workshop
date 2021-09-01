import React from 'react'
import { BsKanban } from 'react-icons/bs'

export const BrowseBoards = () => {
  const boards = [
    { id: 1, name: 'Board One' },
    { id: 2, name: 'Board Two' },
    { id: 3, name: 'Board Three' },
  ]

  function removeBoard(boardId) {
    console.log('Remove Board', boardId)
  }

  return (
    <div className="spacing">
      <Heading>Browse Boards</Heading>
      <div className="spacing">
        {boards.map((board) => {
          return (
            <div key={board.id} className="browse-board-item flex items-center">
              <BsKanban className="board-icon" color="var(--purple)" />
              <div className="spacing-small flex-1">
                <Heading as="h1" size={2}>
                  {board.name}
                </Heading>
              </div>
              <button onClick={() => removeBoard(board.id)} className="button button-outline">
                Remove
              </button>
            </div>
          )
        })}
      </div>
      <form action="">
        <input type="text" />
        <button></button>
      </form>
    </div>
  )
}

// A nice visual explanation of keys
// https://twitter.com/dan_abramov/status/1415279090446204929

function Heading({ children, as: Comp = 'h1', size = 1, ...rest }) {
  return (
    <Comp {...rest} className={`heading size-${size}`}>
      {children}
    </Comp>
  )
}
