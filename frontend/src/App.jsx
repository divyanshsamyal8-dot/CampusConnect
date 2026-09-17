import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';

// Pages
import HomePage from './pages/Home/HomePage';
import CommunitiesPage from './pages/Communities/CommunitiesPage';
import ChatPage from './pages/Chat/ChatPage';
import FriendsPage from './pages/Friends/FriendsPage';
import CanteenPage from './pages/Canteen/CanteenPage';
import ReportProblemPage from './pages/ReportProblem/ReportProblemPage';
import QuestionsPage from './pages/Questions/QuestionsPage';
import EventsPage from './pages/Events/EventsPage';
import AnnouncementsPage from './pages/Announcements/AnnouncementsPage';
import ProfilePage from './pages/Profile/ProfilePage';
import AdminPage from './pages/Admin/AdminPage';

// Styles
import './styles/global.css';
import './styles/sidebar.css';
import './styles/navbar.css';
import './styles/posts.css';
import './styles/comments.css';
import './styles/communities.css';
import './styles/chat.css';
import './styles/canteen.css';
import './styles/friends.css';
import './styles/support.css';
import './styles/responsive.css';

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Ripple effect listener on buttons
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const btn =
        e.target.closest('.btn') ||
        e.target.closest('.action-btn') ||
        e.target.closest('.friend-action-btn') ||
        e.target.closest('.add-friend-btn') ||
        e.target.closest('.member-action-btn');

      if (btn) {
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
        `;
        ripple.classList.add('ripple');

        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <div className="app-container">
      <Navbar onToggleMobile={() => setMobileOpen((prev) => !prev)} />
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/communities" element={<CommunitiesPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/canteen" element={<CanteenPage />} />
          <Route path="/support" element={<ReportProblemPage />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
}
