import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ThumbsUpIcon, ChevronDownIcon } from '../Icons/Icons';

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
            style={{ backgroundColor: comment.avatarColor || '#2563EB' }}
          >
            {comment.authorInitial || (comment.author ? comment.author.charAt(0).toUpperCase() : 'S')}
          </div>
          <span className="comment-author-name">{comment.author}</span>
        </div>
        <div className="comment-time">{comment.time}</div>
      </div>

      <div className="comment-content">{comment.text}</div>

      <div className="comment-actions">
        <button
          className={`comment-action-btn ${comment.liked ? 'liked' : ''}`}
          onClick={() => likeComment(postId, comment.id)}
          aria-label="Like comment"
        >
          <ThumbsUpIcon size={13} filled={comment.liked} />
          <span>{comment.likes > 0 ? comment.likes : 'Like'}</span>
        </button>

        <button
          className="comment-action-btn"
          onClick={() => setShowReplyForm((prev) => !prev)}
        >
          <span>Reply</span>
        </button>
      </div>

      {showReplyForm && (
        <div className="reply-form active">
          <div className="reply-input-row">
            <textarea
              className="comment-input"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Replying to ${comment.author}...`}
              rows={2}
              autoFocus
            />
            <button
              className="comment-submit-btn"
              onClick={handleSendReply}
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
            <ChevronDownIcon
              size={14}
              style={{
                transform: comment.showReplies ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s',
              }}
            />
            <span>
              {comment.showReplies
                ? 'Hide replies'
                : `View ${comment.replies.length} ${comment.replies.length === 1 ? 'reply' : 'replies'}`}
            </span>
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
