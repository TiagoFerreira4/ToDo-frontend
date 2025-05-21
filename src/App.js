import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import TaskList from './components/TaskList';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  function handleLogin(tk) {
    setToken(tk);
    localStorage.setItem('token', tk);
  }

  function handleLogout() {
    setToken(null);
    localStorage.removeItem('token');
  }

  return (
    <Router>
      <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
        {token && <button onClick={handleLogout}>Logout</button>}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/tasks" element={token ? <TaskList token={token} /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={token ? "/tasks" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
