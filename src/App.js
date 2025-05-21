import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import './App.css';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (jwt) => {
    localStorage.setItem('token', jwt);
    setToken(jwt);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!token ? <Login onLogin={handleLogin} /> : <Navigate to="/tasks" />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/tasks" />} />
        <Route path="/tasks" element={token ? <TaskList onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={token ? "/tasks" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
