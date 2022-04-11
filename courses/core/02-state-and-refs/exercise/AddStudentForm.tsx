import { useState, useRef } from 'react'
import { Heading } from 'course-platform/Heading'

export function AddStudentForm() {
  const fullNameRef = useRef<HTMLInputElement>(null!)
  const [formFields, setFormFields] = useState({
    fullName: '',
    username: '',
  })
  const [autoUsername, setAutoUsername] = useState(true)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    console.log({...formFields, username: effectiveUsername()})

    setFormFields({ fullName: '', username: '' })
    fullNameRef.current.focus();
  }

  function effectiveUsername() {
    if (autoUsername) {
      return formFields.fullName.toLowerCase().replaceAll(/\s/g, '')
    } else {
      return formFields.username
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card spacing">
      <Heading>Add Student</Heading>
      <div className="field-wrap">
        <label htmlFor="full-name">Full Name</label>
        <input id="full-name" type="text" className="form-field" required autoComplete="off" value={formFields.fullName} ref={fullNameRef} onChange={(e) => {
          setFormFields({ ...formFields, fullName: e.target.value, username: autoUsername ? formFields.fullName.toLowerCase().replaceAll(/\s/g, '') : formFields.username })
        }} />
      </div>

      <div className="field-wrap">
        <label htmlFor="username">Username</label>
        <input id="username" type="text" className="form-field" required autoComplete="off"
          value={autoUsername? effectiveUsername(): formFields.username}
          onChange={(e) => {
            setFormFields({ ...formFields, username: e.target.value })
          }} />
      </div>

      <div>
        <label className="vertical-middle horizontal-spacing">
          <input type="checkbox" checked={autoUsername} onChange={(e) => {
            setAutoUsername(e.target.checked)
          }} />
          <span>Auto Username</span>
        </label>
      </div>

      <hr />
      <button type="submit" className="button">
        Add Student
      </button>
    </form>
  )
}
