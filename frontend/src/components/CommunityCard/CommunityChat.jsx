import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import CommunityMembers from './CommunityMembers';

export default function CommunityChat({ groupName }) {
  const {
    myCommunities,
    groupChats,
    leaveGroup,
    deleteGroup,
    sendGroupMessage,
  } = useApp();

  const [messageInput, setMessageInput] = useState('');
  const [showMembers, setShowMembers] = useState(false);
  const messagesEndRef = useRef(null);

  const isOwner = myCommunities.includes(groupName);
  const messages = groupChats[groupName] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!messageInput.trim()) return;
    sendGroupMessage(groupName, messageInput);
    setMessageInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-area card" style={{ padding: 0, overflow: 'hidden' }}>
      <div
        style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              background: 'var(--gradient-2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
            }}
          >
            👥
          </div>
          <span
            style={{
              fontWeight: 'bold',
              color: 'var(--purple)',
              fontSize: '20px',
            }}
          >
            # {groupName}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {isOwner && (
            <button
              className="btn btn-danger"
              style={{ padding: '10px 20px' }}
              onClick={() => deleteGroup(groupName)}
            >
              <span>🗑️</span> Delete
            </button>
          )}

          <button
            className="btn btn-secondary"
            style={{ padding: '10px 20px' }}
            onClick={() => leaveGroup(groupName)}
          >
            <span>🚪</span> Leave
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`bubble ${m.sender === 'System' || m.sender === 'Community Member' ? 'received' : 'comm-sent'}`}
          >
            {m.sender && m.sender !== 'System' && (
              <div style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', opacity: 0.8 }}>
                {m.sender}
              </div>
            )}
            <div>{m.msg}</div>
            <div className="message-time">{m.time}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {showMembers && <CommunityMembers groupName={groupName} />}

      <div
        style={{
          padding: '20px',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          gap: '15px',
        }}
      >
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message group..."
          style={{ margin: 0 }}
        />
        <button
          className="btn"
          onClick={handleSend}
          style={{ background: 'var(--gradient-2)' }}
        >
          <span>📨</span> Send
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setShowMembers((prev) => !prev)}
        >
          <span>👥</span> {showMembers ? 'Hide Members' : 'Members'}
        </button>
      </div>
    </div>
  );
}
