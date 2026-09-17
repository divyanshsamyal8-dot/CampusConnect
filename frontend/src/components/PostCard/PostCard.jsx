import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import CommentList from '../Comment/CommentList';
import '../../styles/posts.css';

export default function PostCard({ post }) {
  const {
    currentUser,
    likePost,
    getFriendshipStatus,
    sendFriendRequest,
  } = useApp();

  const [commentsExpanded, setCommentsExpanded] = useState(false);

  const handleShare = () => {
    const shareUrl = `${window.location.origin}#post-${post.id}`;
    if (navigator.share) {
      navigator.share({
        title: `Post by ${post.author}`,
        text: post.text.substring(0, 100) + '...',
        url: shareUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Post link copied to clipboard!');
    }
  };

  const friendshipStatus = post.authorRoll ? getFriendshipStatus(post.authorRoll) : 'none';
  const canAddFriend =
    post.authorRoll &&
    post.authorRoll !== currentUser.rollNumber &&
    !post.isAnon;

  return (
    <div className="card post-card" id={`post-${post.id}`}>
      <div className="post-header">
        <div className="post-author">
          <div
            className="author-avatar"
            style={{ background: post.avatarColor || 'var(--gradient-1)' }}
          >
            {post.authorInitial || (post.author ? post.author.charAt(0).toUpperCase() : 'A')}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '16px' }}>{post.author}</div>
            <div className="post-meta">
              {post.date} at {post.time}
              {post.tag && <span className="post-tag">{post.tag}</span>}
            </div>
            {post.authorRoll && (
              <div style={{ marginTop: '5px', fontSize: '13px', color: '#64748b' }}>
                <strong>Roll:</strong>{' '}
                <span
                  style={{
                    fontFamily: 'monospace',
                    background: '#f8fafc',
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}
                >
                  {post.authorRoll}
                </span>
              </div>
            )}
          </div>
        </div>

        {canAddFriend && (
          <div style={{ marginTop: '10px' }}>
            {friendshipStatus === 'friends' ? (
              <button className="add-friend-btn friends" disabled>
                <span>✓</span> Friends ✓
              </button>
            ) : friendshipStatus === 'pending' ? (
              <button className="add-friend-btn pending" disabled>
                <span>👤</span> Request Sent
              </button>
            ) : (
              <button
                className="add-friend-btn"
                onClick={() => sendFriendRequest(post.authorRoll, post.author)}
              >
                <span>👤</span> Add Friend
              </button>
            )}
          </div>
        )}
      </div>

      <div className="post-content">{post.text}</div>

      <div className="post-actions">
        <button
          className={`action-btn ${post.liked ? 'active' : ''}`}
          onClick={() => likePost(post.id)}
        >
          <span>👍</span> Like <span id={`like-count-${post.id}`}>{post.likes}</span>
        </button>

        <button
          className={`action-btn ${commentsExpanded ? 'active' : ''}`}
          onClick={() => setCommentsExpanded((prev) => !prev)}
        >
          <span>💬</span> Comments <span id={`comment-count-${post.id}`}>{post.comments}</span>
        </button>

        <button className="action-btn" onClick={handleShare}>
          <span>🔄</span> Share
        </button>
      </div>

      {commentsExpanded && <CommentList postId={post.id} />}
    </div>
  );
}
