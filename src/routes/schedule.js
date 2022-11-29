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
  verifyAvialabilityPayload
} = ScheduleMiddleware;
const {
  setAvialableTimePerDay
} = ScheduleController;

router.post('/', lecturerBouncers, verifyAvialability, setAvialableTimePerDay);
router.get('/', verifyAvialabilityPayload, setAvialableTimePerDay);

export default router;
