import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { validateRollNumber } from '../../utils/helpers';
import PostCard from '../../components/PostCard/PostCard';

export default function ProfilePage() {
  const {
    currentUser,
    updateUserProfile,
    friends,
    joinedCommunities,
    myCommunities,
    posts,
  } = useApp();

  const [name, setName] = useState(currentUser.name || 'Student');
  const [roll, setRoll] = useState(currentUser.rollNumber || '');
  const [isValidRoll, setIsValidRoll] = useState(validateRollNumber(currentUser.rollNumber));
  const [savedMessage, setSavedMessage] = useState(false);

  const handleRollChange = (val) => {
    const upper = val.toUpperCase();
    setRoll(upper);
    setIsValidRoll(validateRollNumber(upper));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (roll && !isValidRoll) {
      alert('Please enter a valid roll number (Format: NNNNANANNN)');
      return;
    }

    updateUserProfile(name, roll);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2500);
  };

  const myPosts = posts.filter(
    (p) =>
      (!p.isAnon && p.authorRoll && p.authorRoll === currentUser.rollNumber) ||
      (!p.isAnon && p.author === currentUser.name)
  );

  return (
    <div className="view-section">
      <h1 className="section-header">My Profile</h1>

      {/* Profile Card */}
      <div className="card" style={{ display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: currentUser.avatarColor || 'var(--gradient-1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '44px',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: 'var(--shadow)',
          }}
        >
          {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'S'}
        </div>

        <div style={{ flex: 1 }}>
          <h2 style={{ margin: '0 0 5px 0', fontSize: '26px', color: '#2d3748' }}>
            {currentUser.name || 'Student'}
          </h2>
          <div style={{ fontSize: '15px', color: '#64748b', marginBottom: '15px' }}>
            Roll Number:{' '}
            <span
              style={{
                fontFamily: 'monospace',
                background: '#f1f5f9',
                padding: '4px 10px',
                borderRadius: '6px',
                color: '#2d3748',
                fontWeight: 600,
              }}
            >
              {currentUser.rollNumber || 'Not set'}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--primary)' }}>
                {friends.length}
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Friends</div>
            </div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--purple)' }}>
                {joinedCommunities.length + myCommunities.length}
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Communities</div>
            </div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--orange)' }}>
                {myPosts.length}
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Posts Created</div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="card">
        <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#2d3748' }}>
          Edit Profile Information
        </h3>

        <form onSubmit={handleSave}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '14px' }}>
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '14px' }}>
                Institutional Roll Number
              </label>
              <div className={`roll-input-container ${roll ? (isValidRoll ? 'valid' : 'invalid') : ''}`}>
                <input
                  type="text"
                  value={roll}
                  onChange={(e) => handleRollChange(e.target.value)}
                  placeholder="Format: 2025A7R025"
                  maxLength={10}
                />
              </div>
              <div className="roll-format-hint">Format: NNNNANANNN</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' }}>
            <button type="submit" className="btn">
              <span>💾</span> Save Changes
            </button>
            {savedMessage && (
              <span style={{ color: '#10b981', fontWeight: 600, fontSize: '14px' }}>
                ✓ Profile saved successfully!
              </span>
            )}
          </div>
        </form>
      </div>

      {/* My Posts */}
      <div style={{ marginTop: '30px' }}>
        <h2 style={{ fontSize: '22px', color: '#2d3748', marginBottom: '20px' }}>
          My Posts ({myPosts.length})
        </h2>

        {myPosts.length > 0 ? (
          myPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
            You haven't posted publicly yet.
          </div>
        )}
      </div>
    </div>
  );
}
