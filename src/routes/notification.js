import { Router } from 'express';
import { NotificationMiddleware } from '../middlewares';
import { NotificationController } from '../controller';

const router = Router();
const {
  verifyNotification
} = NotificationMiddleware;
const {
  getNotifications,
} = NotificationController;

router.get('/notifications', verifyNotification, getNotifications);
export default router;
