import React, { useState, useRef, useEffect } from 'react'

const renderQueue = []

function Tweet({ id, options }) {
  const tweetRef = useRef()

  useEffect(() => {
    function renderTweet() {
      window.twttr.widgets.createTweetEmbed(id, tweetRef.current, options)
    }

    if (!window.twttr) {
      if (renderQueue.length === 0) {
        let script = document.createElement('script')
        script.setAttribute('src', '//platform.twitter.com/widgets.js')
        document.body.appendChild(script)
        script.onload = () => {
          renderQueue.forEach(cb => cb())
        }
      }
      renderQueue.push(renderTweet)
    } else {
      renderTweet()
    }

    const node = tweetRef.current
    return () => {
      node.innerHTML = ''
    }
  }, [id, options])

  return <div ref={tweetRef} />
}

export default function TwitterFeed() {
  const [show, setShow] = useState(true)
  const [theme, setTheme] = useState('light')
  const [count, setCount] = useState(0)

  const options = React.useMemo(
    () => ({
      theme
    }),
    [theme]
  )

  return (
    <>
      <div className="horizontal-spacing">
        <button onClick={() => setShow(!show)} className="button">
          Show Tweets: {show ? 'On' : 'Off'}
        </button>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="button">
          Theme
        </button>
        <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      </div>
      {show && (
        <div>
          <Tweet id="1274126046648864768" options={options} />
          <Tweet id="1294327194009952256" options={options} />
        </div>
      )}
    </>
  )
}
