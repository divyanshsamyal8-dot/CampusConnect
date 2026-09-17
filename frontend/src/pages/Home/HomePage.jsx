import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import PostCard from '../../components/PostCard/PostCard';
import { validateRollNumber } from '../../utils/helpers';
import '../../styles/posts.css';

export default function HomePage() {
  const {
    currentUser,
    updateUserProfile,
    posts,
    searchQuery,
    setSearchQuery,
    addPost,
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
    <div className="view-section">
      <h1 className="section-header">Global Feed</h1>

      {/* Search Bar */}
      <div className="card feed-search-container">
        <div className="search-input-wrapper">
          <div className="search-icon">🔍</div>
          <input
            type="text"
            placeholder="Search posts by content or tag (e.g., 'study', 'sports', 'workshop')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            className="btn btn-secondary"
            onClick={() => setSearchQuery('')}
            style={{ padding: '10px 20px' }}
          >
            <span>🔄</span> Clear Search
          </button>
          <div
            style={{
              fontSize: '13px',
              color: searchQuery ? '#3b82f6' : '#64748b',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <span>🔍</span>{' '}
            {searchQuery
              ? `Found ${filteredPosts.length} result${filteredPosts.length !== 1 ? 's' : ''} for "${searchQuery}"`
              : 'Showing all posts'}
          </div>
        </div>
      </div>

      {/* Post Creation Form */}
      <div className="card">
        <div className="post-creation-row">
          <div>
            <input
              type="text"
              placeholder="Enter your name..."
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onBlur={() => updateUserProfile(userName, userRoll)}
            />
          </div>
          <div className={`roll-input-container ${userRoll ? (isRollValid ? 'valid' : 'invalid') : ''}`}>
            <input
              type="text"
              placeholder="Your Roll Number (NNNNAANNNN)"
              maxLength={10}
              value={userRoll}
              onChange={(e) => handleRollChange(e.target.value)}
              onBlur={() => updateUserProfile(userName, userRoll)}
            />
          </div>
          <div>
            <select value={tag} onChange={(e) => setTag(e.target.value)}>
              <option value="">Select a tag...</option>
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

        <div className="roll-format-hint">
          Format: NNNNANANNN (Example: 2025A7R025) - N=Number, A=Alphabet
        </div>

        <textarea
          placeholder="Share a post or a question with the campus community..."
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button className="btn" onClick={() => handleCreatePost(false)}>
            <span>📤</span> Post Publicly
          </button>
          <button className="btn btn-secondary" onClick={() => handleCreatePost(true)}>
            <span>👤</span> Post Anonymously
          </button>
        </div>
      </div>

      {/* Posts List */}
      <div id="post-container">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>🔍</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#64748b', marginBottom: '10px' }}>
              No posts found
            </div>
            <div style={{ color: '#94a3b8' }}>
              {searchQuery ? `No posts match "${searchQuery}"` : 'Be the first to post!'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
