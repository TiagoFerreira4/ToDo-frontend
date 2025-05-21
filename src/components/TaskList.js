import React, { useEffect, useState } from 'react';
import api from '../api';

function TaskList({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [msg, setMsg] = useState('');

  const loadTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      setMsg('Erro ao carregar tarefas');
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      const res = await api.post('/tasks', { title: newTitle });
      setTasks([...tasks, res.data]);
      setNewTitle('');
    } catch (err) {
      setMsg('Erro ao adicionar tarefa');
    }
  };

  const toggleTask = async (id) => {
    try {
      const t = tasks.find(task => task._id === id);
      await api.put(`/tasks/${id}`, { completed: !t.completed });
      setTasks(tasks.map(task =>
        task._id === id ? { ...task, completed: !task.completed } : task
      ));
    } catch {
      setMsg('Erro ao atualizar tarefa');
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch {
      setMsg('Erro ao deletar tarefa');
    }
  };

  return (
    <div className="centered-box" style={{ maxWidth: 600 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h2>Suas Tarefas</h2>
        <button onClick={onLogout} style={{ background: '#f33', color: '#fff', border: 0, padding: '8px 16px', borderRadius: 4, cursor: 'pointer' }}>Logout</button>
      </div>
      <form onSubmit={addTask} style={{ display: 'flex', marginBottom: 16 }}>
        <input
          placeholder="Nova tarefa"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          style={{ flex: 1, marginRight: 8 }}
        />
        <button type="submit">Adicionar</button>
      </form>
      {msg && <div style={{ color: 'red', marginBottom: 8 }}>{msg}</div>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task._id} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task._id)} />
            <span style={{
              textDecoration: task.completed ? 'line-through' : 'none',
              marginLeft: 8,
              flex: 1
            }}>{task.title}</span>
            <button onClick={() => deleteTask(task._id)} style={{ marginLeft: 8, color: '#fff', background: '#f33', border: 0, borderRadius: 4, cursor: 'pointer' }}>Excluir</button>
          </li>
        ))}
      </ul>
      {tasks.length === 0 && <div style={{ color: '#888' }}>Nenhuma tarefa cadastrada.</div>}
    </div>
  );
}

export default TaskList;
