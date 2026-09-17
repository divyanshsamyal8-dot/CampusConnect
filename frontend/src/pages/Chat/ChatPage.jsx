import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import '../../styles/chat.css';

export default function ChatPage() {
  const {
    friends,
    activeDMRecipient,
    setActiveDMRecipient,
    sendDM,
  } = useApp();

  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);

  // Default select first friend if not selected
  useEffect(() => {
    if (!activeDMRecipient && friends.length > 0) {
      setActiveDMRecipient(friends[0]);
    }
  }, [friends, activeDMRecipient, setActiveDMRecipient]);

  // Sync activeDMRecipient with latest state in friends array
  const currentFriend = activeDMRecipient
    ? friends.find((f) => f.rollNumber === activeDMRecipient.rollNumber) || activeDMRecipient
    : null;

  const dmHistory = currentFriend?.dmHistory || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [dmHistory]);

  const handleSend = () => {
    if (!messageText.trim() || !currentFriend) return;
    sendDM(currentFriend.rollNumber, messageText);
    setMessageText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="view-section">
      <h1 className="section-header">Private Messages</h1>

      <div className="messenger-layout">
        {/* User list */}
        <div className="user-list">
          {friends.length > 0 ? (
            friends.map((friend) => (
              <div
                key={friend.rollNumber}
                className={`user-item ${currentFriend?.rollNumber === friend.rollNumber ? 'active' : ''}`}
                onClick={() => setActiveDMRecipient(friend)}
              >
                <div
                  className="user-avatar avatar-student"
                  style={{ background: friend.avatarColor || 'var(--gradient-2)' }}
                >
                  {friend.name ? friend.name.charAt(0).toUpperCase() : 'S'}
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>{friend.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>{friend.rollNumber}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-friends-message" style={{ padding: '40px 20px', textAlign: 'center' }}>
              <div className="icon">💬</div>
              <div>No friends yet</div>
              <div style={{ fontSize: '14px', marginTop: '10px', color: '#94a3b8' }}>
                Add friends to start messaging!
              </div>
            </div>
          )}
        </div>

        {/* Chat Area */}
        <div className="chat-area">
          <div className="chat-header">
            <span>{currentFriend ? `Chat with ${currentFriend.name}` : 'Select a friend to start chatting'}</span>
            {currentFriend && (
              <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 'normal', fontFamily: 'monospace' }}>
                {currentFriend.rollNumber}
              </span>
            )}
          </div>

          <div className="chat-messages">
            {currentFriend ? (
              dmHistory.length > 0 ? (
                dmHistory.map((msg, idx) => {
                  if (msg.sender === 'system') {
                    return (
                      <div
                        key={idx}
                        className="bubble received"
                        style={{
                          alignSelf: 'center',
                          maxWidth: '90%',
                          background: '#f1f5f9',
                          color: '#64748b',
                          textAlign: 'center',
                        }}
                      >
                        {msg.text}
                      </div>
                    );
                  }

                  const isSentByMe = msg.sender !== currentFriend.name;

                  return (
                    <div
                      key={idx}
                      className={`bubble ${isSentByMe ? 'sent' : 'received'}`}
                    >
                      <div>{msg.text}</div>
                      <div className="message-time">{msg.time}</div>
                    </div>
                  );
                })
              ) : (
                <div
                  className="bubble received"
                  style={{
                    alignSelf: 'center',
                    maxWidth: '90%',
                    background: '#f1f5f9',
                    color: '#64748b',
                    textAlign: 'center',
                  }}
                >
                  Start your conversation with {currentFriend.name}!
                </div>
              )
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
                Choose a conversation from the left sidebar.
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-bar">
            <input
              type="text"
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={!currentFriend}
            />
            <button
              className="btn"
              onClick={handleSend}
              disabled={!currentFriend || !messageText.trim()}
            >
              <span>📨</span> Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
