import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function Home() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users/all');
      setUsers(response.data);
    } catch (err) {
      console.error(err);
      setError('You must be logged in to view users.');
      if (err.response && err.response.status === 401) {
        navigate('/');
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="buttonRow">
          <button className="button" onClick={() => navigate('/edit')}>
            Edit My Profile
          </button>
          <button className="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <h2 className="heading">All Users</h2>
        {error && <p className="errorText">{error}</p>}
        <table className="table">
          <thead className="tableHeader">
            <tr>
              <th className="tableHeaderCell">Username</th>
              <th className="tableHeaderCell">Name</th>
              <th className="tableHeaderCell">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr className="tableRow" key={u.id}>
                <td className="tableCell">{u.username}</td>
                <td className="tableCell">{u.name}</td>
                <td className="tableCell">
                  <button
                    className="profileButton"
                    onClick={() => navigate(`/profile/${u.id}`)}
                  >
                    Check Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;