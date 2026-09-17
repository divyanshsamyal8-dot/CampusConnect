import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { validateRollNumber } from '../../utils/helpers';
import '../../styles/friends.css';

export default function FriendsPage() {
  const navigate = useNavigate();
  const {
    currentUser,
    friends,
    friendRequests,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    removeFriend,
    setActiveDMRecipient,
  } = useApp();

  const [searchRoll, setSearchRoll] = useState('');
  const [isValidRoll, setIsValidRoll] = useState(false);

  const handleRollInput = (e) => {
    const val = e.target.value.toUpperCase();
    setSearchRoll(val);
    setIsValidRoll(validateRollNumber(val));
  };

  const handleSendRequest = () => {
    if (!isValidRoll) {
      alert('Please enter a valid roll number (Format: NNNNANANNN)');
      return;
    }
    const success = sendFriendRequest(searchRoll);
    if (success) {
      setSearchRoll('');
      setIsValidRoll(false);
    }
  };

  const handleMessageFriend = (friend) => {
    setActiveDMRecipient(friend);
    navigate('/chat');
  };

  const pendingRequests = friendRequests.filter(
    (req) => req.to === currentUser.rollNumber && req.status === 'pending'
  );

  return (
    <div className="view-section">
      <h1 className="section-header">Friends System</h1>

      {/* Add Friends by Roll Number */}
      <div className="card friend-search-card">
        <h3 style={{ marginTop: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>🔍</span> Add Friends by Roll Number
        </h3>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
          <div
            style={{ flex: 1 }}
            className={`roll-input-container ${searchRoll ? (isValidRoll ? 'valid' : 'invalid') : ''}`}
          >
            <input
              type="text"
              placeholder="Enter Roll Number (NNNNAANNNN)"
              maxLength={10}
              value={searchRoll}
              onChange={handleRollInput}
              style={{ marginBottom: 0 }}
            />
          </div>
          <button
            className="btn"
            onClick={handleSendRequest}
            disabled={!isValidRoll}
          >
            <span>➕</span> Send Request
          </button>
        </div>

        <div className="roll-format-hint">
          Format: NNNNANANNN (Example: 2025A7R025)
        </div>
      </div>

      <div className="friends-container">
        {/* Pending Requests */}
        <div className="card">
          <h3 style={{ marginTop: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>📨</span> Friend Requests
            <span
              className="notification-badge"
              style={{ position: 'static', marginLeft: '10px' }}
            >
              {pendingRequests.length}
            </span>
          </h3>

          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {pendingRequests.length > 0 ? (
              pendingRequests.map((request) => (
                <div key={request.id} className="friend-item">
                  <div
                    className="friend-avatar"
                    style={{ background: 'var(--gradient-2)' }}
                  >
                    {request.fromName ? request.fromName.charAt(0).toUpperCase() : 'S'}
                  </div>
                  <div className="friend-info">
                    <div className="friend-name">{request.fromName}</div>
                    <div className="friend-roll">{request.from}</div>
                    <div className="friend-status status-pending">Pending Request</div>
                  </div>
                  <div className="friend-actions">
                    <button
                      className="friend-action-btn accept"
                      onClick={() => acceptFriendRequest(request.id)}
                    >
                      <span>✓</span> Accept
                    </button>
                    <button
                      className="friend-action-btn decline"
                      onClick={() => declineFriendRequest(request.id)}
                    >
                      <span>✗</span> Decline
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-friends-message">
                <div className="icon">📭</div>
                <div>No pending friend requests</div>
              </div>
            )}
          </div>
        </div>

        {/* My Friends List */}
        <div className="card">
          <h3 style={{ marginTop: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>👥</span> My Friends
            <span style={{ marginLeft: 'auto', fontSize: '14px', color: '#64748b', fontWeight: 'normal' }}>
              <span>{friends.length}</span> friends
            </span>
          </h3>

          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {friends.length > 0 ? (
              friends.map((friend) => (
                <div key={friend.rollNumber} className="friend-item">
                  <div
                    className="friend-avatar"
                    style={{ background: friend.avatarColor || 'var(--gradient-1)' }}
                  >
                    {friend.name ? friend.name.charAt(0).toUpperCase() : 'S'}
                  </div>
                  <div className="friend-info">
                    <div className="friend-name">{friend.name}</div>
                    <div className="friend-roll">{friend.rollNumber}</div>
                    <div className="friend-status status-friends">Friends</div>
                  </div>
                  <div className="friend-actions">
                    <button
                      className="friend-action-btn message"
                      onClick={() => handleMessageFriend(friend)}
                    >
                      <span>💬</span> Message
                    </button>
                    <button
                      className="friend-action-btn remove"
                      onClick={() => removeFriend(friend.rollNumber)}
                    >
                      <span>✗</span> Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-friends-message">
                <div className="icon">👤</div>
                <div>No friends yet. Send some requests!</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
