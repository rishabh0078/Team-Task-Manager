import React, { useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Plus, Trash2 } from 'lucide-react';

const Projects = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get('/projects');
      setProjects(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch projects', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/projects', { name, description });
      setName('');
      setDescription('');
      setShowForm(false);
      fetchProjects();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create project');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`/projects/${id}`);
        fetchProjects();
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete project');
      }
    }
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading projects...</div>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Projects</h1>
        {user?.role === 'Admin' && (
          <button className="btn btn-primary" style={{ width: 'auto' }} onClick={() => setShowForm(!showForm)}>
            <Plus size={20} style={{ marginRight: '0.5rem' }} /> Create Project
          </button>
        )}
      </div>

      {showForm && (
        <div className="card-wrapper" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
          <h3>New Project</h3>
          <form onSubmit={handleCreate} style={{ marginTop: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Project Name</label>
              <input type="text" className="form-input" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-input" value={description} onChange={e => setDescription(e.target.value)} rows="3"></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: 'auto' }}>Save Project</button>
          </form>
        </div>
      )}

      <div className="dashboard-grid">
        {projects.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No projects found. {user?.role === 'Admin' && 'Create one above!'}</p>
        ) : (
          projects.map(project => (
            <div key={project._id} className="card-wrapper" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '1.5rem', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{project.name}</h3>
                  {user?.role === 'Admin' && (
                    <button onClick={() => handleDelete(project._id)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}>
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{project.description || 'No description provided.'}</p>
              </div>
              <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border)', background: 'var(--background)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Created: {new Date(project.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Projects;
