import React from 'react';
import { useApp } from '../../context/AppContext';

export default function EventCard({ event }) {
  const { toggleEventRegistration } = useApp();

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          className="tag tag-joined"
          style={{ fontSize: '11px', padding: '6px 12px' }}
        >
          {event.category}
        </span>
        <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
          📅 {event.date}
        </span>
      </div>

      <h3 style={{ margin: '5px 0', fontSize: '20px', color: '#2d3748' }}>
        {event.title}
      </h3>

      <div style={{ fontSize: '14px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span>📍</span> {event.location}
      </div>

      <p style={{ margin: '5px 0 15px 0', color: '#475569', lineHeight: 1.6 }}>
        {event.description}
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '15px', borderTop: '1px solid #f1f5f9' }}>
        <span style={{ fontSize: '13px', color: '#64748b' }}>
          👥 <strong>{event.attendees}</strong> students attending
        </span>

        <button
          className={`btn ${event.registered ? 'btn-secondary' : 'btn-success'}`}
          onClick={() => toggleEventRegistration(event.id)}
          style={{ padding: '8px 20px', minWidth: '120px' }}
        >
          {event.registered ? '✓ Registered' : 'RSVP Now'}
        </button>
      </div>
    </div>
  );
}
