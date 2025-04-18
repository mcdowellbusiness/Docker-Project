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

  const fetchStudents = useCallback(async () => {
    try {
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

// Implement fetchAverage function
const fetchAverage = useCallback(async () => {
  try {
    const response = await axios.get(`${API_URL}/students/average`);
    setAverage(Number(response.data.average));
  } catch (error) {
    console.error('Error fetching average:', error);
    setAverage(0);
  }
}, []);

// Fetch data on component mount and when sort changes
useEffect(() => {
  fetchStudents();
  fetchAverage();
}, [sortBy, sortOrder, fetchStudents, fetchAverage]);
   const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.studentId) newErrors.studentId = 'Student ID is required';
    if (formData.studentId && (formData.studentId < 1 || formData.studentId > 10)) {
      newErrors.studentId = 'Student ID must be between 1 and 10';
    }
    if (!formData.score) newErrors.score = 'Score is required';
    if (formData.score && (formData.score < 0 || formData.score > 100)) {
      newErrors.score = 'Score must be between 0 and 100';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = (student) => {
	setEditingId(student.id);
	setFormData({
		firstName: student.first_name,
		middleName: student.middle_name,
		lastName: student.last_name,
		studentId: student.id,
		score: student.score,
	});
  };


const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) {
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`${API_URL}/students/${id}`);
      fetchStudents();
      fetchAverage();
    } catch (error) {
      console.error('Error deleting student:', error);
      if (error.response?.data?.error) {
        setErrors({ submit: error.response.data.error });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      if (editingId) {
        // Update existing student
        await axios.put(`${API_URL}/students/${editingId}`, formData);
      } else {
        // Add new student
        await axios.post(`${API_URL}/students`, formData);
      }
      
      setFormData({
        firstName: '',
        middleName: '',
        lastName: '',
        studentId: '',
        score: ''
      });
      setEditingId(null);
      fetchStudents();
      fetchAverage();
    } catch (error) {
      console.error('Error saving student:', error);
      if (error.response?.data?.error) {
        setErrors({ submit: error.response.data.error });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      studentId: '',
      score: ''
    });
    setEditingId(null);
    setErrors({});
  };

 const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
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
