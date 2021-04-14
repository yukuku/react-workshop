import * as React from 'react'
import Quantity from './Quantity'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

/**
 * See: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library
 */

describe('Quantity', () => {
  it('should start with 0', () => {
    let { getByRole } = render(<Quantity />)
    const quantity = getByRole('textbox')
    expect(quantity.value).toEqual('0')
  })

  it('should add', () => {
    let { getByRole, getByLabelText } = render(<Quantity />)
    const quantity = getByRole('textbox')
    const add = getByLabelText('Add an item')
    fireEvent.click(add)
    expect(quantity.value).toEqual('1')
  })

  it('should subtract', () => {
    let { getByRole, getByLabelText } = render(<Quantity />)
    const quantity = getByRole('textbox')
    const add = getByLabelText('Add an item')
    const subtract = getByLabelText('Remove an item')
    // Since this component is uncontrolled and always starts at 0,
    // we'll add first to test subtract
    fireEvent.click(add)
    fireEvent.click(subtract)
    expect(quantity.value).toEqual('0')
  })

  it('should not allow subtraction when quantity is already 0', () => {
    let { getByRole, getByLabelText } = render(<Quantity />)
    const quantity = getByRole('textbox')
    const subtract = getByLabelText('Remove an item')
    expect(quantity.value).toEqual('0')
    fireEvent.click(subtract)
    expect(quantity.value).toEqual('0')
  })

  describe('when the input is focused', () => {
    it('it should add on ArrowUp press', () => {
      let { getByRole } = render(<Quantity />)
      const quantity = getByRole('textbox')
      fireEvent.keyDown(quantity, { key: 'ArrowUp' })
      expect(quantity.value).toEqual('1')
    })

    it('it should subtract on ArrowDown press', () => {
      let { getByRole } = render(<Quantity />)
      const quantity = getByRole('textbox')
      fireEvent.keyDown(quantity, { key: 'ArrowUp' })
      fireEvent.keyDown(quantity, { key: 'ArrowDown' })
      expect(quantity.value).toEqual('0')
    })
  })
})
