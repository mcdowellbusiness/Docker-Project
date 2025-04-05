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

// TODO: Create database connection pool
// Hint: Use mysql.createPool with dbConfig

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

// TODO: Add validation middleware for updates
// Hint: Similar to validateStudent but without studentId validation

// Routes

// POST /api/students - Add new student
app.post('/api/students', validateStudent, async (req, res) => {
  try {
    // TODO: Implement student creation
    // 1. Validate request body
    // 2. Check for duplicate student ID
    // 3. Insert new student into database
    // 4. Return success response
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/students - Get all students with sorting
app.get('/api/students', async (req, res) => {
  try {
    // TODO: Implement student retrieval with sorting
    // 1. Get sort parameters from query string
    // 2. Validate sort parameters
    // 3. Query database with sorting
    // 4. Return sorted students
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/students/average - Get average score
app.get('/api/students/average', async (req, res) => {
  try {
    // TODO: Implement average calculation
    // 1. Query database for average score
    // 2. Handle case when no students exist
    // 3. Return average score
  } catch (error) {
    console.error('Error calculating average:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/students/:id - Update student
app.put('/api/students/:id', validateStudentUpdate, async (req, res) => {
  try {
    // TODO: Implement student update
    // 1. Validate request body
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { id } = req.params;
    const { firstName, middleName, lastName, score } = req.body;
    
    // 2. Check if student exists
    
    const [existing] = await pool.query(
        'SELECT id FROM students WHERE id = ?',
        [id]
    );
    
    if (existing.length === 0) {
        return res.status(404).json({ error: 'Student not found' });
    }
    
    // 3. Update student in database
    
    await pool.query(
        'UPDATE students SET first_name = ?, middle_name = ?, last_name = ?, score = ? WHERE id = ?',
        [firstName, middleName, lastName, score, id]
    );
    
    
    // 4. Return success response
    res.json({ message: 'Student updated successfully' });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/students/:id - Delete student
app.delete('/api/students/:id', async (req, res) => {
  try {
    // TODO: Implement student deletion
    // 1. Check if student exists
    // 2. Delete student from database
    // 3. Return success response
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
