import React from 'react';
import { useApp } from '../../context/AppContext';

export default function AnnouncementsPage() {
  const { announcements } = useApp();

  return (
    <div className="view-section">
      <h1 className="section-header">Campus Announcements</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {announcements.map((ann) => (
          <div key={ann.id} className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span
                className="tag"
                style={{
                  background:
                    ann.priority === 'High'
                      ? 'var(--gradient-3)'
                      : ann.priority === 'Medium'
                      ? 'var(--gradient-1)'
                      : 'var(--gradient-4)',
                  color: 'white',
                }}
              >
                {ann.priority} Priority
              </span>
              <span style={{ fontSize: '13px', color: '#64748b' }}>📅 {ann.date}</span>
            </div>

            <h3 style={{ margin: '5px 0 10px 0', fontSize: '20px', color: '#2d3748' }}>
              {ann.title}
            </h3>

            <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>
              Issued by: <strong>{ann.sender}</strong>
            </div>

            <p style={{ margin: 0, color: '#475569', lineHeight: 1.6 }}>
              {ann.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
