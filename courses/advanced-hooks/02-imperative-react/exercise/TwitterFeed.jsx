import * as React from 'react'

function Tweet({ id }) {
  const tweetRef = React.useRef()

  React.useEffect(() => {
    function renderTweet() {
      const options = {} // if we were to want to pass options
      window.twttr.widgets.createTweetEmbed(id, tweetRef.current, options)
    }

    let script = document.createElement('script')
    script.setAttribute('src', '//platform.twitter.com/widgets.js')
    document.body.appendChild(script)
    // When this script loads, the twitter API will be at `window.twttr`
    script.onload = () => {
      renderTweet()
    }
  }, [id])

  return <div ref={tweetRef} />
}

export default function TwitterFeed() {
  const [show, setShow] = React.useState(true)
  const [theme, setTheme] = React.useState('light')

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
          <Tweet id="1274126046648864768" />
          <Tweet id="1294327194009952256" />
        </div>
      )}
    </>
  )
}
