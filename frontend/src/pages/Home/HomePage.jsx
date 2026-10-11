import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import PostCard from '../../components/PostCard/PostCard';
import { validateRollNumber } from '../../utils/helpers';
import {
  CalendarIcon,
  AnnouncementIcon,
  CheckIcon,
  SearchIcon,
  ShieldIcon,
  UtensilsIcon,
} from '../../components/Icons/Icons';
import '../../styles/posts.css';

export default function HomePage() {
  const {
    currentUser,
    updateUserProfile,
    posts,
    searchQuery,
    setSearchQuery,
    addPost,
    events,
    announcements,
  } = useApp();

  const [userName, setUserName] = useState(currentUser.name || 'Student');
  const [userRoll, setUserRoll] = useState(currentUser.rollNumber || '');
  const [tag, setTag] = useState('');
  const [text, setText] = useState('');
  const [isRollValid, setIsRollValid] = useState(validateRollNumber(currentUser.rollNumber));

  const handleRollChange = (val) => {
    const upper = val.toUpperCase();
    setUserRoll(upper);
    setIsRollValid(validateRollNumber(upper));
  };

  const handleCreatePost = (isAnon) => {
    if (!text.trim()) {
      alert('Please enter some text for your post!');
      return;
    }

    if (!isAnon && userRoll && !isRollValid) {
      alert('Please enter a valid roll number (Format: NNNNANANNN)');
      return;
    }

    addPost({
      text,
      tag,
      isAnon,
      customName: userName,
      customRoll: userRoll,
    });

    setText('');
  };

  // Filter posts based on searchQuery
  const filteredPosts = posts.filter((post) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      post.text.toLowerCase().includes(q) ||
      (post.tag && post.tag.toLowerCase().includes(q)) ||
      (post.author && post.author.toLowerCase().includes(q))
    );
  });

  return (
    <div className="view-section feed-page-layout">
      {/* Central Feed Column */}
      <div className="feed-main-column">
        {/* Post Creation Card */}
        <div className="card post-create-card">
          <div className="create-card-header">
            <div
              className="create-avatar"
              style={{ backgroundColor: currentUser.avatarColor || '#2563EB' }}
            >
              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'S'}
            </div>
            <div className="create-header-text">
              <span className="create-title">share with campus</span>
              <span className="create-subtitle">post updates, discussions, or questions</span>
            </div>
          </div>

          {/* Form Fields: Two Lightly Outlined Inputs & Dropdown */}
          <div className="create-inputs-grid">
            <div className="input-group">
              <label className="input-label" htmlFor="student-name-input">
                Student
              </label>
              <input
                id="student-name-input"
                type="text"
                className="clean-outlined-input"
                placeholder="Student Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onBlur={() => updateUserProfile(userName, userRoll)}
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="student-roll-input">
                Your Roll Number
              </label>
              <div className="input-with-validation">
                <input
                  id="student-roll-input"
                  type="text"
                  className={`clean-outlined-input ${userRoll ? (isRollValid ? 'is-valid' : 'is-invalid') : ''}`}
                  placeholder="e.g. 2025A7R025"
                  maxLength={10}
                  value={userRoll}
                  onChange={(e) => handleRollChange(e.target.value)}
                  onBlur={() => updateUserProfile(userName, userRoll)}
                />
                {userRoll && isRollValid && (
                  <span className="valid-check-icon">
                    <CheckIcon size={14} color="#10B981" />
                  </span>
                )}
              </div>
            </div>

            <div className="input-group full-width-sm">
              <label className="input-label" htmlFor="category-select">
                Category
              </label>
              <select
                id="category-select"
                className="clean-outlined-select"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              >
                <option value="">Select a category...</option>
                <option value="📚 Study">📚 Study</option>
                <option value="🎉 Social">🎉 Social</option>
                <option value="⚡ Campus News">⚡ Campus News</option>
                <option value="❓ Question">❓ Question</option>
                <option value="💡 Idea">💡 Idea</option>
                <option value="🏀 Sports">🏀 Sports</option>
                <option value="🎨 Creative">🎨 Creative</option>
                <option value="🔬 Science">🔬 Science</option>
                <option value="💼 Career">💼 Career</option>
                <option value="🎵 Music">🎵 Music</option>
                <option value="🍔 Food">🍔 Food</option>
                <option value="🚗 Transport">🚗 Transport</option>
                <option value="💻 Tech">💻 Tech</option>
                <option value="📅 Events">📅 Events</option>
              </select>
            </div>
          </div>

          {/* Main Textarea */}
          <textarea
            className="create-textarea"
            placeholder="Share a post or a question..."
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Action Buttons: Flat Blue Pill & Flat Light-Grey Pill */}
          <div className="create-actions-row">
            <button
              type="button"
              className="btn btn-pill-blue"
              onClick={() => handleCreatePost(false)}
            >
              Post Publicly
            </button>

            <button
              type="button"
              className="btn btn-pill-grey"
              onClick={() => handleCreatePost(true)}
            >
              Post Anonymously
            </button>
          </div>
        </div>

        {/* Feed Status / Active Filter Indicator */}
        {searchQuery && (
          <div className="search-filter-banner">
            <span>
              Searching for <strong>"{searchQuery}"</strong> ({filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''})
            </span>
            <button className="clear-filter-btn" onClick={() => setSearchQuery('')}>
              Clear
            </button>
          </div>
        )}

        {/* Post Cards List */}
        <div className="posts-stream">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="card empty-feed-card">
              <div className="empty-feed-title">No posts found</div>
              <div className="empty-feed-subtitle">
                {searchQuery
                  ? `No posts matched "${searchQuery}". Try a different keyword.`
                  : 'Be the first to share an update with the campus!'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Right-Hand Panel: Campus Highlights */}
      <aside className="feed-right-panel">
        {/* Announcements Widget */}
        <div className="card widget-card">
          <div className="widget-header">
            <AnnouncementIcon size={18} color="#2563EB" />
            <h3 className="widget-title">campus announcements</h3>
          </div>
          <div className="widget-list">
            {announcements && announcements.slice(0, 3).map((item) => (
              <div key={item.id} className="widget-item">
                <div className="widget-item-title">{item.title}</div>
                <div className="widget-item-meta">{item.date} · {item.priority || 'General'}</div>
              </div>
            ))}
          </div>
          <Link to="/announcements" className="widget-more-link">
            view all announcements →
          </Link>
        </div>

        {/* Upcoming Events Widget */}
        <div className="card widget-card">
          <div className="widget-header">
            <CalendarIcon size={18} color="#8B5CF6" />
            <h3 className="widget-title">upcoming events</h3>
          </div>
          <div className="widget-list">
            {events && events.slice(0, 3).map((evt) => (
              <div key={evt.id} className="widget-item">
                <div className="widget-item-title">{evt.title}</div>
                <div className="widget-item-meta">{evt.date} · {evt.attendees} attending</div>
              </div>
            ))}
          </div>
          <Link to="/events" className="widget-more-link">
            browse campus calendar →
          </Link>
        </div>

        {/* Quick Services Links */}
        <div className="card widget-card services-widget">
          <div className="widget-header">
            <span className="widget-title">quick actions</span>
          </div>
          <div className="quick-service-pills">
            <Link to="/canteen" className="quick-pill">
              <UtensilsIcon size={14} />
              <span>order food</span>
            </Link>
            <Link to="/support" className="quick-pill">
              <ShieldIcon size={14} />
              <span>support desk</span>
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
