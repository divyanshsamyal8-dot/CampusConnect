import { Router } from 'express';
import {
  getFriends,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  removeFriend,
} from '../controllers/friendController.js';

const router = Router();

router.get('/', getFriends);
router.post('/request', sendFriendRequest);
router.post('/accept', acceptFriendRequest);
router.post('/decline', declineFriendRequest);
router.delete('/:rollNumber', removeFriend);

export default router;
