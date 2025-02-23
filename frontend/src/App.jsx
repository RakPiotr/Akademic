//App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/edit" element={<EditProfile />} />
      </Routes>
    </Router>
  );
}

export default App;