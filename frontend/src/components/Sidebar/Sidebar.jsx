import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import NotificationBadge from '../Notification/NotificationBadge';
import {
  HomeIcon,
  GlobeIcon,
  MessageSquareIcon,
  UsersIcon,
  AnnouncementIcon,
  UtensilsIcon,
  ShieldIcon,
  HelpCircleIcon,
  CalendarIcon,
  UserIcon,
  SettingsIcon,
} from '../Icons/Icons';
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
    <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-nav-container">
        {/* Primary Navigation Section */}
        <div className="nav-group">
          <NavLink
            to="/"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={handleNavClick}
            end
          >
            <HomeIcon size={19} className="sidebar-icon" />
            <span className="sidebar-label">home / global feed</span>
          </NavLink>

          <NavLink
            to="/communities"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            <GlobeIcon size={19} className="sidebar-icon" />
            <span className="sidebar-label">communities</span>
            <NotificationBadge count={commNotificationCount} />
          </NavLink>

          <NavLink
            to="/chat"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            <MessageSquareIcon size={19} className="sidebar-icon" />
            <span className="sidebar-label">private dms</span>
          </NavLink>

          <NavLink
            to="/friends"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            <UsersIcon size={19} className="sidebar-icon" />
            <span className="sidebar-label">friends</span>
            <NotificationBadge count={pendingRequestsCount} />
          </NavLink>

          <NavLink
            to="/announcements"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            <AnnouncementIcon size={19} className="sidebar-icon" />
            <span className="sidebar-label">announcements</span>
          </NavLink>

          <NavLink
            to="/canteen"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            <UtensilsIcon size={19} className="sidebar-icon" />
            <span className="sidebar-label">canteen</span>
          </NavLink>

          <NavLink
            to="/support"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            <ShieldIcon size={19} className="sidebar-icon" />
            <span className="sidebar-label">support desk</span>
          </NavLink>
        </div>

        {/* Resources Divider & Group */}
        <div className="nav-group resources-group">
          <div className="resources-divider-label">RESOURCES</div>

          <NavLink
            to="/questions"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            <HelpCircleIcon size={19} className="sidebar-icon" />
            <span className="sidebar-label">questions & answers</span>
          </NavLink>

          <NavLink
            to="/events"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            <CalendarIcon size={19} className="sidebar-icon" />
            <span className="sidebar-label">campus events</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            <UserIcon size={19} className="sidebar-icon" />
            <span className="sidebar-label">my profile</span>
          </NavLink>

          <NavLink
            to="/admin"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            <SettingsIcon size={19} className="sidebar-icon" />
            <span className="sidebar-label">admin portal</span>
          </NavLink>
        </div>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-user-card">
          <div
            className="sidebar-user-avatar"
            style={{ backgroundColor: currentUser.avatarColor || '#2563EB' }}
          >
            {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'S'}
          </div>
          <div className="sidebar-user-details">
            <div className="sidebar-user-name">{currentUser.name || 'Student'}</div>
            <div className="sidebar-user-meta">
              {currentUser.rollNumber || 'campus connect v2.2'}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
