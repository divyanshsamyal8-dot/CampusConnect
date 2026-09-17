import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import CommunitySidebar from '../../components/CommunityCard/CommunitySidebar';
import CommunityChat from '../../components/CommunityCard/CommunityChat';
import '../../styles/communities.css';

export default function CommunitiesPage() {
  const { currentGroup, createNewGroup } = useApp();
  const [newGroupName, setNewGroupName] = useState('');

  const handleCreate = () => {
    if (!newGroupName.trim()) return;
    createNewGroup(newGroupName);
    setNewGroupName('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCreate();
    }
  };

  return (
    <div className="view-section">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '25px',
          flexWrap: 'wrap',
          gap: '15px',
        }}
      >
        <h1 className="section-header" style={{ marginBottom: 0 }}>
          Communities
        </h1>
        <div style={{ display: 'flex', gap: '15px' }}>
          <input
            type="text"
            placeholder="Name your group..."
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ margin: 0, width: '220px' }}
          />
          <button className="btn btn-orange" onClick={handleCreate}>
            <span>✨</span> Create
          </button>
        </div>
      </div>

      <div className="comm-container">
        <CommunitySidebar />

        {currentGroup ? (
          <CommunityChat groupName={currentGroup} />
        ) : (
          <div className="no-group-placeholder">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '60px', marginBottom: '20px' }}>👥</div>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#64748b',
                  marginBottom: '10px',
                }}
              >
                Select a Community
              </div>
              <div style={{ color: '#94a3b8' }}>
                Choose a group from the sidebar to start chatting!
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
