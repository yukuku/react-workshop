import * as React from 'react'
import * as ReactDOM from 'react-dom'
// import { MdShoppingCart } from 'react-icons/md'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

// Let's go

function Main({ className, renderHeading }) {
  return (
    <main className={className}>
      <section className="section-1">
        {0 || <h2>About us</h2>}
        <button id="dialog-button">Learn more</button>
      </section>
    </main>
  )
}

function App() {
  const props = {
    id: '1',
    className: 'red',
  }
  return (
    <React.Fragment>
      <header {...props}>
        <h1>App</h1>
        <nav>
          <ul>
            <li>Home</li>
            <li>About</li>
          </ul>
        </nav>
      </header>
      <Main renderHeading className="red" />
      <aside></aside>
      <footer></footer>
    </React.Fragment>
  )
}

const e = React.createElement

function AppVanilla() {
  return e(React.Fragment, null, [
    e('header', null, [
      e('h1', { id: 'page-name' }, 'App'),
      e('nav', null, e('ul', null, [e('li', null, 'Home'), e('li', null, 'About')])),
    ]),
    e('main'),
    e('aside'),
    e('footer'),
  ])
}

ReactDOM.render(React.createElement(App), document.getElementById('root'))
