import React, { useState } from 'react';
import api from '../api';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await api.post('/auth/register', { username, password });
      setMsg('Cadastro realizado! Faça login.');
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Erro');
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Usuário" value={username} onChange={e => setUsername(e.target.value)} /><br />
        <input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
        <button type="submit">Cadastrar</button>
      </form>
      <div>{msg}</div>
    </div>
  );
}

export default Register;
