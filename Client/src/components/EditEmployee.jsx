import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/EditEmployee.css';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    employee_id: '',
    department: '',
    designation: '',
    project: '',
    type: '',
    status: '',
    photoUrl: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/employees/${id}`)
      .then(res => setEmployee(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = e => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:3000/employees/${id}`, employee)
      .then(() => navigate('/employee-list'))
      .catch(err => console.error(err));
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h2>RS–TECH</h2>
        <ul>
          <li>Dashboard</li>
          <li className="active">Employee</li>
          <li>Calendar</li>
          <li>Messages</li>
        </ul>
      </div>

      <div className="main">
        <div className="navbar">
          <div className="nav-right">
            <button className="icon-btn">⚙️</button>
            <button className="icon-btn">🔔</button>
            <img src="https://via.placeholder.com/35" alt="User" className="avatar" />
          </div>
        </div>

        {/* Avatar Upload Section */}
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

        {/* Edit Form Section */}
        <div className="editform">
          <h2>Edit Employee Details</h2>
          <div className="edit-employee-form">
            <form onSubmit={handleSubmit}>
            
              <input
                type="text"
                name="name"
                value={employee.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
              <input
                type="text"
                name="employee_id"
                value={employee.employee_id}
                onChange={handleChange}
                placeholder="Employee ID"
                required
              />
              <input
                type="text"
                name="department"
                value={employee.department}
                onChange={handleChange}
                placeholder="Department"
                required
              />
              <input
                type="text"
                name="designation"
                value={employee.designation}
                onChange={handleChange}
                placeholder="Designation"
                required
              />
              <input
                type="text"
                name="project"
                value={employee.project}
                onChange={handleChange}
                placeholder="Project"
              />
              <select
                name="type"
                value={employee.type}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Office">Office</option>
                <option value="Remote">Remote</option>
              </select>
              <select
                name="status"
                value={employee.status}
                onChange={handleChange}
                required
              >
                <option value="">Select Status</option>
                <option value="Permanent">Permanent</option>
                <option value="Contract">Contract</option>
              </select>
              <div className="button-group">
                <button type="submit" className="update-btn">Update</button>
                <button type="button" className="cancel-btn" onClick={() => navigate('/employees')}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
