/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import { GeneralService, ScheduleService } from '../services';
import { Toolbox } from '../util';
import database from '../models';

const {
  successResponse,
  errorResponse,
  // generateTicketCode
} = Toolbox;
const {
  getAvailableDates
} = ScheduleService;
const {
  addEntity,
  updateByKey,
  findByKey,
  findMultipleByKey,
  deleteByKey
} = GeneralService;
const {
  Schedule,
  StudentBooking,
} = database;

const ScheduleController = {
  /**
   * Select available time and date
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof ScheduleController
   */
  async setAvialableTimePerDay(req, res) {
    try {
      const { id } = req.tokenData;
      const { body } = req;
      const availableTime = await addEntity(Schedule, { ...body, lectuererId: id });
      return successResponse(res, { message: 'Available time set Successfully', availableTime });
    } catch (error) {
      errorResponse(res, { code: 500, message: error });
    }
  },

  /**
   * get all available time per day
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof ScheduleController
   */
  async getAvailableDate(req, res) {
    try {
      const {
        startDate, endDate, booked, id
      } = req.query;
      let availableDates;

      if (id) {
        availableDates = await getAvailableDates({ id });
      } else if (startDate && endDate) {
        availableDates = await getAvailableDates({ startDate, endDate });
      } else if (booked) {
        availableDates = await getAvailableDates({ booked });
      }

      return successResponse(res, { message: 'Category Gotten Successfully', availableDates });
    } catch (error) {
      errorResponse(res, { code: 500, message: error });
    }
  },

  /**
   * delete a schedule and a post
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof EventController
   */
  async deleteAvialableDate(req, res) {
    try {
      const { availableTime } = req;
      const { id } = availableTime;

      await deleteByKey(Schedule, { id });
      return successResponse(res, { message: 'Schedule Deleted Successfully' });
    } catch (error) {
      errorResponse(res, { code: 500, message: error });
    }
  },

  /**
   * update a date
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof EventController
   */
  async updateAvialableDate(req, res) {
    try {
      const availableDate = await updateByKey(Schedule, { ...req.body }, { id: req.availableTime.id });
      return successResponse(res, { message: 'Schedule updated Successfully', availableDate });
    } catch (error) {
      errorResponse(res, { code: 500, message: error });
    }
  },

  /**
   * book a booking
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof EventController
   */
  async bookSchedule(req, res) {
    try {
      const { id } = req.lecturerScheduleTime;
      const booking = await addEntity(StudentBooking, { ...req.body, scheduleId: id });
      return successResponse(res, { message: 'Booking added Successfully', booking });
    } catch (error) {
      errorResponse(res, { code: 500, message: error });
    }
  },

  /**
   * update a booking
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof EventController
   */
  async updatedBookingSchedule(req, res) {
    try {
      const { id } = req.lecturerScheduleTime;
      const booking = await updateByKey(StudentBooking, { ...req.body }, { scheduleId: id, id: req.studentBookingData.id });
      return successResponse(res, { message: 'Booking updated Successfully', booking });
    } catch (error) {
      errorResponse(res, { code: 500, message: error });
    }
  },

  /**
   * delete a booking
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof EventController
   */
  async deleteBookingSchedule(req, res) {
    try {
      const booking = await deleteByKey(StudentBooking, { id: req.studentBookingData.id });
      return successResponse(res, { message: 'Booking deleted Successfully', booking });
    } catch (error) {
      errorResponse(res, { code: 500, message: error });
    }
  },
};

export default ScheduleController;
