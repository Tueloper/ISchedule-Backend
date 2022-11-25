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
  verifySchedule
} = ScheduleMiddleware;
const {
  setAvialableTimePerDay
} = ScheduleController;

router.post('/', lecturerBouncers, verifySchedule, setAvialableTimePerDay);

export default router;
