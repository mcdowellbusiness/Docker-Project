import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

function App() {
  // State management
  const [students, setStudents] = useState([]);
  const [average, setAverage] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    studentId: '',
    score: ''
  });
  const [errors, setErrors] = useState({});
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // TODO: Implement fetchStudents function
  // Hint: Use axios to get students from API with sorting parameters
  const fetchStudents = useCallback(async () => {
    try {
      // TODO: Implement API call
      // 1. Set loading state
      // 2. Make API request with sort parameters
      // 3. Update students state
      // 4. Handle errors
     setLoading(true);
      const response = await axios.get(`${API_URL}/students`, {
        params: { sortBy, order: sortOrder }
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  }, [sortBy, sortOrder]);

  // TODO: Implement fetchAverage function
  // Hint: Use axios to get average score from API
  const fetchAverage = useCallback(async () => {
    try {
      // TODO: Implement API call
      // 1. Make API request
      // 2. Update average state
      // 3. Handle errors
    } catch (error) {
      console.error('Error fetching average:', error);
      // TODO: Set default average
    }
  }, []);

  // Fetch data on component mount and when sort changes
  useEffect(() => {
    fetchStudents();
    fetchAverage();
  }, [sortBy, sortOrder, fetchStudents, fetchAverage]);

  // TODO: Implement form validation
  // Hint: Validate all required fields and their constraints
  const validateForm = () => {
    const newErrors = {};
    // TODO: Add validation logic
    // 1. Validate first name
    // 2. Validate last name
    // 3. Validate student ID
    // 4. Validate score
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // TODO: Implement edit handler
  // Hint: Populate form with student data
  const handleEdit = (student) => {
    // TODO: Set editing state and form data
  };

  // TODO: Implement delete handler
  // Hint: Add confirmation dialog and API call
  const handleDelete = async (id) => {
    // TODO: Implement delete logic
    // 1. Show confirmation dialog
    // 2. Make API request
    // 3. Refresh data
    // 4. Handle errors
  };

  // TODO: Implement form submission
  // Hint: Handle both create and update cases
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // TODO: Implement submission logic
      // 1. Set loading state
      // 2. Make API request (POST or PUT)
      // 3. Reset form
      // 4. Refresh data
      // 5. Handle errors
    } catch (error) {
      console.error('Error saving student:', error);
      // TODO: Handle API errors
    } finally {
      // TODO: Reset loading state
    }
  };

  // TODO: Implement cancel handler
  // Hint: Reset form and editing state
  const handleCancel = () => {
    // TODO: Reset form and editing state
  };

  // TODO: Implement sort handler
  // Hint: Toggle sort order and update sort field
  const handleSort = (field) => {
    // TODO: Implement sorting logic
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Course Management System</h1>
      
      {/* Student Form */}
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">{editingId ? 'Edit Student' : 'Add New Student'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Middle Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.middleName}
                  onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Student ID</label>
                <input
                  type="number"
                  className={`form-control ${errors.studentId ? 'is-invalid' : ''}`}
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  disabled={!!editingId}
                />
                {errors.studentId && <div className="invalid-feedback">{errors.studentId}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Score</label>
                <input
                  type="number"
                  className={`form-control ${errors.score ? 'is-invalid' : ''}`}
                  value={formData.score}
                  onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                />
                {errors.score && <div className="invalid-feedback">{errors.score}</div>}
              </div>
            </div>
            {errors.submit && <div className="alert alert-danger">{errors.submit}</div>}
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Saving...' : (editingId ? 'Update Student' : 'Add Student')}
              </button>
              {editingId && (
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Statistics */}
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">Statistics</h2>
          <p className="mb-0">Average Score: {average ? average.toFixed(2) : '0.00'}</p>
        </div>
      </div>

      {/* Student Table */}
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Student List</h2>
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('first_name')} style={{ cursor: 'pointer' }}>
                      Name {sortBy === 'first_name' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>
                      ID {sortBy === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('score')} style={{ cursor: 'pointer' }}>
                      Score {sortBy === 'score' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>
                        {student.first_name} {student.middle_name} {student.last_name}
                      </td>
                      <td>{student.id}</td>
                      <td>{student.score}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleEdit(student)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(student.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App; 
