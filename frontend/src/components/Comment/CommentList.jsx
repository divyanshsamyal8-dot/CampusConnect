import React, { useState } from 'react';
import Comment from './Comment';
import { useApp } from '../../context/AppContext';
import '../../styles/comments.css';

export default function CommentList({ postId }) {
  const { comments, addComment } = useApp();
  const [commentText, setCommentText] = useState('');
  const [visibleLimit, setVisibleLimit] = useState(3);

  const postComments = comments[postId] || [];

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    addComment(postId, null, commentText);
    setCommentText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  const displayedComments = postComments.slice(0, visibleLimit);
  const remainingCount = postComments.length - visibleLimit;

  return (
    <div className="comments-section" id={`comments-${postId}`}>
      <div className="comments-count">
        <span>💬</span> {postComments.length} {postComments.length === 1 ? 'Comment' : 'Comments'}
      </div>

      <div className="comments-list">
        {displayedComments.length > 0 ? (
          displayedComments.map((comment) => (
            <Comment key={comment.id} comment={comment} postId={postId} />
          ))
        ) : (
          <div className="no-comments">No comments yet. Be the first to comment!</div>
        )}

        {remainingCount > 0 && (
          <div className="load-more-comments">
            <button
              className="load-more-btn"
              onClick={() => setVisibleLimit((prev) => prev + 5)}
            >
              Load {remainingCount} more comments
            </button>
          </div>
        )}
      </div>

      <div className="new-comment-form">
        <div className="comment-input-wrapper">
          <textarea
            className="comment-input"
            id={`comment-input-${postId}`}
            placeholder="Write a comment..."
            rows={2}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button className="comment-submit-btn" onClick={handleAddComment}>
          Post
        </button>
      </div>
    </div>
  );
}
