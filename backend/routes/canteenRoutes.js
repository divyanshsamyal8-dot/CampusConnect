import { Router } from 'express';
import { getMenu, placeOrder } from '../controllers/canteenController.js';

const router = Router();

router.get('/menu', getMenu);
router.post('/order', placeOrder);

export default router;
