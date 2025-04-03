# Course Management System - Team Learning Project

A full-stack application for managing student course data with React frontend and Node.js/Express backend. This project serves as a learning platform for team collaboration and development practices.

## Project Structure

```
example-project/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.js      # Main application component
│   │   └── App.css     # Styles
│   └── package.json    # Frontend dependencies
├── backend/           # Node.js/Express backend
│   ├── src/
│   │   └── index.js    # Main server file
│   └── package.json    # Backend dependencies
├── docker/            # Docker configuration files
└── README.md          # Project documentation
```

## Learning Objectives

1. **Version Control**
   - Working with Git branches
   - Pull requests and code review
   - Resolving merge conflicts
   - Commit message best practices

2. **Frontend Development**
   - React components and hooks
   - Form handling and validation
   - API integration
   - State management

3. **Backend Development**
   - RESTful API design
   - Database operations
   - Input validation
   - Error handling

4. **DevOps**
   - Docker containerization
   - Environment configuration
   - Development workflow

## Team Tasks

### Frontend Tasks
1. Implement student form validation
2. Add loading states and error handling
3. Create reusable components
4. Implement sorting functionality
5. Add responsive design improvements

### Backend Tasks
1. Implement database operations
2. Add input validation
3. Create error handling middleware
4. Implement sorting logic
5. Add authentication/authorization

### DevOps Tasks
1. Set up development environment
2. Configure Docker containers
3. Set up CI/CD pipeline
4. Implement environment variables
5. Configure database backups

## Getting Started

1. Clone the repository
2. Set up environment variables
3. Run with Docker:
   ```bash
   docker-compose up --build
   ```

## Development Workflow

1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit:
   ```bash
   git add .
   git commit -m "feat: description of your changes"
   ```

3. Push your changes:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a pull request for review

## Code Style Guidelines

- Use meaningful variable and function names
- Add comments for complex logic
- Follow consistent indentation
- Write unit tests for new features
- Update documentation as needed

## API Documentation

### Endpoints

#### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Add new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student
- `GET /api/students/average` - Get average score

### Data Models

#### Student
```typescript
interface Student {
  id: number;          // 1-10
  firstName: string;   // Required
  middleName?: string; // Optional
  lastName: string;    // Required
  score: number;       // 0-100
  createdAt: Date;     // Auto-generated
}
```

## Contributing

1. Follow the team's coding standards
2. Write clear commit messages
3. Test your changes thoroughly
4. Update documentation as needed
5. Request code reviews from team members

## Resources

- [React Documentation](https://reactjs.org/)
- [Express Documentation](https://expressjs.com/)
- [Docker Documentation](https://docs.docker.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/) 