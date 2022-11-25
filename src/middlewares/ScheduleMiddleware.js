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
  validateSchedule
} = GeneralValidation;
const {
  findByKey,
  findMultipleByKey
} = GeneralService;
const {
  Schedule
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
  async verifySchedulePayload(req, res, next) {
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
   * middleware validating event payload
   * @async
   * @param {object} req - the api request
   * @param {object} res - api response returned by method
   * @param {object} next - returned values going into next function
   * @returns {object} - returns error or response object
   * @memberof ScheduleMiddleware
   */
  async verifySchedule(req, res, next) {
    try {
      if (req.query.id || req.query.eventId) {
        const id = req.query.id || req.query.eventId;
        validateId({ id });
        const event = await findByKey(Event, { id });
        if (!event) return errorResponse(res, { code: 404, message: 'Event is Not Found' });
        req.event = event;
      }
      if (req.body) validateParameters(req.body);
      next();
    } catch (error) {
      errorResponse(res, { code: 400, message: error });
    }
  }
};

export default ScheduleMiddleware;
