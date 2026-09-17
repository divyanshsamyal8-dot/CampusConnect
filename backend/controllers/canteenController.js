import { storageService } from '../services/storageService.js';

export const getMenu = (req, res) => {
  const { category } = req.query;
  const menu = storageService.getMenu(category);
  res.json({ success: true, count: menu.length, data: menu });
};

export const placeOrder = (req, res) => {
  const { items, total } = req.body;
  if (!items || !items.length) {
    return res.status(400).json({ success: false, message: 'Cart items cannot be empty' });
  }

  const order = storageService.createOrder({
    items,
    total,
    status: 'received',
    estimatedMinutes: 15,
  });

  res.status(201).json({ success: true, data: order });
};
