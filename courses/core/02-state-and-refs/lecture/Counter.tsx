import { useState } from 'react'

import { Icon } from 'course-platform/Icon'

type CounterProps = {
  count: number
  setCount(count: number): void
}

export function Counter({ count, setCount }: CounterProps) {
  const error = count < 0 ? 'Cannot be less than 0' : null

  function subtract() {
    setCount(count - 1)
  }

  function add() {
    setCount(count + 1)
  }

  return (
    <>
      <div className="counter inline-flex flex-gap">
        <div>
          <button onClick={subtract} className="button button-small">
            <Icon name="minus" />
          </button>
        </div>
        <input
          type="text"
          value={count}
          onChange={(e) => {
            // make sure the string is "numeric"
            setCount(parseInt(e.target.value))
          }}
        />
        <div>
          <button onClick={add} className="button button-small">
            <Icon name="plus" />
          </button>
        </div>
      </div>
      {error && <p>{error}</p>}
    </>
  )
}
