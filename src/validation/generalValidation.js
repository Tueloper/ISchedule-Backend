/* eslint-disable no-useless-escape */
import joi from '@hapi/joi';
import validationData from './validationData';

const { states, countries } = validationData;

const GeneralValidation = {
  /**
   * validate general parameters
   * @param {object} payload - user object
   * @returns {object | boolean} - returns a boolean or an error object
   * @memberof GeneralValidation
   */
  validateParameters(payload) {
    const schema = {
      type: joi.string().label('Please input a valid privacy type'),
      activityType: joi.string().valid('general', 'post', 'event', 'movie', 'following').label('Please input a valid privacy type'),
      description: joi.string().label('Please input a valid privacy description'),
      id: joi.number().positive().label('Please enter a positive number for id parameter'),
      email: joi.string().email().label('Please enter a valid email address'),
      title: joi.string().label('Please input a valid post title'),
      body: joi.string().label('Please input a valid post message'),
      privacyId: joi.number().positive().label('Please input a valid privacy id'),
      movieId: joi.number().positive().label('Please input a valid movie id'),
      eventId: joi.number().positive().label('Please input a valid event id'),
      name: joi.string().label('Please input a valid cinema name'),
      address: joi.string().label('Please input a valid cinema address'),
      capacity: joi.number().positive().label('Please input a valid cinema capacity'),
      seats: joi.number().positive().label('Please input a valid cinema seats number'),
      trailer: joi.string().uri().label('Please input a valid and trailer link'),
      state: joi.valid(states).label('Please input a valid state name'),
      storyLine: joi.string().label('Please input a valid movie story line'),
      avialableDate: joi.date().label('Please input a valid date when the movie will be released'),
      showDate: joi.date().label('Please input a valid date when the movie will be released'),
      discount: joi.number().precision(2).label('Please input a valid discount, it\'s percentage should be presented in at most 2 decimal pllaces'),
      ticketPrice: joi.number().positive().label('Please input a valid movie ticket price'),
      shareLink: joi.string().uri().label('Please input a valid and shareable link  '),
      duration: joi.string().label("Please duration should be for example '90 minutes' to be valid"),
      cinemaIds: joi.number().integer().positive().label('Please input a valid cinema'),
      genreIds: joi.number().integer().positive().label('Please input a valid genre'),
      mediaIds: joi.number().integer().positive().label('Please input a valid media'),
      numberOfTickets: joi.number().positive().label('Please input a valid number of tickets'),
      postId: joi.number().positive().label('Please input a valid post id'),
      comment: joi.string().label('Please input a valid comment for the post'),
      parentId: joi.number().positive().label('Please input a valid comment parent id'),
      showTime: joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).label('Please enter a valid show time'),
      addresses: joi.array().items(
        joi.object({
          address: joi.string().label('Please input a valid address'),
          city: joi.string().min(3).max(25).label('Please input a city name'),
          seats: joi.number().positive().required().label('Cinema Address Seat capacity is required'),
          state: joi.valid(states).label('Please state name must be capitalized'),
          country: joi.valid(countries).label('Please country must be capitalized'),
        })
      ).label('Please input a valid cinema address'),
      city: joi.string().min(3).max(25).label('Please input a city name'),
      country: joi.valid(countries).label('Please country must be capitalized'),
      post: joi.object({
        title: joi.string().label('Please input a valid post title'),
        body: joi.string().min(3).label('Please input a valid post description'),
        privacyId: joi.number().integer().positive().label('Please input a valid privacy value')
      }).label('Please add a post details for this movie'),
      startDate: joi.date().label('Please input a valid date when the movie will be released'),
      endDate: joi.date().label('Please input a valid date when the movie will be released'),
      startTime: joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).label('Please enter a valid show time'),
      endTime: joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).label('Please enter a valid show time'),
    };
    const { error } = joi.validate({ ...payload }, schema);
    if (error) throw error.details[0].context.label;
    return true;
  },

  /**
   * validate required email
   * @param {object} payload - user object
   * @returns {object | boolean} - returns a boolean or an error object
   * @memberof GeneralValidation
   */
  validateEmail(payload) {
    const schema = {
      email: joi.string().email().required()
        .label('Please enter a valid email address'),
    };
    const { error } = joi.validate({ ...payload }, schema);
    if (error) throw error.details[0].context.label;
    return true;
  },

  /**
   * validate schedule payload
   * @param {object} payload - user object
   * @returns {object | boolean} - returns a boolean or an error object
   * @memberof GeneralValidation
   */
  validateSchedule(payload) {
    const schema = {
      avialableDate: joi.date().label('Please input a valid date when the You will be available'),
      startTime: joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).label('Please enter a valid start time'),
      endTime: joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).label('Please enter a valid end time'),
      booked: joi.bool().required().label('Please indicated whether you want to book or not'),
    };
    const { error } = joi.validate({ ...payload }, schema);
    if (error) throw error.details[0].context.label;
    return true;
  },

  /**
   * validate required id
   * @param {object} payload - user object
   * @returns {object | boolean} - returns a boolean or an error object
   * @memberof GeneralValidation
   */
  validateId(payload) {
    const schema = {
      id: joi.number().positive().required()
        .label('Please enter a positive number for id parameter'),
    };
    const { error } = joi.validate({ ...payload }, schema);
    if (error) throw error.details[0].context.label;
    return true;
  },
};

export default GeneralValidation;
