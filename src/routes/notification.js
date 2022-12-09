import { Router } from 'express';
import { Bouncers, NotificationMiddleware } from '../middlewares';
import { NotificationController } from '../controller';

const router = Router();
const {
  studentBouncers, lecturerBouncers
} = Bouncers;
const {
  verifyNotification
} = NotificationMiddleware;
const {
  addNotification,
  getNotifications,
  deleteNotification,
  adminReplySubject,
  vendorReplySubject,
  adminNotification
} = NotificationController;

router.post('/', verifyNotification, addNotification);
router.post('/admin', adminBouncers, verifyNotification, adminNotification); // ?vendorId=[]
router.post('/admin/reply', adminBouncers, verifyNotification, adminReplySubject); // ?subject=[]&vendorId=[]
router.post('/vendor/reply', supplierBouncers, verifyNotification, vendorReplySubject); // ?subject=[]
router.get('/', supplierBouncers, verifyNotification, getNotifications); // ?subjectId=[]
router.delete('/', supplierBouncers, verifyNotification, deleteNotification); // ?subjectId=[]

export default router;
