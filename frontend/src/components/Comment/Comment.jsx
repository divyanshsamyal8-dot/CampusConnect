import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function Comment({ comment, postId }) {
  const { likeComment, addComment, toggleReplies } = useApp();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    addComment(postId, comment.id, replyText);
    setReplyText('');
    setShowReplyForm(false);
  };

  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <div className={`comment ${comment.isReply ? 'reply' : ''}`} id={`comment-${comment.id}`}>
      <div className="comment-header">
        <div className="comment-author">
          <div
            className="comment-author-avatar"
            style={{ background: comment.avatarColor || 'var(--gradient-2)' }}
          >
            {comment.authorInitial || (comment.author ? comment.author.charAt(0).toUpperCase() : 'S')}
          </div>
          <span>{comment.author}</span>
        </div>
        <div className="comment-time">{comment.time}</div>
      </div>

      <div className="comment-content">{comment.text}</div>

      <div className="comment-actions">
        <button
          className={`action-btn ${comment.liked ? 'active' : ''}`}
          onClick={() => likeComment(postId, comment.id)}
          style={{ padding: '4px 10px', fontSize: '12px' }}
        >
          <span>👍</span> {comment.likes > 0 ? comment.likes : 'Like'}
        </button>

        <button
          className="reply-btn"
          onClick={() => setShowReplyForm((prev) => !prev)}
        >
          <span>↩️</span> Reply
        </button>
      </div>

      {showReplyForm && (
        <div className="reply-form active">
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
            <textarea
              className="comment-input"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Replying to ${comment.author}...`}
              rows={2}
              style={{ minHeight: '45px', fontSize: '13px' }}
              autoFocus
            />
            <button
              className="comment-submit-btn"
              onClick={handleSendReply}
              style={{ padding: '8px 16px', fontSize: '13px', alignSelf: 'flex-start' }}
            >
              Reply
            </button>
          </div>
        </div>
      )}

      {hasReplies && (
        <div className="replies-wrapper">
          <button
            className="view-replies-btn"
            onClick={() => toggleReplies(postId, comment.id)}
          >
            <span>{comment.showReplies ? '▼' : '▶'}</span>
            {comment.showReplies
              ? 'Hide replies'
              : `View ${comment.replies.length} ${comment.replies.length === 1 ? 'reply' : 'replies'}`}
          </button>

          {comment.showReplies && (
            <div className="replies-section">
              {comment.replies.map((reply) => (
                <Comment key={reply.id} comment={reply} postId={postId} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
