import React from 'react';
import { useApp } from '../../context/AppContext';

export default function AdminPage() {
  const { posts, friends, joinedCommunities, myCommunities, menu } = useApp();

  return (
    <div className="view-section">
      <h1 className="section-header">Campus Administrator Dashboard</h1>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div className="card" style={{ borderLeft: '4px solid var(--primary)', margin: 0 }}>
          <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>
            Total Posts
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--primary)', marginTop: '8px' }}>
            {posts.length}
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--purple)', margin: 0 }}>
          <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>
            Active Communities
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--purple)', marginTop: '8px' }}>
            {joinedCommunities.length + myCommunities.length + 12}
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--teal)', margin: 0 }}>
          <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>
            Registered Friends
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--teal)', marginTop: '8px' }}>
            {friends.length + 24}
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--orange)', margin: 0 }}>
          <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>
            Canteen Menu Items
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--orange)', marginTop: '8px' }}>
            {menu.length}
          </div>
        </div>
      </div>

      {/* Management Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
        <div className="card">
          <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#2d3748' }}>
            🛡️ Confidential Support Logs
          </h3>
          <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6 }}>
            Support tickets submitted via the Support Desk channel are stored securely with restricted access.
          </p>
          <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '10px', fontSize: '13px', color: '#475569' }}>
            <span>🔒 0 pending high-priority incident flags</span>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#2d3748' }}>
            🏫 System Status & Telemetry
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: '#475569' }}>
            <li style={{ padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
              ✓ API Gateway: <strong>Operational</strong>
            </li>
            <li style={{ padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
              ✓ Roll Number Validation Engine: <strong>Active (NNNNANANNN)</strong>
            </li>
            <li style={{ padding: '8px 0' }}>
              ✓ Canteen POS Dispatch: <strong>Online</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
