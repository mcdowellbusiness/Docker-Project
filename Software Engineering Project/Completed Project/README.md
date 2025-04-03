# Course Management System

A full-stack application for managing student course data with React frontend and Node.js/Express backend.

## Features

- Student data management (add, view, sort)
- Score tracking and statistics
- Form validation
- Responsive design
- Real-time updates

## Tech Stack

- Frontend: React with Bootstrap
- Backend: Node.js/Express
- Database: MySQL
- Containerization: Docker
- Version Control: Git

## Project Structure

```
course-management/
├── frontend/           # React frontend application
├── backend/           # Node.js/Express backend
├── docker/            # Docker configuration files
└── README.md          # Project documentation
```

## Getting Started

1. Clone the repository
2. Set up environment variables
3. Run with Docker:
   ```bash
   docker-compose up --build
   ```

## Development

### Frontend
- React 18
- Bootstrap 5
- Form validation
- Responsive design

### Backend
- Node.js/Express
- MySQL database
- RESTful API
- Input validation

## API Endpoints

- POST /api/students - Add new student
- GET /api/students - Get all students
- GET /api/students/average - Get average score

## Database Schema

```sql
CREATE TABLE students (
    id INT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    score DECIMAL(5,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
``` 