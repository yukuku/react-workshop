import React from 'react'
import { BsKanban } from 'react-icons/bs'

export const BrowseBoards = () => {
  const boards = [
    { id: 1, name: 'Board One' },
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
                <Heading as="h2" size={3}>
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
    </div>
  )
}

function Heading({ children, as: Comp = 'h1', size = 1, ...props }) {
  // For the bonus task, see if you can program this component to be used
  // instead of <h1> and <h2>. See the README for more info.
  return (
    <Comp {...props} className={`heading size-${size}`}>
      {children}
    </Comp>
  )
}
