import { storageService } from '../services/storageService.js';

export const getPosts = (req, res) => {
  const { search, tag } = req.query;
  const posts = storageService.getPosts(search, tag);
  res.json({ success: true, count: posts.length, data: posts });
};

export const createPost = (req, res) => {
  const { text, author, authorRoll, tag, isAnon, avatarColor } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ success: false, message: 'Text is required for a post' });
  }

  const post = storageService.createPost({
    text: text.trim(),
    author: isAnon ? 'Anonymous Student' : (author || 'Student'),
    authorRoll: isAnon ? '' : (authorRoll || ''),
    authorInitial: isAnon ? 'A' : (author ? author.charAt(0).toUpperCase() : 'S'),
    avatarColor: isAnon ? '#64748b' : (avatarColor || 'linear-gradient(135deg, #4361ee, #3a0ca3)'),
    tag: tag || '',
    isAnon: Boolean(isAnon),
  });

  res.status(201).json({ success: true, data: post });
};

export const likePost = (req, res) => {
  const { id } = req.params;
  const post = storageService.likePost(id);
  if (!post) {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }
  res.json({ success: true, data: post });
};

export const getComments = (req, res) => {
  const { id } = req.params;
  const comments = storageService.getComments(id);
  res.json({ success: true, data: comments });
};

export const addComment = (req, res) => {
  const { id } = req.params;
  const { text, author, parentCommentId } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ success: false, message: 'Text is required for a comment' });
  }

  const comment = storageService.addComment(id, {
    text: text.trim(),
    author: author || 'Student',
    authorInitial: author ? author.charAt(0).toUpperCase() : 'S',
    avatarColor: 'linear-gradient(135deg, #7209b7, #ef476f)',
    parentCommentId,
    isReply: Boolean(parentCommentId),
    showReplies: false,
  });

  if (!comment) {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }

  res.status(201).json({ success: true, data: comment });
};
