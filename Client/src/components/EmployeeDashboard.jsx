import React from 'react';
import '../styles/EmployeeDashboard.css'; // CSS file
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
   const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      {/* Top Navbar */}
      <div className="top-navbar">
        <div className="site-logo">RS–TECH</div>
        <div className="user-actions">
          <span className="action-icon">⚙️</span>
          <span className="action-icon">🔔</span>
          <img
            src="https://via.placeholder.com/32"
            alt="user-avatar"
            className="avatar-img"
          />
        </div>
      </div>

      <div className="main-content-wrapper">
        {/* Sidebar */}
        <div className="sidebar-menu">
          <ul className="sidebar-list">
            <li>Dashboard</li>
            <li className="active-item">Employee</li>
            <li>Calendar</li>
            <li>Messages</li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="content-header">
            <h1>Employee</h1>
            <div className="header-actions">
              <input type="text" placeholder="Search" className="search-input"/>
              <button onClick={() => navigate('/add-employee')} className="add-employee-btn">+ Add New Employee</button>
            </div>
          </div>

          <table className="employee-data-table">
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
              <tr>
                <td colSpan="8" className="no-data-message">No records found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
