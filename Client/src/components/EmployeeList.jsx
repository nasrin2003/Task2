// src/components/EmployeeList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/EmployeeList.css';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/api/employees')
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  }, []);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

    const handleDelete = (id) => {
    // Confirm delete action
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    
    if (confirmDelete) {
      axios.delete(`http://localhost:3000/employees/${id}`)
        .then(() => {
          // Remove the deleted employee from the list
          setEmployees((prev) => prev.filter((emp) => emp.id !== id));
        })
        .catch((err) => console.error('Error deleting employee:', err));
    }
  };

  return (
    
    <div className="employee-layout">
      <nav className="employee-top-navbar">
        <div className="employee-navbar-left">
          <h2>RS–TECH</h2>
        </div>
        <div className="employee-navbar-right">
          <button className="employee-icon">⚙️</button>
          <button className="employee-icon">🔔</button>
          <img className="employee-avatar-image" src="" alt="Profile" />
        </div>
      </nav>

      <div className="employee-content-wrapper">
        <aside className="employee-sidebar">
          <ul>
            <li>Dashboard</li>
            <li className="employee-active">Employee</li>
            <li>Calendar</li>
            <li>Messages</li>
          </ul>
        </aside>

        <main className="employee-main">
          <header className="employee-header">
            <h1>Employee</h1>
            <div className="employee-search">
              <input type="text" placeholder="Search" />
              <button onClick={() => navigate('/add-employee')}>+ Add New Employee</button>
            </div>
          </header>

          <table className="employee-table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Employee ID</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Project</th>
                <th>Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id}>
                  <td>
                    <div className="employee-name-cell">
                      <img src="" alt="avatar" />
                      <span>{emp.name}</span>
                    </div>
                  </td>
                  <td>{emp.employee_id}</td>
                  <td>{emp.department}</td>
                  <td>{emp.designation}</td>
                  <td>{emp.project}</td>
                  <td>{emp.type}</td>
                  <td>{emp.status}</td>
                 <td className="employee-actions">
  <span onClick={() => navigate(`/employee/${emp.id}`)} style={{ cursor: 'pointer' }}>👁️</span>
 <span onClick={() => navigate(`/edit-employee/${emp.id}`)} style={{ cursor: 'pointer' }}>✏️</span>

<span 
  onClick={() => {
    setSelectedEmployeeId(emp.id);
    setShowConfirmModal(true);
  }} 
  style={{ cursor: 'pointer', color: 'red' }}
>
  🗑️
</span>

</td>

                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
      {showConfirmModal && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal">
            <p>Are you sure you want to delete this employee?</p>
            <div className="modal-buttons">
              <button
                onClick={() => {
                  axios.delete(`http://localhost:3000/api/employees/${selectedEmployeeId}`)
                    .then(() => {
                      setEmployees((prev) => prev.filter(emp => emp.id !== selectedEmployeeId));
                      setShowConfirmModal(false);
                    })
                    .catch(err => {
                      console.error('Delete failed:', err);
                      setShowConfirmModal(false);
                    });
                }}
              >
                Yes
              </button>
              <button onClick={() => setShowConfirmModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    
    </div>
  );
};

export default EmployeeList;
