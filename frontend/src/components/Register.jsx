// Register.jsx
import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
    age: '',
    budget: '',
    city: '',
    name: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', {
        username: form.username,
        password: form.password,
        age: parseInt(form.age, 10),
        budget: parseFloat(form.budget),
        city: form.city,
        name: form.name,
      });
      navigate('/'); // Go back to login
    } catch (err) {
      console.error(err);
      setError('Error registering user');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="heading">Register</h2>

        <form onSubmit={handleRegister} className="form">
          <div>
            <label className="label">Username:</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label className="label">Password:</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label className="label">Age:</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label className="label">Budget:</label>
            <input
              type="number"
              step="0.01"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label className="label">City:</label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label className="label">Name:</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input"
            />
          </div>

          <button
            type="submit"
            className="button"
          >
            Register
          </button>
        </form>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default Register;