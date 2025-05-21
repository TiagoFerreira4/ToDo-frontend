import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

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
    <div className="centered-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Usuário" value={username} onChange={e => setUsername(e.target.value)} />
        <input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
      <div style={{ marginTop: 8 }}>
        Ainda não tem cadastro? <Link to="/register">Cadastre-se</Link>
      </div>
      <div style={{ color: 'red' }}>{msg}</div>
    </div>
  );
}

export default Login;
