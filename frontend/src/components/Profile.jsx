// Profile.jsx
import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles.css';

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState('');

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`/users/${id}`);
      setUserProfile(response.data);
    } catch (err) {
      console.error(err);
      setError('Error fetching profile or unauthorized');
      if (err.response && err.response.status === 401) {
        navigate('/');
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  if (!userProfile) {
    return (
      <div className="loadingContainer">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <button
          className="button"
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#007BFF')}
          onClick={() => navigate('/home')}
        >
          Back to Home
        </button>

        <h2 className="heading">User Profile</h2>
        {error && <p className="error">{error}</p>}

        <div className="infoRow">
          <span className="label">Name: </span>
          {userProfile.name}
        </div>
        <div className="infoRow">
          <span className="label">Username: </span>
          {userProfile.username}
        </div>
        <div className="infoRow">
          <span className="label">Age: </span>
          {userProfile.age}
        </div>
        <div className="infoRow">
          <span className="label">Budget: </span>
          {userProfile.budget}
        </div>
        <div className="infoRow">
          <span className="label">City: </span>
          {userProfile.city}
        </div>
      </div>
    </div>
  );
}

export default Profile;