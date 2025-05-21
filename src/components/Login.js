import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await api.post('/auth/login', { username, password });
      onLogin(res.data.token);
      navigate('/tasks');
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Erro');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Usuário" value={username} onChange={e => setUsername(e.target.value)} /><br />
        <input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
        <button type="submit">Entrar</button>
      </form>
      <div>{msg}</div>
    </div>
  );
}

export default Login;
