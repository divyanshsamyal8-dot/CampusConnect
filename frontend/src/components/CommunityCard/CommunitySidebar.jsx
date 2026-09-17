import React from 'react';
import { useApp } from '../../context/AppContext';

export default function CommunitySidebar() {
  const {
    discoveryPool,
    joinedCommunities,
    myCommunities,
    currentGroup,
    joinGroup,
    setCurrentGroup,
  } = useApp();

  const availableDiscovery = discoveryPool.filter(
    (g) => !joinedCommunities.includes(g) && !myCommunities.includes(g)
  );

  return (
    <div className="comm-sidebar">
      <div className="comm-section-title">
        <span>🌟</span> JOINED COMMUNITIES
      </div>
      <div id="joined-list">
        {joinedCommunities.map((g) => (
          <div
            key={g}
            className={`group-item ${currentGroup === g ? 'active' : ''}`}
            onClick={() => setCurrentGroup(g)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  background: 'var(--gradient-1)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '16px',
                }}
              >
                👥
              </div>
              <span># {g}</span>
            </div>
            <span className="tag tag-joined">Joined</span>
          </div>
        ))}
        {joinedCommunities.length === 0 && (
          <div style={{ fontSize: '13px', color: '#94a3b8', fontStyle: 'italic', padding: '10px' }}>
            No joined communities yet.
          </div>
        )}
      </div>

      <div className="comm-section-title">
        <span>👑</span> MY COMMUNITIES
      </div>
      <div id="my-comm-list">
        {myCommunities.map((g) => (
          <div
            key={g}
            className={`group-item ${currentGroup === g ? 'active' : ''}`}
            onClick={() => setCurrentGroup(g)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  background: 'var(--gradient-3)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '16px',
                }}
              >
                👑
              </div>
              <span># {g}</span>
            </div>
            <span className="tag tag-my">Owner</span>
          </div>
        ))}
        {myCommunities.length === 0 && (
          <div style={{ fontSize: '13px', color: '#94a3b8', fontStyle: 'italic', padding: '10px' }}>
            You haven't created any groups yet.
          </div>
        )}
      </div>

      <hr style={{ border: 0, borderTop: '1px solid #e2e8f0', margin: '20px 0' }} />

      <div className="comm-section-title">
        <span>🔍</span> DISCOVER NEW
      </div>
      <div id="discovery-list">
        {availableDiscovery.map((g) => (
          <div key={g} className="group-item" onClick={() => joinGroup(g)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  background: 'var(--gradient-4)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '16px',
                }}
              >
                👥
              </div>
              <span># {g}</span>
            </div>
            <button
              className="add-to-cart"
              style={{ padding: '6px 15px', fontSize: '12px' }}
              onClick={(e) => {
                e.stopPropagation();
                joinGroup(g);
              }}
            >
              Join
            </button>
          </div>
        ))}
        {availableDiscovery.length === 0 && (
          <div style={{ fontSize: '13px', color: '#94a3b8', fontStyle: 'italic', padding: '10px' }}>
            You've joined all available communities!
          </div>
        )}
      </div>
    </div>
  );
}
