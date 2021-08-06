// These styles just make the lesson demos look a little nicer!
import 'YesterTech/styles/global-styles.scss'
import 'YesterTech/styles/center-lesson.scss'

interface SomeObj {
  person: Person
}

abstract class PersonBase {}

class Person extends PersonBase {
  readonly name: string
  age!: number

  constructor(name: string, age: number)
  constructor(name: string, props: { age: number })
  constructor(name: string, age: number | { age: number }) {
    super()
    this.name = name
    this.setAge(typeof age === 'object' ? age.age : age)
  }

  setAge(age: string): void
  setAge(age: number): void
  setAge(age: number | string) {
    this.age = typeof age === 'string' ? parseInt(age) : age
  }
}

const obj: SomeObj = {
  person: new Person('Chance', 35),
}
class Instructor extends Person {}

// Let's go!
const rootElem = document.getElementById('root')
rootElem!.innerHTML = '<h1>Hello, world!</h1>'
