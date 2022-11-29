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
  // updateByKey,
  // findByKey,
  // findMultipleByKey
} = GeneralService;
const {
  Schedule,
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
};

export default ScheduleController;
