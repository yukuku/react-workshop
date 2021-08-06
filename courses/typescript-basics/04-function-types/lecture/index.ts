// These styles just make the lesson demos look a little nicer!
import 'YesterTech/styles/global-styles.scss'
import 'YesterTech/styles/center-lesson.scss'

import _ from 'lodash'

interface SomeObj {
  makeDate(): Date
  makeDate(timeStamp: string): string
  makeDate(m: number, d: number, y: number): Date
}

function makeDate(monthOrTimeStamp?: number | string, d?: number, y?: number): Date | string {
  if (monthOrTimeStamp === undefined) {
    return new Date()
  }
  if (d !== undefined && y !== undefined) {
    return new Date(y, (monthOrTimeStamp as number) - 1, d)
  }
  return 'anything' as string
}

let date = makeDate()
let date2 = makeDate('')
let date3 = makeDate(1, 2, 3)

// Let's go!
const rootElem = document.getElementById('root')
rootElem!.innerHTML = '<h1>Hello, world!</h1>'
