import { renderHook, act } from '@testing-library/react-hooks'
import useMedia from './useMedia'

// Mock window.matchMedia
// https://github.com/Ayc0/mock-match-media-examples/blob/master/create-react-app/src/App.test.js
import 'mock-match-media/polyfill'
import { setMedia } from 'mock-match-media'

describe('useMedia', () => {
  it('it should match when the screen is wide enough', async () => {
    setMedia({ width: '1000px' })
    const { result } = renderHook(() => useMedia('(min-width: 800px)'))
    expect(result.current).toBe(true)
  })

  it('it should not match when the screen is too narrow', async () => {
    setMedia({ width: '500px' })
    const { result } = renderHook(() => useMedia('(min-width: 800px)'))
    expect(result.current).toBe(false)
  })

  it('it should match after window resize', async () => {
    setMedia({ width: '500px' })
    const { result } = renderHook(() => useMedia('(min-width: 800px)'))
    expect(result.current).toBe(false)

    // Change the media after the hook has starting running (requires act)
    act(() => {
      setMedia({ width: '1000px' })
    })

    expect(result.current).toBe(true)
  })
})
