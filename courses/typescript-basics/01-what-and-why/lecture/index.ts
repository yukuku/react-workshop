// These styles just make the lesson demos look a little nicer!
import 'YesterTech/styles/global-styles.scss'
import 'YesterTech/styles/center-lesson.scss'

function greet(person: string, date?: string) {
  if (!date) {
    return `Hello ${person}!`
  }
  return `Hello ${person}, today is ${date}`
}

let greeting = greet('Chance')
greeting.toLocaleLowerCase()

console.log(greeting, Date())

// Let's go!
const rootElem = document.getElementById('root')
rootElem!.innerHTML = '<h1>Hello, world!</h1>'
