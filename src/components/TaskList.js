import React, { useEffect, useState } from 'react';
import api from '../api';

function TaskList({ token }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line
  }, []);

  const loadTasks = async () => {
    try {
      const res = await api.get('/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      setMsg('Erro ao carregar tarefas');
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await api.post('/tasks', { title }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTitle('');
      loadTasks();
    } catch (err) {
      setMsg('Erro ao adicionar');
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      await api.put(`/tasks/${id}`, { completed: !completed }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      loadTasks();
    } catch {
      setMsg('Erro ao atualizar');
    }
  };

  const removeTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      loadTasks();
    } catch {
      setMsg('Erro ao remover');
    }
  };

  return (
    <div>
      <h2>Suas Tarefas</h2>
      <form onSubmit={addTask}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Nova tarefa"
        />
        <button type="submit">Adicionar</button>
      </form>
      <ul>
        {tasks.map(t => (
          <li key={t._id}>
            <span
              style={{ textDecoration: t.completed ? 'line-through' : 'none', cursor: 'pointer' }}
              onClick={() => toggleTask(t._id, t.completed)}
            >
              {t.title}
            </span>
            <button onClick={() => removeTask(t._id)}>Remover</button>
          </li>
        ))}
      </ul>
      {msg && <div>{msg}</div>}
    </div>
  );
}

export default TaskList;
