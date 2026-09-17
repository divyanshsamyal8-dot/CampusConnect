import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import NotificationBadge from '../Notification/NotificationBadge';
import '../../styles/sidebar.css';

export default function Sidebar({ mobileOpen, onCloseMobile }) {
  const {
    currentUser,
    commNotificationCount,
    pendingRequestsCount,
  } = useApp();

  const handleNavClick = () => {
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <nav className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <NavLink to="/" className="logo" onClick={handleNavClick}>
        Campus Connect
      </NavLink>

      <NavLink
        to="/"
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        onClick={handleNavClick}
        end
      >
        <div className="nav-icon">🏠</div>
        <span>Global Feed</span>
      </NavLink>

      <NavLink
        to="/communities"
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        onClick={handleNavClick}
      >
        <div className="nav-icon">🌍</div>
        <span>Communities</span>
        <NotificationBadge count={commNotificationCount} />
      </NavLink>

      <NavLink
        to="/chat"
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        onClick={handleNavClick}
      >
        <div className="nav-icon">💬</div>
        <span>Private DMs</span>
      </NavLink>

      <NavLink
        to="/friends"
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        onClick={handleNavClick}
      >
        <div className="nav-icon">👥</div>
        <span>Friends</span>
        <NotificationBadge count={pendingRequestsCount} />
      </NavLink>

      <NavLink
        to="/canteen"
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        onClick={handleNavClick}
      >
        <div className="nav-icon">🍕</div>
        <span>Canteen</span>
      </NavLink>

      <NavLink
        to="/support"
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        onClick={handleNavClick}
      >
        <div className="nav-icon">🛡️</div>
        <span>Support Desk</span>
      </NavLink>

      <hr style={{ border: 0, borderTop: '1px solid rgba(255,255,255,0.08)', margin: '15px 0' }} />

      <NavLink
        to="/questions"
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        onClick={handleNavClick}
      >
        <div className="nav-icon">❓</div>
        <span>Questions & Answers</span>
      </NavLink>

      <NavLink
        to="/events"
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        onClick={handleNavClick}
      >
        <div className="nav-icon">📅</div>
        <span>Campus Events</span>
      </NavLink>

      <NavLink
        to="/announcements"
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        onClick={handleNavClick}
      >
        <div className="nav-icon">⚡</div>
        <span>Announcements</span>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        onClick={handleNavClick}
      >
        <div className="nav-icon">👤</div>
        <span>My Profile</span>
      </NavLink>

      <NavLink
        to="/admin"
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        onClick={handleNavClick}
      >
        <div className="nav-icon">⚙️</div>
        <span>Admin Portal</span>
      </NavLink>

      <div className="sidebar-footer">
        <div className="sidebar-version">Campus Connect v2.2</div>
        <div className="sidebar-user-name">
          Welcome, <span>{currentUser.name || 'Student'}</span>! 👋
        </div>
        <div className="sidebar-user-roll">
          {currentUser.rollNumber ? `Roll: ${currentUser.rollNumber}` : 'Roll: Not set'}
        </div>
      </div>
    </nav>
  );
}
