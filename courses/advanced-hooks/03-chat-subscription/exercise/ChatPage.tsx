import { useState, useEffect, useRef } from 'react'
import { api } from 'course-platform/utils/api'
import { Avatar } from 'course-platform/Avatar'
import { useAuthContext } from 'course-platform/AuthContext'
import type { ChatMessage } from 'course-platform/utils/types'
import styles from '../../../../apps/course-platform/ChatPage/ChatPage.module.scss'

const THREAD_NAME = 'all'

export function ChatPage() {
  const { user } = useAuthContext()
  const chatBoardRef = useRef<HTMLDivElement>(null!)

  const [input, setInput] = useState('')
  const [scrolledToBottom, setScrolledToBottom] = useState(true)
  const [messages, setMessages] = useState<ChatMessage[]>([])

  // You'll use Date.now() for this state (which is a number)
  const [startSubscription, setStartSubscription] = useState<number | null>(null)
  const inputText = useRef<HTMLInputElement>(null!)

  // Get initial messages
  useEffect(() => {
    api.chat.getMessages(THREAD_NAME).then((messages) => {
      setMessages(messages)
      setStartSubscription(Date.now())
    })
  }, [])

  // scroll to bottom
  useEffect(() => {
    if (scrolledToBottom) {
      chatBoardRef.current.scrollTop = chatBoardRef.current.scrollHeight
    }
  }, [messages])

  // Subscribe to new messages
  useEffect(() => {
    if (startSubscription != null) {
      const cleanup = api.chat.subscribe(
        startSubscription,
        (newMessages) => {
          console.log('old messages', messages.length, 'new messages', newMessages.length)
          setMessages([...messages, ...newMessages])

          // resubscribe
          let now
          if (newMessages.length > 0) {
            now = newMessages[newMessages.length - 1].created
          } else {
            now = Date.now()
          }
          setStartSubscription(now)
        },
        THREAD_NAME
      )
      return () => cleanup();
    }
  }, [startSubscription]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !input) return
    console.log('me too')
    setInput('')
    inputText.current.focus()
    api.chat.postMessage(input, user.id, user.name, user.avatarUrl, THREAD_NAME).then(() => {
      // noop (no operation)
      console.log('submitted')
      // We don't need to do anything when we post a message here to get it added to state. The
      // subscription will do that for us
    })
  }

  function spam() {
    if (!user) return
    for (let i = 0; i < 100; i++) {
      api.chat.postMessage(`load tester ${i}`, user.id, user.name, user.avatarUrl, THREAD_NAME).then(() => {
        // noop (no operation)
        console.log('submitted')
        // We don't need to do anything when we post a message here to get it added to state. The
        // subscription will do that for us
      })
    }
  }

  function onBoardScroll(event: any) {
    const e = event.target
    // See if the user scrolled to the bottom
    const bottom = e.scrollHeight <= Math.ceil(e.scrollTop + e.clientHeight)
    // If the user is in a different scroll position from what we have
    // in state, update the state
    if (scrolledToBottom !== bottom) {
      setScrolledToBottom(bottom)
    }
  }

  return (
    <div className={styles.component}>
      <div className="chat-board spacing" ref={chatBoardRef} onScroll={onBoardScroll}>
        {messages.length > 0 &&
          messages.map((message) => {
            return (
              <div key={message.id} className="chat-message flex flex-gap">
                <div>
                  <Avatar src={message.avatarUrl} size={4} />
                </div>
                <div className="spacing-small">
                  <b className="block">{message.user}</b>
                  <div>{message.text}</div>
                </div>
              </div>
            )
          })}
      </div>
      <form onSubmit={onSubmit} className="chat-controls spacing">
        <input ref={inputText} className="form-field" value={input} onChange={(e) => setInput(e.target.value)} />
        <div>
          <button type="submit" className="button">
            Send
          </button>
          <button type="button" className="button" onClick={spam}>
            spam
          </button>
        </div>
      </form>
    </div>
  )
}
