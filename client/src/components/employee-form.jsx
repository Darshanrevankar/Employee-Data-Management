import { useState } from "react"
import "./employee-form.css"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function EmployeeForm({ onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", position: "" })
  const [errors, setErrors] = useState({})

  function validate(next = form) {
    const e = {}
    if (!next.name.trim()) e.name = "Name is required."
    if (!next.email.trim()) e.email = "Email is required."
    else if (!emailRegex.test(next.email)) e.email = "Invalid email format."
    if (!next.position.trim()) e.position = "Position is required."
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleChange(ev) {
    const { name, value } = ev.target
    const next = { ...form, [name]: value }
    setForm(next)
  }

  function handleBlur() {
    validate()
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    if (!validate()) return
    onSubmit({ ...form })
    setForm({ name: "", email: "", position: "" })
    setErrors({})
  }

  const isValid = form.name && form.email && form.position && Object.keys(errors).length === 0

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="name" className="label">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className={`input ${errors.name ? "inputError" : ""}`}
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Jane Doe"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <div id="name-error" className="error">
            {errors.name}
          </div>
        )}
      </div>

      <div className="field">
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={`input ${errors.email ? "inputError" : ""}`}
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="jane@example.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <div id="email-error" className="error">
            {errors.email}
          </div>
        )}
      </div>

      <div className="field">
        <label htmlFor="position" className="label">
          Position
        </label>
        <input
          id="position"
          name="position"
          type="text"
          className={`input ${errors.position ? "inputError" : ""}`}
          value={form.position}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Marketing Specialist"
          aria-invalid={!!errors.position}
          aria-describedby={errors.position ? "position-error" : undefined}
        />
        {errors.position && (
          <div id="position-error" className="error">
            {errors.position}
          </div>
        )}
      </div>

      <div className="actions">
        <button type="submit" className="submit" disabled={!isValid}>
          Add Employee
        </button>
      </div>
    </form>
  )
}
