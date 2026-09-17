import { Router } from 'express';
import {
  getDirectMessages,
  sendDirectMessage,
} from '../controllers/messageController.js';

const router = Router();

router.get('/:rollNumber', getDirectMessages);
router.post('/:rollNumber', sendDirectMessage);

export default router;
