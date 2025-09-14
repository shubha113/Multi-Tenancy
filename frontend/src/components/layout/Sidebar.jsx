import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="sidebar">
      <div className="nav-brand">
        📝 SaaS Notes
      </div>
      
      {user && (
        <div className="user-info">
          <div className="user-name">{user.name}</div>
          <div className="user-role">{user.role}</div>
        </div>
      )}
      
      {user?.tenant && (
        <div className="tenant-info">
          <div className="tenant-name">{user.tenant.name}</div>
          <span className={`subscription-badge ${user.tenant.subscription}`}>
            {user.tenant.subscription}
          </span>
          {user.tenant.subscription === 'free' && (
            <div className="text-xs" style={{ marginTop: '4px', color: '#cbd5e1' }}>
              {user.tenant.maxNotes} notes limit
            </div>
          )}
        </div>
      )}
      
      <nav>
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          🏠 Dashboard
        </NavLink>
        
        <NavLink 
          to="/notes" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          📄 Notes
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;