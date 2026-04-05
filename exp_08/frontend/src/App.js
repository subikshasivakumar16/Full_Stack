import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', department: '', year: '', email: '' });
  const [editId, setEditId] = useState(null);
  const fetchStudents = async () => {
    const res = await axios.get('http://localhost:5000/students');
    setStudents(res.data);
  };
  useEffect(() => {
    fetchStudents();
  }, []);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5000/students/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post('http://localhost:5000/students', form);
    }
    setForm({ name: '', department: '', year: '', email: '' });
    fetchStudents();
  };
  const handleEdit = (student) => {
    setForm(student);
    setEditId(student._id);
  };
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/students/${id}`);
    fetchStudents();
  };
  return (
    <div className="container">
      <h2>🎓 Student Management System</h2>

      <form onSubmit={handleSubmit} className="form">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="department" value={form.department} onChange={handleChange} placeholder="Department" required />
        <input name="year" value={form.year} onChange={handleChange} placeholder="Year" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <button type="submit">{editId ? 'Update' : 'Add Student'}</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Year</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.department}</td>
              <td>{s.year}</td>
              <td>{s.email}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(s)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(s._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;
