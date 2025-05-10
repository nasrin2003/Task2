const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/api/employees', (req, res) => {
  const { name, employeeId, department, designation, project, type, status } = req.body;

  const sql = 'INSERT INTO employees (name, employee_id, department, designation, project, type, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, employeeId, department, designation, project, type, status], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Employee added successfully' });
  });
});
// GET all employees
router.get('/api/employees', (req, res) => {
  const sql = 'SELECT * FROM employees';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching employees:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
});
router.get('/employees/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM employees WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching employee:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json(results[0]);
  });
});

// PUT - Update employee by ID
router.put('/employees/:id', (req, res) => {
  const { id } = req.params;
  const { name, employee_id, department, designation, project, type, status } = req.body;

  const sql = `
    UPDATE employees 
    SET name = ?, employee_id = ?, department = ?, designation = ?, project = ?, type = ?, status = ?
    WHERE id = ?
  `;
  db.query(sql, [name, employee_id, department, designation, project, type, status, id], (err, result) => {
    if (err) {
      console.error('Error updating employee:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Employee updated successfully' });
  });
});


router.delete('/employees/:id', (req, res) => {
  const { id } = req.params;

  // Query to delete employee by ID
  const query = 'DELETE FROM employees WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting employee:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  });
});

module.exports = router;
