import React from 'react'
import { BsKanban } from 'react-icons/bs'

// const users = [
//   { id: 1, name: 'brad', age: 38 },
//   { id: 2, name: 'brandon', age: 32 },
//   { id: 3, name: 'jessica', age: 36 },
// ]

// // const newArray = users.filter((user) => {
// //   return user.age > 35
// // })

// // const result = newArray.map((user) => {
// //   return user.id
// // })

// const result = users
//   .filter((user) => user.age > 35)
//   .map((user) => user.id)

// // [1, 3]

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
      <h1 className="heading size-1">Browse Boards</h1>
      <div className="spacing">
        {boards.map((board) => {
          return (
            <div key={board.id} className="browse-board-item flex items-center">
              <BsKanban className="board-icon" color="var(--purple)" />
              <div className="spacing-small flex-1">
                <h2 className="heading size-2">{board.name}</h2>
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

// A nice visual explanation of keys
// https://twitter.com/dan_abramov/status/1415279090446204929

function Heading({ children, size = 1, ...rest }) {
  // For the bonus task, see if you can program this component to be used
  // instead of <h1> and <h2>. See the README for more info.
  return (
    <h1 {...rest} className="heading size-1">
      {children}
    </h1>
  )
}
