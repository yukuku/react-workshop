import React from 'react'
import { BsKanban } from 'react-icons/bs'

export const BrowseBoards = () => {
  const boards = [
    { id: 1, name: 'Board One' },
    { id: 2, name: 'Board Two' },
  ]

  function removeBoard(boardId) {
    console.log('Remove Board', boardId)
  }

  return (
    <div className="spacing">
      <Heading>Browse Boards</Heading>
      <div className="spacing">
        {boards.map(function (board) {
          return (
            <div key={board.id} className="browse-board-item flex items-center">
              <BsKanban className="board-icon" color="var(--purple)" />
              <div className="spacing-small flex-1">
                <h2 className="heading size-2">Board Name</h2>
              </div>
              <button
                className="button button-outline"
                onClick={() => {
                  removeBoard(board.id)
                }}
              >
                Remove
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Heading({ as: HTag = 'h1', children, size = 4, ...rest }) {
  return (
    <HTag {...rest} className={`heading size-${size}`}>
      {children}
    </HTag>
  )
}
