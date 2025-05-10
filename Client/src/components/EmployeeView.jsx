import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/EmployeeView.css';

const EmployeeView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/employees/${id}`)
      .then(res => setEmployee(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!employee) return <p>Loading employee details...</p>;

  return (
    <div className="view-layout">
      {/* Navbar */}
      <nav className="view-navbar">
        <div className="navbar-left">
          <h2>RS–TECH</h2>
        </div>
        <div className="navbar-right">
          <button className="nav-icon">⚙️</button>
          <button className="nav-icon">🔔</button>
          <div className="nav-avatar" />
        </div>
      </nav>

      {/* Body layout */}
      <div className="view-body">
        {/* Sidebar */}
        <aside className="view-sidebar">
          <ul>
            <li>Dashboard</li>
            <li className="active">Employee</li>
            <li>Calendar</li>
            <li>Messages</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="view-container">
          <div className="view-header">
            <button className="back-button" onClick={() => navigate(-1)}>←</button>
            <h2>View Employee Details</h2>
          </div>

          <div className="view-tabs">
            <span className="active-tab">👤 Personal Information</span>
          </div>

          <div className="view-content">
  <div className="avatar-upload">
    <label htmlFor="photo-upload">
      <img
        src={employee.photoUrl || '/avatar-placeholder.png'}
        alt="Avatar"
        className="employee-avatar"
      />
    </label>
    <input
      type="file"
      id="photo-upload"
      accept="image/*"
      style={{ display: 'none' }}
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setEmployee(prev => ({ ...prev, photoUrl: imageUrl }));
        }
      }}
    />
  </div>

  <div className="employee-info-grid">
    <div className="employee-info-row">
      <label>Name</label>
      <input type="text" value={employee.name} readOnly />
    </div>
    <div className="employee-info-row">
      <label>Employee ID</label>
      <input type="text" value={employee.employee_id} readOnly />
    </div>
    <div className="employee-info-row">
      <label>Department</label>
      <input type="text" value={employee.department} readOnly />
    </div>
    <div className="employee-info-row">
      <label>Designation</label>
      <input type="text" value={employee.designation} readOnly />
    </div>
    <div className="employee-info-row">
      <label>Project</label>
      <input type="text" value={employee.project} readOnly />
    </div>
    <div className="employee-info-row">
      <label>Type</label>
      <input type="text" value={employee.type} readOnly />
    </div>
    <div className="employee-info-row">
      <label>Status</label>
      <input type="text" value={employee.status} readOnly />
    </div>
  </div>
</div>

        </main>
      </div>
    </div>
  );
};

export default EmployeeView;
