import React from 'react';

export default function NotificationBadge({ count, style = {} }) {
  if (!count || count <= 0) return null;

  return (
    <div className="notification-badge" style={style}>
      {count}
    </div>
  );
}
