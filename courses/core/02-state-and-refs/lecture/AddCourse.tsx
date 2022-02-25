import { useState, useRef } from 'react'

type Props = {
  onSubmit(values: { name: string; lessons: number }): void
}

const initialFormValues = {
  name: '',
  lessons: 0,
}

export function AddCourse({ onSubmit }: Props) {
  const [formValues, setFormValues] = useState(initialFormValues)

  function updateField(field: string, value: any) {
    setFormValues({ ...formValues, [field]: value })
  }

  const courseNameRef = useRef<HTMLInputElement>(null!)
  // const lessonsRef = useRef<HTMLInputElement>(null!)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    onSubmit(formValues)
    setFormValues(initialFormValues)
    courseNameRef.current.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-gap">
      <div className="flex-1">
        <input
          type="text"
          className="form-field"
          placeholder="Course Name"
          aria-label="Course Name"
          value={formValues.name}
          onChange={(e) => {
            updateField('name', e.target.value)
          }}
          ref={courseNameRef}
        />
      </div>
      <div></div>
      <div className="flex-1">
        <input
          // ref={lessonsRef}
          value={formValues.lessons}
          onChange={(e) => {
            updateField('lessons', parseInt(e.target.value))
          }}
          type="number"
          className="form-field"
          placeholder="Lessons"
          aria-label="Lessons"
        />
      </div>
      <button className="button" type="submit">
        Add Course
      </button>
    </form>
  )
}
