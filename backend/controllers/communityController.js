import { storageService } from '../services/storageService.js';

export const getCommunities = (req, res) => {
  const communities = storageService.getCommunities();
  res.json({ success: true, count: communities.length, data: communities });
};

export const createCommunity = (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, message: 'Community name is required' });
  }

  const created = storageService.createCommunity(name.trim());
  res.status(201).json({ success: true, data: created });
};

export const getCommunityMessages = (req, res) => {
  const { name } = req.params;
  const messages = storageService.getCommunityMessages(name);
  res.json({ success: true, data: messages });
};

export const sendCommunityMessage = (req, res) => {
  const { name } = req.params;
  const { msg, sender } = req.body;

  if (!msg || !msg.trim()) {
    return res.status(400).json({ success: false, message: 'Message text is required' });
  }

  const message = storageService.addCommunityMessage(name, { msg, sender });
  res.status(201).json({ success: true, data: message });
};
