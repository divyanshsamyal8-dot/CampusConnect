import React from 'react';
import { useApp } from '../../context/AppContext';
import EventCard from '../../components/EventCard/EventCard';

export default function EventsPage() {
  const { events } = useApp();

  return (
    <div className="view-section">
      <h1 className="section-header">Campus Events</h1>

      <p style={{ color: '#64748b', fontSize: '15px', marginTop: '-15px', marginBottom: '25px' }}>
        Discover and RSVP to upcoming university competitions, cultural festivals, sports matches, and student workshops.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
