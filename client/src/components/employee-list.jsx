import "./employee-list.css"

export default function EmployeeList({ employees, onEdit, onDelete }) {
  return (
    <div className="wrapper">
      <div className="tableScroll">
        <table className="table" role="table">
          <thead className="thead">
            <tr>
              <th scope="col" className="th">Name</th>
              <th scope="col" className="th">Email</th>
              <th scope="col" className="th">Position</th>
              <th scope="col" className="thActions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan={4} className="empty">
                  🚀 No employees found. Add your first employee!
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id} className="row">
                  <td scope="row" className="td">{emp.name || "—"}</td>
                  <td className="td">{emp.email || "—"}</td>
                  <td className="td">{emp.position || "—"}</td>
                  <td className="tdActions">
                    <div className="actionButtons">
                      <button
                        type="button"
                        className="btn btnSecondary"
                        onClick={() => onEdit(emp)}
                        aria-label={`Edit ${emp.name}`}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btnDanger"
                        onClick={() =>
                          window.confirm(`Delete ${emp.name}?`) && onDelete(emp.id)
                        }
                        aria-label={`Delete ${emp.name}`}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
