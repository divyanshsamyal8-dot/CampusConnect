import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { SearchIcon, BellIcon, MenuIcon, UserIcon, SettingsIcon, CheckIcon } from '../Icons/Icons';
import '../../styles/navbar.css';

export default function Navbar({ onToggleMobile }) {
  const {
    currentUser,
    searchQuery,
    setSearchQuery,
    commNotificationCount,
    pendingRequestsCount,
  } = useApp();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);
  const navigate = useNavigate();

  const totalNotifications = (commNotificationCount || 0) + (pendingRequestsCount || 0);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <header className="main-header">
      <div className="header-left">
        <button
          className="mobile-toggle-btn"
          onClick={onToggleMobile}
          aria-label="Toggle navigation menu"
        >
          <MenuIcon size={22} color="#18181B" />
        </button>

        <Link to="/" className="header-logo">
          <span className="logo-text">
            c<span className="logo-accent-blue">a</span>mp<span className="logo-accent-purple">u</span>s{' '}
            c<span className="logo-accent-teal">o</span>nn<span className="logo-accent-amber">e</span>ct
          </span>
        </Link>
      </div>

      <div className="header-center">
        <div className="header-search-pill">
          <SearchIcon size={18} color="#71717A" />
          <input
            type="text"
            className="header-search-input"
            placeholder="Search campus feed, tags, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="header-right">
        {/* Notification Bell */}
        <div className="header-item-wrapper" ref={notifRef}>
          <button
            className="header-icon-btn"
            onClick={() => setNotifOpen((prev) => !prev)}
            aria-label="Notifications"
          >
            <BellIcon size={20} color="#18181B" />
            {totalNotifications > 0 && <span className="notification-dot" />}
          </button>

          {notifOpen && (
            <div className="header-dropdown-menu notif-dropdown">
              <div className="dropdown-header">
                <strong>Notifications</strong>
                <span className="badge-pill">{totalNotifications} new</span>
              </div>
              <div className="dropdown-body">
                {pendingRequestsCount > 0 ? (
                  <div
                    className="dropdown-item clickable"
                    onClick={() => {
                      navigate('/friends');
                      setNotifOpen(false);
                    }}
                  >
                    <span className="notif-indicator-blue" />
                    <div>
                      <div className="dropdown-item-title">
                        {pendingRequestsCount} Pending Friend Request{pendingRequestsCount !== 1 ? 's' : ''}
                      </div>
                      <div className="dropdown-item-desc">Review requests in Friends page</div>
                    </div>
                  </div>
                ) : null}

                {commNotificationCount > 0 ? (
                  <div
                    className="dropdown-item clickable"
                    onClick={() => {
                      navigate('/communities');
                      setNotifOpen(false);
                    }}
                  >
                    <span className="notif-indicator-purple" />
                    <div>
                      <div className="dropdown-item-title">
                        {commNotificationCount} Community Update{commNotificationCount !== 1 ? 's' : ''}
                      </div>
                      <div className="dropdown-item-desc">Unread activity in your groups</div>
                    </div>
                  </div>
                ) : null}

                {totalNotifications === 0 && (
                  <div className="dropdown-empty">All caught up! No new notifications.</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar with Dropdown */}
        <div className="header-item-wrapper" ref={dropdownRef}>
          <button
            className="header-avatar-btn"
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-label="User menu"
          >
            <div
              className="user-avatar-circle"
              style={{
                backgroundColor: currentUser.avatarColor || '#2563EB',
              }}
            >
              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'S'}
            </div>
          </button>

          {dropdownOpen && (
            <div className="header-dropdown-menu user-dropdown">
              <div className="dropdown-header user-info-header">
                <div className="user-dropdown-name">{currentUser.name || 'Student'}</div>
                <div className="user-dropdown-roll">
                  {currentUser.rollNumber ? currentUser.rollNumber : 'Roll: Not registered'}
                </div>
              </div>
              <div className="dropdown-body">
                <div
                  className="dropdown-item clickable"
                  onClick={() => {
                    navigate('/profile');
                    setDropdownOpen(false);
                  }}
                >
                  <UserIcon size={16} color="#71717A" />
                  <span>My Profile</span>
                </div>
                <div
                  className="dropdown-item clickable"
                  onClick={() => {
                    navigate('/admin');
                    setDropdownOpen(false);
                  }}
                >
                  <SettingsIcon size={16} color="#71717A" />
                  <span>Admin Portal</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
