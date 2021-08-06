// These styles just make the lesson demos look a little nicer!
import 'YesterTech/styles/global-styles.scss'
import 'YesterTech/styles/center-lesson.scss'

interface Box<Type, Element extends HTMLElement = HTMLElement> {
  contents: Type
  element: Element
}

const box: Box<string> = {
  contents: 'Hello, world!',
  element: document.createElement('div'),
}

const box2: Box<number> = {
  contents: 42,
  element: document.createElement('input'),
}

box.contents.toLowerCase()
box2.contents.toFixed()

// Let's go!
const rootElem = document.getElementById('root')
rootElem!.innerHTML = '<h1>Hello, world!</h1>'

interface Person {
  nameFirst: string
  nameLast: string
  nickName?: string
  age: number
  readonly sayHi: () => string
  hairColor?: string
  [key: string]: unknown
}

interface Parent extends Person {
  children: string[]
}

function doSomething(person: Person) {
  if (typeof person.whatever === 'string') {
    return person.whatever.toLowerCase()
  }
}
