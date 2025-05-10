import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeDashboard from '../src/components/EmployeeDashboard';
import AddEmployee from '../src/components/AddEmployee';
import EmployeeList from './components/EmployeeList';
import EmployeeView from './components/EmployeeView';
import EditEmployee from './components/EditEmployee';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeDashboard />} />
        <Route path="/add-employee" element={<AddEmployee />} />
         <Route path="/employee-list" element={<EmployeeList />} />
         <Route path="/employee/:id" element={<EmployeeView />} />
         <Route path="/edit-employee/:id" element={<EditEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
