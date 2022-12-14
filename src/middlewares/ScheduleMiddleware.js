import e from 'express';
import { GeneralValidation } from '../validation';
import { Toolbox } from '../util';
import { GeneralService } from '../services';
import database from '../models';

const {
  errorResponse,
} = Toolbox;
const {
  validateId,
  validateParameters,
  validateSchedule,
  validateStudentSchedule
} = GeneralValidation;
const {
  findByKey,
  findMultipleByKey
} = GeneralService;
const {
  Schedule,
  StudentBooking,
  TeacherSchedule,
  Booking,
} = database;

const ScheduleMiddleware = {
  /**
   * middleware validating schedule payload
   * @async
   * @param {object} req - the api request
   * @param {object} res - api response returned by method
   * @param {object} next - returned values going into next function
   * @returns {object} - returns error or response object
   * @memberof ScheduleMiddleware
   */
  async verifyAvialability(req, res, next) {
    try {
      validateSchedule(req.body);
      const { availableDate } = req.body;
      const availableTime = await findMultipleByKey(Schedule, { availableDate });
      if (availableTime.length) {
        console.log(availableTime);
      }

      next();
    } catch (error) {
      errorResponse(res, { code: 400, message: error });
    }
  },

  /**
   * middleware validating schedule payload
   * @async
   * @param {object} req - the api request
   * @param {object} res - api response returned by method
   * @param {object} next - returned values going into next function
   * @returns {object} - returns error or response object
   * @memberof ScheduleMiddleware
   */
  async verifyScheduleV2(req, res, next) {
    try {
      validateSchedule(req.body);
      const { avialableDate } = req.body;
      const availableTime = await findMultipleByKey(TeacherSchedule, { avialableDate });
      if (availableTime.length) {
        return errorResponse(res, { code: 404, message: 'Date is in use' });
      }

      next();
    } catch (error) {
      console.error(error);
      errorResponse(res, { code: 400, message: error });
    }
  },

  /**
   * middleware validating schedule payload
   * @async
   * @param {object} req - the api request
   * @param {object} res - api response returned by method
   * @param {object} next - returned values going into next function
   * @returns {object} - returns error or response object
   * @memberof ScheduleMiddleware
   */
  async verifyBookingV2(req, res, next) {
    try {
      validateStudentSchedule(req.body);
      const { scheduleId } = req.body;
      const teacherSchedule = await findByKey(TeacherSchedule, { id: scheduleId });
      if (!teacherSchedule) {
        return errorResponse(res, { code: 404, message: 'Teacher Schedule not found' });
      }

      if (teacherSchedule.booked === false) {
        return errorResponse(res, { code: 403, message: 'Booked' });
      }

      req.teacherSchedule = teacherSchedule;
      next();
    } catch (error) {
      console.error(error);
      errorResponse(res, { code: 400, message: error });
    }
  },

  /**
   * middleware validating schedule payload
   * @async
   * @param {object} req - the api request
   * @param {object} res - api response returned by method
   * @param {object} next - returned values going into next function
   * @returns {object} - returns error or response object
   * @memberof ScheduleMiddleware
   */
  async verifySchedule(req, res, next) {
    try {
      validateParameters(req.body);
      let availableTime;

      if (req.query.id || req.query.avialabilityId) {
        const id = req.query.id || req.query.avialabilityId;
        validateId({ id });
        availableTime = await findByKey(Schedule, { id });
        if (!availableTime) return errorResponse(res, { code: 404, message: 'Date is Not Found' });
      }

      req.availableTime = availableTime;
      next();
    } catch (error) {
      errorResponse(res, { code: 400, message: error });
    }
  },

  /**
   * middleware validating
   * @async
   * @param {object} req - the api request
   * @param {object} res - api response returned by method
   * @param {object} next - returned values going into next function
   * @returns {object} - returns error or response object
   * @memberof ScheduleMiddleware
   */
  async verifySchedulePayload(req, res, next) {
    try {
      let availableTime;
      if (req.query.id) {
        const { id } = req.query;
        validateId({ id });
        availableTime = await findByKey(TeacherSchedule, { id });
        if (!availableTime) return errorResponse(res, { code: 404, message: 'Date is Not Found' });
      }

      req.availableTime = availableTime;
      if (req.body) validateParameters(req.body);
      next();
    } catch (error) {
      errorResponse(res, { code: 400, message: error });
    }
  },

  /**
   * middleware validating
   * @async
   * @param {object} req - the api request
   * @param {object} res - api response returned by method
   * @param {object} next - returned values going into next function
   * @returns {object} - returns error or response object
   * @memberof ScheduleMiddleware
   */
  async verifyBookingPayload(req, res, next) {
    try {
      if (req.query.scheduleId) {
        const id = req.query.scheduleId;
        validateId({ id });
        const lecturerScheduleTime = await findByKey(TeacherSchedule, { id });
        if (!lecturerScheduleTime) return errorResponse(res, { code: 404, message: 'Schedule does not exist' });
        req.lecturerScheduleTime = lecturerScheduleTime;
      }

      if (req.query.bookingId) {
        const id = req.query.bookingId;
        validateId({ id });
        const studentBookingData = await findByKey(Booking, { id });
        if (!studentBookingData) return errorResponse(res, { code: 404, message: 'booking does not exist' });
        req.studentBookingData = studentBookingData;
      }

      if (req.body) validateParameters(req.body);
      next();
    } catch (error) {
      errorResponse(res, { code: 400, message: error });
    }
  },

  /**
   * middleware validating
   * @async
   * @param {object} req - the api request
   * @param {object} res - api response returned by method
   * @param {object} next - returned values going into next function
   * @returns {object} - returns error or response object
   * @memberof ScheduleMiddleware
   */
  async verifyAvialabilityPayload(req, res, next) {
    try {
      let availableTime;
      if (req.query.id || req.query.avialabilityId) {
        const id = req.query.id || req.query.avialabilityId;
        validateId({ id });
        availableTime = await findByKey(Schedule, { id });
        if (!availableTime) return errorResponse(res, { code: 404, message: 'Date is Not Found' });
      }

      req.availableTime = availableTime;
      if (req.body) validateParameters(req.body);
      next();
    } catch (error) {
      errorResponse(res, { code: 400, message: error });
    }
  },

  /**
   * middleware validating
   * @async
   * @param {object} req - the api request
   * @param {object} res - api response returned by method
   * @param {object} next - returned values going into next function
   * @returns {object} - returns error or response object
   * @memberof ScheduleMiddleware
   */
  async verifyStudentSchedule(req, res, next) {
    try {
      if (req.query.scheduleId) {
        const id = req.query.scheduleId;
        validateId({ id });
        const lecturerScheduleTime = await findByKey(Schedule, { id });
        if (!lecturerScheduleTime) return errorResponse(res, { code: 404, message: 'Schedule does not exist' });
        req.lecturerScheduleTime = lecturerScheduleTime;
      }

      if (req.query.bookingId) {
        const id = req.query.bookingId;
        validateId({ id });
        const studentBookingData = await findByKey(StudentBooking, { id });
        if (!studentBookingData) return errorResponse(res, { code: 404, message: 'booking does not exist' });
        req.studentBookingData = studentBookingData;
      }

      if (req.body) validateParameters(req.body);
      next();
    } catch (error) {
      errorResponse(res, { code: 400, message: error });
    }
  }
};

export default ScheduleMiddleware;
