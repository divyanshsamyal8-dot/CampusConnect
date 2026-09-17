import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/navbar.css';

export default function Navbar({ onToggleMobile }) {
  return (
    <header className="mobile-navbar">
      <Link to="/" className="mobile-navbar-logo">
        Campus Connect
      </Link>
      <button className="mobile-menu-btn" onClick={onToggleMobile} aria-label="Toggle navigation menu">
        ☰
      </button>
    </header>
  );
}
