const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { body, validationResult } = require('express-validator');
const mysql = require('mysql2/promise');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'course_management'
};

// Create database connection pool
const pool = mysql.createPool(dbConfig);

// Validation middleware
const validateStudent = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('studentId')
    .isInt({ min: 1, max: 10 })
    .withMessage('Student ID must be between 1 and 10'),
  body('score')
    .isFloat({ min: 0, max: 100 })
    .withMessage('Score must be between 0 and 100')
];

// Add validation middleware for updates
const validateStudentUpdate = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('score')
    .isFloat({ min: 0, max: 100 })
    .withMessage('Score must be between 0 and 100')
];

// Routes
app.post('/api/students', validateStudent, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, middleName, lastName, studentId, score } = req.body;

    // Check for duplicate student ID
    const [existing] = await pool.query(
      'SELECT id FROM students WHERE id = ?',
      [studentId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: 'Student ID already exists' });
    }

    // Insert new student
    await pool.query(
      'INSERT INTO students (id, first_name, middle_name, last_name, score) VALUES (?, ?, ?, ?, ?)',
      [studentId, firstName, middleName, lastName, score]
    );

    res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/students', async (req, res) => {
  try {
    const { sortBy = 'id', order = 'asc' } = req.query;
    const validSortFields = ['id', 'score', 'first_name', 'last_name'];
    
    if (!validSortFields.includes(sortBy)) {
      return res.status(400).json({ error: 'Invalid sort field' });
    }

    const [students] = await pool.query(
      `SELECT * FROM students ORDER BY ${sortBy} ${order === 'desc' ? 'DESC' : 'ASC'}`
    );

    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/students/average', async (req, res) => {
  try {
    const [result] = await pool.query('SELECT AVG(score) as average FROM students');
    res.json({ average: result[0].average || 0 });
  } catch (error) {
    console.error('Error calculating average:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add PUT endpoint for updating a student
app.put('/api/students/:id', validateStudentUpdate, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { firstName, middleName, lastName, score } = req.body;

    // Check if student exists
    const [existing] = await pool.query(
      'SELECT id FROM students WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Update student
    await pool.query(
      'UPDATE students SET first_name = ?, middle_name = ?, last_name = ?, score = ? WHERE id = ?',
      [firstName, middleName, lastName, score, id]
    );

    res.json({ message: 'Student updated successfully' });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add DELETE endpoint for deleting a student
app.delete('/api/students/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if student exists
    const [existing] = await pool.query(
      'SELECT id FROM students WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Delete student
    await pool.query('DELETE FROM students WHERE id = ?', [id]);

    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 