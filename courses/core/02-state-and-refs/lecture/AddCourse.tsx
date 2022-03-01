import { useState, useRef } from 'react'

type Props = {
  onSubmit(values: { name: string; lessons: number }): void
}

const initialValues = {
  name: '',
  lessons: 0,
}

export function AddCourse({ onSubmit }: Props) {
  const [formValues, setFormValues] = useState(initialValues)

  function setFormField(field: string, value: any) {
    setFormValues({ ...formValues, [field]: value })
  }

  const courseNameRef = useRef<HTMLInputElement>(null!)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    onSubmit(formValues)
    setFormValues(initialValues)
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
            setFormField('name', e.target.value)
          }}
          ref={courseNameRef}
        />
      </div>
      <div className="flex-1">
        <input
          value={formValues.lessons}
          onChange={(e) => {
            setFormField('lessons', parseInt(e.target.value))
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
