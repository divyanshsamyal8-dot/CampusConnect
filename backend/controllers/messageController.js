export const getDirectMessages = (req, res) => {
  const { rollNumber } = req.params;
  // Endpoint ready for database-backed private message retrieval
  res.json({
    success: true,
    data: [],
    recipient: rollNumber,
  });
};

export const sendDirectMessage = (req, res) => {
  const { rollNumber } = req.params;
  const { text, sender } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ success: false, message: 'Message text is required' });
  }

  const message = {
    id: Date.now(),
    text: text.trim(),
    sender: sender || 'Me',
    recipient: rollNumber,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  res.status(201).json({ success: true, data: message });
};
