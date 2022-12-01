/* eslint-disable import/extensions */
import { Router } from 'express';
import { Bouncers, ScheduleMiddleware } from '../middlewares';
import { ScheduleController } from '../controller';

const router = Router();
const {
  studentBouncers,
  lecturerBouncers
} = Bouncers;
const {
  verifyAvialability,
  verifyAvialabilityPayload,
  verifySchedule
} = ScheduleMiddleware;
const {
  setAvialableTimePerDay,
  updateAvialableDate,
  getAvailableDate,
  deleteAvialableDate
} = ScheduleController;

router.post('/', lecturerBouncers, verifyAvialability, setAvialableTimePerDay);
router.get('/', lecturerBouncers, verifyAvialabilityPayload, getAvailableDate);
router.put('/', lecturerBouncers, verifySchedule, updateAvialableDate);
router.delete('/', lecturerBouncers, verifySchedule, deleteAvialableDate);

export default router;
