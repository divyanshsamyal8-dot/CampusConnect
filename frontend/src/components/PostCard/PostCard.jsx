import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import CommentList from '../Comment/CommentList';
import {
  ThumbsUpIcon,
  MessageCircleIcon,
  Share2Icon,
  UserPlusIcon,
  UserCheckIcon,
  CheckIcon,
} from '../Icons/Icons';
import '../../styles/posts.css';

// Helper to determine clean borderless pastel tag styling
function getTagClass(tag = '') {
  const lower = tag.toLowerCase();
  if (lower.includes('study')) return 'pastel-tag-purple';
  if (lower.includes('social') || lower.includes('music') || lower.includes('creative')) return 'pastel-tag-pink';
  if (lower.includes('sports') || lower.includes('event')) return 'pastel-tag-amber';
  if (lower.includes('tech') || lower.includes('career') || lower.includes('science')) return 'pastel-tag-blue';
  if (lower.includes('question') || lower.includes('idea')) return 'pastel-tag-teal';
  return 'pastel-tag-default';
}

export default function PostCard({ post }) {
  const {
    currentUser,
    likePost,
    getFriendshipStatus,
    sendFriendRequest,
  } = useApp();

  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

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
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2000);
    }
  };

  const friendshipStatus = post.authorRoll ? getFriendshipStatus(post.authorRoll) : 'none';
  const canAddFriend =
    post.authorRoll &&
    post.authorRoll !== currentUser.rollNumber &&
    !post.isAnon;

  return (
    <article className="card post-card" id={`post-${post.id}`}>
      {/* Post Top Header */}
      <div className="post-header">
        <div className="post-author-row">
          <div
            className="author-avatar"
            style={{
              backgroundColor: post.isAnon
                ? '#71717A'
                : post.avatarColor || '#2563EB',
            }}
          >
            {post.isAnon ? 'A' : (post.authorInitial || (post.author ? post.author.charAt(0).toUpperCase() : 'S'))}
          </div>

          <div className="author-meta-col">
            <div className="author-name-row">
              <span className="author-name">{post.author}</span>

              {!post.isAnon && post.authorRoll && (
                <span className="author-roll-badge">{post.authorRoll}</span>
              )}

              {post.tag && (
                <span className={`borderless-pastel-tag ${getTagClass(post.tag)}`}>
                  {post.tag}
                </span>
              )}
            </div>

            <div className="post-timestamp">
              {post.date} · {post.time}
            </div>
          </div>
        </div>

        {/* Light-teal Add Friend action */}
        {canAddFriend && (
          <div className="post-friend-action">
            {friendshipStatus === 'friends' ? (
              <button className="add-friend-btn friends" disabled>
                <UserCheckIcon size={14} />
                <span>Connected</span>
              </button>
            ) : friendshipStatus === 'pending' ? (
              <button className="add-friend-btn pending" disabled>
                <CheckIcon size={14} />
                <span>Request Sent</span>
              </button>
            ) : (
              <button
                className="add-friend-btn"
                onClick={() => sendFriendRequest(post.authorRoll, post.author)}
              >
                <UserPlusIcon size={14} />
                <span>Add Friend</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Post Body Content */}
      <div className="post-content">{post.text}</div>

      {/* Thin Outline Action Row */}
      <div className="post-actions">
        <button
          className={`action-btn ${post.liked ? 'liked' : ''}`}
          onClick={() => likePost(post.id)}
          aria-label="Like post"
        >
          <ThumbsUpIcon size={17} filled={post.liked} />
          <span>{post.likes}</span>
          <span className="action-btn-label">Like</span>
        </button>

        <button
          className={`action-btn ${commentsExpanded ? 'active' : ''}`}
          onClick={() => setCommentsExpanded((prev) => !prev)}
          aria-label="View comments"
        >
          <MessageCircleIcon size={17} />
          <span>{post.comments}</span>
          <span className="action-btn-label">Comment</span>
        </button>

        <button className="action-btn" onClick={handleShare} aria-label="Share post">
          <Share2Icon size={17} />
          <span className="action-btn-label">{copiedToast ? 'Copied!' : 'Share'}</span>
        </button>
      </div>

      {/* Expanded Comments Section */}
      {commentsExpanded && <CommentList postId={post.id} />}
    </article>
  );
}
