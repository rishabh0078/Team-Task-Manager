import React, { useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Plus, Trash2 } from 'lucide-react';

const Tasks = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [assignedTo, setAssignedTo] = useState('');

  useEffect(() => {
    const fetchProjectsAndUsers = async () => {
      try {
        const { data: projData } = await axios.get('/projects');
        const { data: usersData } = await axios.get('/auth/users');
        setProjects(projData);
        setUsers(usersData);
        if (projData.length > 0) setSelectedProjectId(projData[0]._id);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data', error);
        setLoading(false);
      }
    };
    fetchProjectsAndUsers();
  }, []);

  const fetchTasks = async () => {
    if (!selectedProjectId) return;
    try {
      const { data } = await axios.get(`/tasks/project/${selectedProjectId}`);
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [selectedProjectId]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const payload = { title, description, status, project: selectedProjectId };
      if (assignedTo) payload.assignedTo = assignedTo;
      
      await axios.post('/tasks', payload);
      setTitle('');
      setDescription('');
      setStatus('To Do');
      setAssignedTo('');
      setShowForm(false);
      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create task');
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.put(`/tasks/${taskId}`, { status: newStatus });
      fetchTasks();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this task?')) {
      try {
        await axios.delete(`/tasks/${id}`);
        fetchTasks();
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete task');
      }
    }
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;

  return (
    <div>
      <div className="page-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <h1 className="page-title">Tasks Management</h1>
          {user?.role === 'Admin' && projects.length > 0 && (
            <button className="btn btn-primary" style={{ width: 'auto' }} onClick={() => setShowForm(!showForm)}>
              <Plus size={20} style={{ marginRight: '0.5rem' }} /> Create Task
            </button>
          )}
        </div>
        
        {projects.length > 0 ? (
          <select 
            className="form-input" 
            style={{ width: '250px' }} 
            value={selectedProjectId} 
            onChange={(e) => setSelectedProjectId(e.target.value)}
          >
            {projects.map(p => (
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>
        ) : (
          <p style={{ color: 'var(--text-muted)' }}>You need to create a project first before adding tasks.</p>
        )}
      </div>

      {showForm && (
        <div className="card-wrapper" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
          <h3>New Task</h3>
          <form onSubmit={handleCreate} style={{ marginTop: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Task Title</label>
              <input type="text" className="form-input" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-input" value={description} onChange={e => setDescription(e.target.value)} rows="2"></textarea>
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-input" value={status} onChange={e => setStatus(e.target.value)}>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Assign To</label>
              <select className="form-input" value={assignedTo} onChange={e => setAssignedTo(e.target.value)}>
                <option value="">-- Unassigned --</option>
                {users.map(u => <option key={u._id} value={u._id}>{u.name} ({u.role})</option>)}
              </select>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: 'auto' }}>Save Task</button>
          </form>
        </div>
      )}

      {projects.length > 0 && (
        <div className="card-wrapper">
          <div className="card-header">
            <h2 className="card-title">Project Tasks</h2>
          </div>
          <div>
            {tasks.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No tasks in this project yet.</div>
            ) : (
              tasks.map(task => (
                <div key={task._id} className="list-item" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{ fontWeight: '600' }}>{task.title}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{task.description}</div>
                    {task.assignedTo && (
                      <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '500' }}>
                        Assigned to: {task.assignedTo.name}
                      </div>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <select 
                      className="form-input" 
                      style={{ padding: '0.25rem 0.5rem', width: 'auto' }}
                      value={task.status}
                      onChange={(e) => handleStatusChange(task._id, e.target.value)}
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                    
                    {user?.role === 'Admin' && (
                      <button onClick={() => handleDelete(task._id)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}>
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
