// EditProfile.jsx
import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function EditProfile() {
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

  const fetchMyProfile = async () => {
    try {
      const response = await axios.get('/users/me');
      const user = response.data;
      setForm({
        username: user.username || '',
        password: user.password || '',
        age: user.age || '',
        budget: user.budget || '',
        city: user.city || '',
        name: user.name || '',
      });
    } catch (err) {
      console.error(err);
      setError('You must be logged in');
      if (err.response && err.response.status === 401) {
        navigate('/');
      }
    }
  };

  useEffect(() => {
    fetchMyProfile();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/users/me', {
        username: form.username,
        password: form.password,
        age: parseInt(form.age, 10),
        budget: parseFloat(form.budget),
        city: form.city,
        name: form.name,
      });
      navigate('/home');
    } catch (err) {
      console.error(err);
      setError('Error saving profile');
    }
  };

  return (
    <div className="container">
      <div className="card">

        {/* Heading */}
        <h2 className="heading">Edit My Profile</h2>

        {/* Error message */}
        {error && <p className="error">{error}</p>}

        {/* Profile form */}
        <form className="form" onSubmit={handleSave}>
          <div>
            <label className="label">Username:</label>
            <input
              type="text"
              name="username"
              className="input"
              value={form.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">Password:</label>
            <input
              type="password"
              name="password"
              className="input"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">Age:</label>
            <input
              type="number"
              name="age"
              className="input"
              value={form.age}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">Budget:</label>
            <input
              type="number"
              step="0.01"
              name="budget"
              className="input"
              value={form.budget}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">City:</label>
            <input
              type="text"
              name="city"
              className="input"
              value={form.city}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">Name:</label>
            <input
              type="text"
              name="name"
              className="input"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="saveButton">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;