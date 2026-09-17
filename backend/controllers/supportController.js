import { storageService } from '../services/storageService.js';

export const submitSupportTicket = (req, res) => {
  const { text, issueType, senderRoll } = req.body;

  if (!text || !issueType) {
    return res.status(400).json({ success: false, message: 'Text and issueType are required' });
  }

  const ticket = storageService.createSupportTicket({
    text: text.trim(),
    issueType,
    senderRoll: senderRoll || 'Anonymous',
  });

  res.status(201).json({
    success: true,
    message: 'Report submitted successfully. Authorized personnel will respond shortly.',
    data: ticket,
  });
};
