/**
 * Campus Connect Data Schemas / Models
 */

export const PostSchema = {
  id: 'number',
  author: 'string',
  authorRoll: 'string',
  authorInitial: 'string',
  avatarColor: 'string',
  text: 'string',
  tag: 'string',
  time: 'string',
  date: 'string',
  likes: 'number',
  liked: 'boolean',
  comments: 'number',
  isAnon: 'boolean',
};

export const CommentSchema = {
  id: 'number',
  author: 'string',
  authorInitial: 'string',
  avatarColor: 'string',
  text: 'string',
  time: 'string',
  likes: 'number',
  liked: 'boolean',
  replies: 'array',
  isReply: 'boolean',
  showReplies: 'boolean',
};

export const FriendRequestSchema = {
  id: 'number',
  from: 'string', // roll number
  fromName: 'string',
  to: 'string',   // roll number
  toName: 'string',
  status: 'pending | accepted | declined',
  timestamp: 'string',
};

export const MenuItemSchema = {
  id: 'number',
  n: 'string',
  p: 'number',
  category: 'drinks | snacks | meals | desserts | combos',
  icon: 'string',
};

export const SupportTicketSchema = {
  id: 'string',
  text: 'string',
  issueType: 'bullying | emotional | facility | academic | other',
  timestamp: 'string',
  status: 'open | resolved',
};
