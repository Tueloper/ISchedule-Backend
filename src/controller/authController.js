/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import { GeneralService } from '../services';
import { Toolbox } from '../util';
import database from '../models';

const {
  successResponse,
  errorResponse,
  createToken,
  hashPassword,
  comparePassword,
  verifyToken,
} = Toolbox;
const {
  addEntity,
  findByKey,
  // deleteByKey
} = GeneralService;
const {
  User,
} = database;

const AuthController = {
  /**
   * user signup
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof AuthController
   */
  async signup(req, res) {
    try {
      // get the user information for signup
      const body = {
        name: req.body.name,
        username: req.body.username,
        imageUrl: req.body.imageUrl,
        email: req.body.email,
        password: hashPassword(req.body.password),
        type: req.body.type,
        dob: req.body.dob,
        phoneNumber: req.body.phoneNumber
      };

      // add the user using sequelize add command
      const user = await addEntity(User, { ...body });

      // create user token from add user details to be sent back to the frontend
      // user.token = createToken({
      //   email: user.email,
      //   id: user.id,
      //   type: user.type,
      //   username: user.username,
      //   phoneNumber: user.phoneNumber,
      // });

      // send token
      // res.cookie('token', user.token, { maxAge: 70000000, httpOnly: true });
      return successResponse(res, { ...user }, 201);
    } catch (error) {
      errorResponse(res, {});
    }
  },

  /**
   * user login
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} - a JSON response
   * @memberof AuthController
   */
  async login(req, res) {
    try {
      const { password } = req.body;
      const user = req.userData;
      // compare passwords, to be sure the password matches, if not send an error message
      if (!comparePassword(password, user.password)) return errorResponse(res, { code: 401, message: 'incorrect password or email' });

      // if user passwoerd is correct, send user tokent to frontend
      // user.token = createToken({
      //   email: user.email,
      //   id: user.id,
      //   type: user.type,
      //   username: user.username,
      //   phoneNumber: user.phoneNumber,
      // });
      // res.cookie('token', user.token, { maxAge: 70000000, httpOnly: true });
      // console.log(user);
      return successResponse(res, {
        message: 'Login Successful',
        user
      });
    } catch (error) {
      errorResponse(res, {});
    }
  },

  /**
   * get user profile
   * @param {object} req
   * @param {object} res
   * @returns {JSON} - A jsom response with user details
   * @memberof UserController
   */
  async getProfile(req, res) {
    try {
      const { id } = req.tokenData;

      // retrieve user details by user id
      const user = await findByKey(User, { id });
      successResponse(res, { user });
    } catch (error) {
      errorResponse(res, {});
    }
  },

  /**
   * logs user out
   * @param {object} req
   * @param {object} res
   * @returns {JSON} - a JSON response
   * @memberof AuthController
   */
  async logoutUser(req, res) {
    try {
      const token = '';

      // send back empty user token, to log users out
      res.cookie('token', token, { maxAge: 0, httpOnly: true });
      return successResponse(res, { message: 'Logout Successful', token });
    } catch (error) {
      errorResponse(res, {});
    }
  },
};

export default AuthController;
