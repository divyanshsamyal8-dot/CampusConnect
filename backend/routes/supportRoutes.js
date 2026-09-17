import { Router } from 'express';
import { submitSupportTicket } from '../controllers/supportController.js';

const router = Router();

router.post('/', submitSupportTicket);

export default router;
