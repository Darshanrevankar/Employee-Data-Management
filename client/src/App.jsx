import { useMemo, useState, useEffect } from "react"
import EmployeeList from "./components/employee-list"
import EmployeeForm from "./components/employee-form"
import EditEmployeeModal from "./components/edit-employee"
import SearchBar from "./components/search-bar"
import "./App.css"

// Simple email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function App() {
  const [employees, setEmployees] = useState([])
  const [search, setSearch] = useState("")
  const [editOpen, setEditOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [alert, setAlert] = useState(null) // { type: 'success' | 'error', message: string }

  // Fetch employees from backend on load
  useEffect(() => {
    async function fetchEmployees() {
      try {
        const res = await fetch("http://localhost:8081/api/employees")
        if (res.ok) {
          const result = await res.json()
          setEmployees(result.data) 
        } else {
          console.error("Failed to fetch employees")
        }
      } catch (err) {
        console.error("Error fetching employees:", err)
      }
    }
    fetchEmployees()
  }, [])

  useEffect(() => {
    if (!alert) return
    const timer = setTimeout(() => setAlert(null), 3000)
    return () => clearTimeout(timer)
  }, [alert])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return employees
    return employees.filter((e) => e.name.toLowerCase().includes(q))
  }, [employees, search])

  function showSuccess(message) {
    setAlert({ type: "success", message })
  }

  function showError(message) {
    setAlert({ type: "error", message })
  }

  // Add employee -> POST API
  async function handleAdd(newEmp) {
    if (!newEmp.name || !newEmp.email || !newEmp.position) {
      showError("All fields are required.")
      return
    }
    if (!emailRegex.test(newEmp.email)) {
      showError("Please enter a valid email address.")
      return
    }

    try {
      const res = await fetch("http://localhost:8081/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmp),
      })
      if (res.ok) {
        const result = await res.json()
        setEmployees((prev) => [result.data, ...prev]) // backend returns saved employee
        showSuccess("Employee added successfully.")
      } else {
        const errorData = await res.json()
        showError(errorData.message || "Failed to add employee.")
      }
    } catch (err) {
      showError("Server error while adding employee.")
    }
  }

  function openEdit(emp) {
    setEditingEmployee(emp)
    setEditOpen(true)
  }

  function closeEdit() {
    setEditOpen(false)
    setEditingEmployee(null)
  }

  // Update employee -> PUT API
  async function handleUpdate(updatedEmp) {
    if (!updatedEmp.name || !updatedEmp.email || !updatedEmp.position) {
      showError("All fields are required.")
      return
    }
    if (!emailRegex.test(updatedEmp.email)) {
      showError("Please enter a valid email address.")
      return
    }

    try {
      const res = await fetch("http://localhost:8081/api/employees", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEmp),
      })
      if (res.ok) {
        const result = await res.json()
        setEmployees((prev) =>
          prev.map((e) => (e.id === result.data.id ? result.data : e))
        )
        showSuccess("Employee updated successfully.")
        closeEdit()
      } else {
        const errorData = await res.json()
        showError(errorData.message || "Failed to update employee.")
      }
    } catch (err) {
      showError("Server error while updating employee.")
    }
  }

  // Delete employee -> DELETE API
  async function handleDelete(id) {
    try {
      const res = await fetch(`http://localhost:8081/api/employees/delete/${id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        setEmployees((prev) => prev.filter((e) => e.id !== id))
        showSuccess("Employee deleted.")
      } else {
        const errorData = await res.json()
        showError(errorData.message || "Failed to delete employee.")
      }
    } catch (err) {
      showError("Server error while deleting employee.")
    }
  }

  return (
    <main className="container">
      <header className="header">
        <div>
          <h1 className="title">Employee Data Management</h1>
          <p className="subtitle">Add, search, edit, and manage your team with ease.</p>
        </div>
      </header>

      {alert && (
        <div
          role="status"
          aria-live={alert.type === "error" ? "assertive" : "polite"}
          className={`alert ${alert.type === "error" ? "alertError" : "alertSuccess"}`}
        >
          <span>{alert.message}</span>
          <button
            type="button"
            className="alertClose"
            onClick={() => setAlert(null)}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      )}

      <section className="contentGrid">
        <div className="card">
          <h2 className="cardTitle">Add New Employee</h2>
          <EmployeeForm onSubmit={handleAdd} />
        </div>

        <div className="card">
          <div className="listHeader">
            <h2 className="cardTitle">Employees</h2>
            <SearchBar value={search} onChange={setSearch} placeholder="Search by name..." />
          </div>
          <EmployeeList employees={filtered} onEdit={openEdit} onDelete={handleDelete} />
        </div>
      </section>

      <EditEmployeeModal
        open={editOpen}
        employee={editingEmployee}
        onClose={closeEdit}
        onUpdate={handleUpdate}
      />
    </main>
  )
}
