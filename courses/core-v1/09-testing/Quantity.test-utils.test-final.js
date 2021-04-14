import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Quantity from './Quantity'
import { act } from 'react-dom/test-utils'

describe('Quantity', () => {
  let container
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
    container = null
  })

  it('should start with 0', () => {
    act(() => {
      ReactDOM.render(<Quantity />, container)
    })
    const input = container.querySelector('[data-testid="quantity"]')
    expect(input.value).toBe('0')
  })

  it('should add', () => {
    act(() => {
      ReactDOM.render(<Quantity />, container)
    })
    const addButton = container.querySelector('[data-testid=add-button]')
    const input = container.querySelector('[data-testid="quantity"]')
    act(() => {
      addButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expect(input.value).toBe('1')
  })

  it('should subtract', () => {
    act(() => {
      ReactDOM.render(<Quantity />, container)
    })
    const subtractButton = container.querySelector('[data-testid=subtract-button]')
    const addButton = container.querySelector('[data-testid=add-button]')
    const input = container.querySelector('[data-testid="quantity"]')
    act(() => {
      addButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    act(() => {
      subtractButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expect(input.value).toBe('0')
  })

  it('should not allow subtraction when quantity is 0', () => {
    act(() => {
      ReactDOM.render(<Quantity />, container)
    })
    const subtractButton = container.querySelector('[data-testid=subtract-button]')
    const input = container.querySelector('[data-testid="quantity"]')
    expect(input.value).toBe('0')
    act(() => {
      subtractButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expect(input.value).toBe('0')
  })

  describe('when the input is focused', () => {
    it('it should add on ArrowUp press', () => {
      act(() => {
        ReactDOM.render(<Quantity />, container)
      })
      const input = container.querySelector('[data-testid="quantity"]')
      act(() => {
        input.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: 'ArrowUp',
            bubbles: true,
          })
        )
      })
      expect(input.value).toBe('1')
    })

    it('it should subtract on ArrowDown press', () => {
      act(() => {
        ReactDOM.render(<Quantity />, container)
      })
      const input = container.querySelector('[data-testid="quantity"]')
      act(() => {
        input.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: 'ArrowUp',
            bubbles: true,
          })
        )
      })
      act(() => {
        input.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: 'ArrowDown',
            bubbles: true,
          })
        )
      })
      expect(input.value).toBe('0')
    })
  })
})
