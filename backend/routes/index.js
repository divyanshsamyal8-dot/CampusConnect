import { Router } from 'express';
import postRoutes from './postRoutes.js';
import communityRoutes from './communityRoutes.js';
import messageRoutes from './messageRoutes.js';
import friendRoutes from './friendRoutes.js';
import canteenRoutes from './canteenRoutes.js';
import supportRoutes from './supportRoutes.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Campus Connect Backend API',
    version: '2.2.0',
    timestamp: new Date().toISOString(),
  });
});

router.use('/posts', postRoutes);
router.use('/communities', communityRoutes);
router.use('/messages', messageRoutes);
router.use('/friends', friendRoutes);
router.use('/canteen', canteenRoutes);
router.use('/support', supportRoutes);

export default router;
