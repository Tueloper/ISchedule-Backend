import { Router } from 'express';
import authRoutes from './auth';
import scheduleRoutes from './schedule';
import notificationRoutes from './notification';

const router = Router();

router.use('/auth', authRoutes);
router.use('/schedule', scheduleRoutes);
router.use('/notification', notificationRoutes);

export default router;
