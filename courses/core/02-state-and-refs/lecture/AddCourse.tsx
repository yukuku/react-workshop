import { useState, useRef } from 'react'

type Props = {
  onSubmit(values: { name: string; lessons: number }): void
}

const initialFields = {
  name: '',
  lessons: 0,
}

export function AddCourse({ onSubmit }: Props) {
  const [formValues, setFormValues] = useState(initialFields)

  function updateField(name: string, value: number) {
    setFormValues({ ...formValues, [name]: value })
  }

  const courseNameRef = useRef<HTMLInputElement>(null!)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    onSubmit(formValues)
    setFormValues(initialFields)
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
          onChange={(e) => updateField('name', e.target.value)}
          ref={courseNameRef}
        />
      </div>
      <div className="flex-1">
        <input
          value={formValues.lessons}
          onChange={(e) => updateField('lessons', parseInt(e.target.value))}
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
