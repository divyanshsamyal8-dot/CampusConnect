import { Router } from 'express';
import {
  getCommunities,
  createCommunity,
  getCommunityMessages,
  sendCommunityMessage,
} from '../controllers/communityController.js';

const router = Router();

router.get('/', getCommunities);
router.post('/', createCommunity);
router.get('/:name/messages', getCommunityMessages);
router.post('/:name/messages', sendCommunityMessage);

export default router;
