// Validation: NNNNANANNN (e.g. 2025A7R025)
const validateRoll = (roll) => /^(\d{4})([A-Z])(\d)([A-Z])(\d{3})$/.test(roll);

export const getFriends = (req, res) => {
  res.json({
    success: true,
    data: {
      friends: [],
      pendingRequests: [],
    },
  });
};

export const sendFriendRequest = (req, res) => {
  const { from, fromName, to, toName } = req.body;

  if (!to || !validateRoll(to.toUpperCase())) {
    return res.status(400).json({
      success: false,
      message: 'Invalid roll number format. Expected format: NNNNANANNN (e.g. 2025A7R025)',
    });
  }

  const request = {
    id: Date.now(),
    from: from || '2025A7R025',
    fromName: fromName || 'Student',
    to: to.toUpperCase(),
    toName: toName || to.toUpperCase(),
    status: 'pending',
    timestamp: new Date().toISOString(),
  };

  res.status(201).json({ success: true, data: request });
};

export const acceptFriendRequest = (req, res) => {
  const { requestId } = req.body;
  res.json({
    success: true,
    message: `Friend request ${requestId} accepted.`,
  });
};

export const declineFriendRequest = (req, res) => {
  const { requestId } = req.body;
  res.json({
    success: true,
    message: `Friend request ${requestId} declined.`,
  });
};

export const removeFriend = (req, res) => {
  const { rollNumber } = req.params;
  res.json({
    success: true,
    message: `Friend ${rollNumber} removed.`,
  });
};
