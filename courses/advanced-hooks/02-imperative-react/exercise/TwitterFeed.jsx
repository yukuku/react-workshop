import * as React from 'react'

const listeners = []

function Tweet({ id, theme }) {
  const tweetRef = React.useRef()

  React.useEffect(() => {
    function renderTweet() {
      const options = { theme } // if we were to want to pass options
      window.twttr.widgets.createTweetEmbed(id, tweetRef.current, options)
    }

    if (window.twttr) {
      renderTweet()
    } else {
      // load script first, enqueue renderTweet to listeners
      if (listeners.length == 0) {
        let script = document.createElement('script')
        script.setAttribute('src', '//platform.twitter.com/widgets.js')
        document.body.appendChild(script)
        // When this script loads, the twitter API will be at `window.twttr`
        script.onload = () => {
          for (const listener of listeners) {
            listener()
          }
          while (listeners.length > 0) listeners.pop()
        }
      }
      listeners.push(renderTweet)
    }

    return () => { if (tweetRef.current) tweetRef.current.innerHTML = '' }
  }, [id, theme])

  return <div ref={tweetRef} />
}

export default function TwitterFeed() {
  const [show, setShow] = React.useState(true)
  const [theme, setTheme] = React.useState('dark')
  const theme2 = React.useMemo(() => theme, [theme])

  return (
    <>
      <div className="horizontal-spacing">
        <button onClick={() => setShow(!show)} className="button">
          Show Tweets: {show ? 'On' : 'Off'}
        </button>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="button">
          Theme
        </button>
      </div>
      {show && (
        <div>
          <Tweet id="1274126046648864768" theme={theme} />
          <Tweet id="1294327194009952256" theme={theme} />
        </div>
      )}
    </>
  )
}
