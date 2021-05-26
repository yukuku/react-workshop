import React from 'react'
import { BsKanban } from 'react-icons/bs'

export const BrowseBoards = () => {
  const boards = [
    { id: 1, name: 'Board One' },
    { id: 3, name: 'Board Three' },
    { id: 5, temp: true },
  ]

  function removeBoard(boardId) {
    console.log('Remove Board', boardId)
  }

  return (
    <div className="spacing">
      <h1 className="heading size-1">Browse Boards</h1>
      <div className="spacing">
        {boards.map((board) => {
          return (
            <div key={board.id} className="browse-board-item flex items-center">
              <BsKanban className="board-icon" color="var(--purple)" />
              <div className="spacing-small flex-1">
                <h2 className="heading size-2">Board Name</h2>
              </div>
              <button className="button button-outline">Remove</button>
            </div>
          )
        })}
      </div>
      <form>
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </form>
    </div>
  )
}

function Heading({ children, size = 1, ...rest }) {
  // For the bonus task, see if you can program this component to be used
  // instead of <h1> and <h2>. See the README for more info.
  return (
    <h1 {...rest} className="heading size-1">
      {children}
    </h1>
  )
}
