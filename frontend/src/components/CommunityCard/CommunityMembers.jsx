import React from 'react';
import { useApp } from '../../context/AppContext';

export default function CommunityMembers({ groupName }) {
  const {
    communityMembers,
    getFriendshipStatus,
    sendFriendRequest,
  } = useApp();

  const members = communityMembers[groupName] || [];

  return (
    <div className="community-members">
      <div className="members-header">
        <span>👥</span> Group Members (<span>{members.length}</span>)
      </div>
      <div className="members-grid">
        {members.map((member, idx) => {
          const friendshipStatus = getFriendshipStatus(member.rollNumber);
          const isPending = friendshipStatus === 'pending';
          const isFriend = friendshipStatus === 'friends';
          const isDisabled = isPending || isFriend;

          return (
            <div key={member.rollNumber || idx} className="member-item">
              <div
                className="member-avatar"
                style={{ background: member.avatarColor || 'var(--gradient-1)' }}
              >
                {member.name ? member.name.charAt(0).toUpperCase() : 'M'}
              </div>
              <div className="member-info">
                <div className="member-name">{member.name}</div>
                <div className="member-roll">{member.rollNumber}</div>
              </div>
              <button
                className={`member-action-btn ${isFriend ? 'friends' : ''} ${isPending ? 'pending' : ''}`}
                onClick={() => sendFriendRequest(member.rollNumber, member.name)}
                disabled={isDisabled}
              >
                {isFriend ? 'Friends ✓' : isPending ? 'Request Sent' : 'Add Friend'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
