import { useState, useRef } from 'react'

type Props = {
  onSubmit(values: { name: string; lessons: number }): void
}

type FormValues = {
  name: string
  lessons: number
}

const initialFormValues = {
  name: '',
  lessons: 0,
}

export function AddCourse({ onSubmit }: Props) {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues)

  function updateForm(updates: Partial<FormValues>) {
    setFormValues({ ...formValues, ...updates })
  }

  const courseNameRef = useRef<HTMLInputElement>(null!)

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
          onChange={(event) => {
            updateForm({ name: event.target.value })
          }}
          ref={courseNameRef}
        />
      </div>
      <div className="flex-1">
        <input
          type="number"
          className="form-field"
          placeholder="Lessons"
          aria-label="Lessons"
          value={formValues.lessons}
          onChange={(event) => {
            updateForm({ lessons: parseInt(event.target.value) })
          }}
        />
      </div>
      <button className="button" type="submit">
        Add Course
      </button>
    </form>
  )
}
