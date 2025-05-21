import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await api.post('/auth/register', { username, password });
      setMsg('Cadastro realizado com sucesso!');
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Erro');
    }
  };

  return (
    <div className="centered-box">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Usuário" value={username} onChange={e => setUsername(e.target.value)} />
        <input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Cadastrar</button>
      </form>
      <div style={{ marginTop: 8 }}>
        Já tem conta? <Link to="/login">Entrar</Link>
      </div>
      <div style={{ color: msg === 'Cadastro realizado com sucesso!' ? 'green' : 'red' }}>{msg}</div>
    </div>
  );
}

export default Register;
