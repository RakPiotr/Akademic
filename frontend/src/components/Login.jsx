// Login.jsx
import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/login', { username, password });
      navigate('/home');
    } catch (err) {
      console.error(err);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="heading">Login</h2>
        <form onSubmit={handleLogin} className="form">
          <div>
            <label className="label">Username:</label>
            <input
              type="text"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Password:</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="button">
            Login
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        <button className="registerButton" onClick={() => navigate('/register')}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Login;