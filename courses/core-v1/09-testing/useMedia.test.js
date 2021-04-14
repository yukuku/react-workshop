import { renderHook, act } from '@testing-library/react-hooks'
import useMedia from './useMedia'

// Mock window.matchMedia
// https://github.com/Ayc0/mock-match-media-examples/blob/master/create-react-app/src/App.test.js
import 'mock-match-media/polyfill'
import { setMedia } from 'mock-match-media'

describe('useMedia', () => {
  it('???', () => {
    expect(true).toBe(true)
  })
})
