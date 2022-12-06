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

router.post('/', lecturerBouncers, verifyAvialability, setAvialableTimePerDay); // ?email=[]
router.get('/', lecturerBouncers, verifyAvialabilityPayload, getAvailableDate); // ?email=[]
router.put('/', lecturerBouncers, verifySchedule, updateAvialableDate); // ?email=[]
router.delete('/', lecturerBouncers, verifySchedule, deleteAvialableDate); // ?email=[]

export default router;
