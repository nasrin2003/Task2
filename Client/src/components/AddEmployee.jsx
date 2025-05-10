import React,{ useState }from 'react';
import '../styles/AddEmployee.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const navigate = useNavigate();
     const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    department: '',
    designation: '',
    project: '',
    type: '',
    status: ''
  });
    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/employees', formData);
   navigate('/employee-list'); 
    } catch (err) {
      console.error('Error saving employee:', err);
    }
  };
  // const handleConfirmClick = () => {
  //   // Navigate to the desired page
  //   navigate('/next-page'); // Replace '/next-page' with the route you want to navigate to
  // };
  return (
    <div className="app-container">
         <header className="navbar">
          <div className="nav-icons">
            <span className="icon">⚙️</span>
            <span className="icon">🔔</span>
            <span className="profile-pic">👤</span>
          </div>
        </header>
      

      <div className="main-content">
       <aside className="sidebar">
        <h2 className="logo">RS-TECH</h2>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li className="active">Employee</li>
            <li>Calendar</li>
            <li>Messages</li>
          </ul>
        </nav>
      </aside>

        <div className="form-container">
          <h2>Add New Employee</h2>
          <h4 className="section-title">Personal Information</h4>
<form className="employee-form" onSubmit={handleSubmit}>
            <div className="image-upload">
              <div className="upload-box">📷</div>
            </div>
            <div className="form-grid">
                <input type="text" name="name" placeholder="Enter name" required onChange={handleChange} />
              <input type="text" name="employeeId" placeholder="Enter employee ID" required onChange={handleChange} />
              <select name="department" required onChange={handleChange}>
                <option value="">Select Department</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
              </select>
               <select name="designation" required onChange={handleChange}>
                <option value="">Select Designation</option>
                <option value="Developer">Developer</option>
                <option value="Manager">Manager</option>
              </select>
              <input type="text" name="project" placeholder="Enter Project" onChange={handleChange} />
              <select name="type" required onChange={handleChange}>
                <option value="">Select Type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Intern">Intern</option>
              </select>
              <select name="status" required onChange={handleChange}>
                <option value="">Select Status</option>
                <option value="Active">Permenent</option>
                <option value="Inactive">Temporary</option>
              </select>
            </div>
            <div className="form-buttons">
              <button type="button" className="cancel-btn">Cancel</button>
              <button type="submit" className="confirm-btn">Confirm</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
