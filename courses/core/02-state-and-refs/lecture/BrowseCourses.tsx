import { useState } from 'react'
// import ReactDOM from 'react-dom'
import { Heading } from 'course-platform/Heading'
import { Icon } from 'course-platform/Icon'
import { AddCourse } from './AddCourse'

// const states: any[] = []
// let calls = -1

// function useState(defaultState) {
//   const callId = ++calls

//   if (states[callId]) {
//     return states[callId]
//   }

//   function setState(newState) {
//     states[callId][0] = newState
//     calls = -1
//     reRender()
//   }

//   const state = [defaultState, setState]
//   states[callId] = state
//   return state
// }

// function reRender() {
//   const root = ReactDOM.createRoot(document.getElementById('root')!)
//   root.render(<BrowseCourses />)
// }

export function BrowseCourses() {
  const [minLessons, setMinLessons] = useState(0)
  const [courses, setCourses] = useState([
    { id: 1, name: 'React', lessons: 5 },
    { id: 2, name: 'JavaScript', lessons: 4 },
    { id: 3, name: 'CSS', lessons: 3 },
  ])

  function handleSubmit(values: any) {
    const id = courses.length + 1
    const newCourse = { id, ...values }
    // setCourses(courses.concat(newCourse))
    setCourses([newCourse, ...courses])
  }

  return (
    <div className="card spacing">
      <AddCourse onSubmit={handleSubmit} />
      <hr />
      <div className="flex-split">
        <Heading size={1}>Courses</Heading>
        <div className="text-center spacing">
          <div className="text-small">At least {minLessons} lessons</div>
          <Counter count={minLessons} onChange={setMinLessons} />
        </div>
      </div>
      <div className="spacing">
        {courses
          .filter((c) => c.lessons >= minLessons)
          .map((course) => {
            return (
              <div key={course.id} className="course-listing flex-split">
                <Heading as="h2" size={3}>
                  {course.name}
                </Heading>
                <div>Lessons: {course.lessons}</div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

function Counter({ count, onChange }) {
  function subtract() {
    if (count > 0) {
      onChange(count - 1)
    }
  }

  function add() {
    onChange(count + 1)
  }

  return (
    <div className="counter">
      <div className="inline-flex flex-gap">
        <div>
          <button onClick={subtract} className="button button-small">
            <Icon name="minus" />
          </button>
        </div>
        <div className="input">{count}</div>
        <div>
          <button onClick={add} className="button button-small">
            <Icon name="plus" />
          </button>
        </div>
      </div>
    </div>
  )
}
