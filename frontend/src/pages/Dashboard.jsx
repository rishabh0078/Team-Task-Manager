import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from '../api/axios';
import { Briefcase, ListTodo, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data: projectsData } = await axios.get('/projects');
        setProjects(projectsData);
        
        // Fetch tasks for all projects to get total stats
        // To simplify, we'll iterate or just fetch from an endpoint that gets all user tasks
        // Let's create a quick loop or update the backend. Actually, fetching projects is enough for now, 
        // but we'll fetch tasks individually or if the backend endpoint exists.
        // Wait, backend doesn't have a "get all tasks for user" yet. 
        // We'll iterate over projects and fetch tasks for each.
        let allTasks = [];
        for (const p of projectsData) {
          const { data } = await axios.get(`/tasks/project/${p._id}`);
          allTasks = [...allTasks, ...data];
        }
        
        // Filter tasks based on role
        if (user?.role === 'Member') {
          allTasks = allTasks.filter(t => t.assignedTo?._id === user._id || t.assignedTo === user._id);
        }
        
        setTasks(allTasks);

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <div style={{ padding: '2rem' }}>Loading dashboard...</div>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Welcome back, {user?.name.split(' ')[0]} 👋</h1>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-icon"><Briefcase /></div>
          <div className="stat-content">
            <h3>Active Projects</h3>
            <p>{projects.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}>
            <ListTodo />
          </div>
          <div className="stat-content">
            <h3>Pending Tasks</h3>
            <p>{tasks.filter(t => t.status !== 'Done').length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--secondary)' }}>
            <CheckCircle />
          </div>
          <div className="stat-content">
            <h3>Completed Tasks</h3>
            <p>{tasks.filter(t => t.status === 'Done').length}</p>
          </div>
        </div>
      </div>

      <div className="card-wrapper">
        <div className="card-header">
          <h2 className="card-title">Recent Projects</h2>
        </div>
        <div>
          {projects.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No projects found. Create one to get started!</div>
          ) : (
            projects.map(project => (
              <div key={project._id} className="list-item">
                <div>
                  <div style={{ fontWeight: '600' }}>{project.name}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{project.members.length} members</div>
                </div>
                <span className="badge badge-progress">Active</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
