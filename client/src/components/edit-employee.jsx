import { useEffect, useState } from "react"
import "./edit-employee.css"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function EditEmployeeModal({ open, employee, onClose, onUpdate }) {
  const [form, setForm] = useState({ id: null, name: "", email: "", position: "" })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (open && employee) {
      setForm({ id: employee.id, name: employee.name, email: employee.email, position: employee.position })
      setErrors({})
    }
  }, [open, employee])

  if (!open) return null

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
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    if (!validate()) return
    onUpdate(form)
  }

  function onBackdrop(ev) {
    if (ev.target === ev.currentTarget) onClose()
  }

  const isValid = form.name && form.email && form.position && Object.keys(errors).length === 0

  return (
    <div className="backdrop" onMouseDown={onBackdrop} role="dialog" aria-modal="true" aria-labelledby="edit-title">
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <h3 id="edit-title" className="modalTitle">
            Edit Employee
          </h3>
          <button type="button" className="close" onClick={onClose} aria-label="Close edit dialog">
            ×
          </button>
        </div>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="edit-name" className="label">
              Name
            </label>
            <input
              id="edit-name"
              name="name"
              type="text"
              className={`input ${errors.name ? "inputError" : ""}`}
              value={form.name}
              onChange={handleChange}
              onBlur={() => validate()}
              placeholder="Jane Doe"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "edit-name-error" : undefined}
            />
            {errors.name && (
              <div id="edit-name-error" className="error">
                {errors.name}
              </div>
            )}
          </div>

          <div className="field">
            <label htmlFor="edit-email" className="label">
              Email
            </label>
            <input
              id="edit-email"
              name="email"
              type="email"
              className={`input ${errors.email ? "inputError" : ""}`}
              value={form.email}
              onChange={handleChange}
              onBlur={() => validate()}
              placeholder="jane@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "edit-email-error" : undefined}
            />
            {errors.email && (
              <div id="edit-email-error" className="error">
                {errors.email}
              </div>
            )}
          </div>

          <div className="field">
            <label htmlFor="edit-position" className="label">
              Position
            </label>
            <input
              id="edit-position"
              name="position"
              type="text"
              className={`input ${errors.position ? "inputError" : ""}`}
              value={form.position}
              onChange={handleChange}
              onBlur={() => validate()}
              placeholder="Marketing Specialist"
              aria-invalid={!!errors.position}
              aria-describedby={errors.position ? "edit-position-error" : undefined}
            />
            {errors.position && (
              <div id="edit-position-error" className="error">
                {errors.position}
              </div>
            )}
          </div>

          <div className="actions">
            <button type="button" className="cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save" disabled={!isValid}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
