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
  verifySchedule,
  verifyStudentSchedule
} = ScheduleMiddleware;
const {
  setAvialableTimePerDay,
  updateAvialableDate,
  getAvailableDate,
  deleteAvialableDate,
  bookSchedule,
  updatedBookingSchedule,
  deleteBookingSchedule,
} = ScheduleController;

router.post('/', lecturerBouncers, verifyAvialability, setAvialableTimePerDay); // ?email=[]
router.get('/', lecturerBouncers, verifyAvialabilityPayload, getAvailableDate); // ?email=[]
router.put('/', lecturerBouncers, verifySchedule, updateAvialableDate); // ?email=[]
router.delete('/', lecturerBouncers, verifySchedule, deleteAvialableDate); // ?email=[]
router.post('/', studentBouncers, verifyStudentSchedule, bookSchedule); // ?email=[]?scheduleId=[]
router.put('/', studentBouncers, verifyStudentSchedule, updatedBookingSchedule); // ?email=[]?scheduleId=[]&bookingId=[]
router.delete('/', studentBouncers, verifyStudentSchedule, deleteBookingSchedule); // ?email=[]?scheduleId=[]&bookingId=[]

export default router;
