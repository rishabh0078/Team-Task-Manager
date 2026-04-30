import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, FolderGit2, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { logout, user } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <FolderGit2 color="var(--primary)" size={28} />
        TeamTask
      </div>
      
      <div style={{ marginBottom: '2rem', padding: '0.75rem 1rem', background: 'var(--background)', borderRadius: '0.5rem' }}>
        <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-main)' }}>{user?.name}</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.role}</div>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <LayoutDashboard />
          Dashboard
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <FolderGit2 />
          Projects
        </NavLink>
        <NavLink to="/tasks" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <CheckSquare />
          Tasks
        </NavLink>
      </nav>

      <div style={{ marginTop: 'auto' }}>
        <button onClick={logout} className="nav-item" style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--danger)' }}>
          <LogOut />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
