import React, { useState } from 'react';
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

  return (
    <div className="app-container">
      <Navbar onToggleMobile={() => setMobileOpen((prev) => !prev)} />

      <div className="app-body">
        {mobileOpen && (
          <div
            className="mobile-backdrop"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}
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
    </div>
  );
}
