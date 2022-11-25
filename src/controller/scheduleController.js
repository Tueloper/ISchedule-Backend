/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import { GeneralService, } from '../services';
import { Toolbox } from '../util';
import database from '../models';

const {
  successResponse,
  errorResponse,
  // generateTicketCode
} = Toolbox;
// const {
//   viaPaystack,
//   validatePaystack
// } = Payment;
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
   * @memberof TicketController
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
};

export default ScheduleController;
