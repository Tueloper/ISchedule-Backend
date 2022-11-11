/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import { GeneralService } from '../services';
import { Toolbox } from '../util';
import database from '../models';
import { env } from '../config';

const {
  successResponse,
  errorResponse,
  createToken,
  hashPassword,
  // comparePassword,
  // verifyToken,
} = Toolbox;
// const {
//   sendPasswordResetEmail,
//   // sendVerificationEmail
// } = Mailer;
const {
  addEntity,
  // updateByKey,
  findByKey,
  // deleteByKey
} = GeneralService;
const {
  User,
  Supervisor
} = database;
const {
  ADMIN_KEY
} = env;

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
      let body, user, supervisor;
      if (req.body.ADMIN_KEY) {
        if (req.body.ADMIN_KEY !== ADMIN_KEY) return errorResponse(res, { code: 409, message: 'Admin key does not match.' });
        if (req.body.CIC_ADMIN) {
          body = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashPassword(req.body.password),
            role: 'superadmin',
            verified: true
          };
        } else {
          supervisor = await findByKey(Supervisor, { email: req.body.email });
          if (!supervisor) return errorResponse(res, { code: 404, message: 'This Supervisor does not exist in the database.' });
          body = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashPassword(req.body.password),
            role: 'admin',
            verified: true,
            supervisorId: supervisor.id
          };
        }
      } else {
        body = {
          fullName: req.body.fullName,
          email: req.body.email,
          password: hashPassword(req.body.password),
          role: 'staff',
          verified: true
        };
      }

      user = await addEntity(User, { ...body });
      user.token = createToken({
        email: user.email,
        id: user.id,
        role: user.role,
        verified: user.verified,
        supervisorId: user.supervisorId,
        name: user.fullName,
      });
      res.cookie('token', user.token, { maxAge: 70000000, httpOnly: true });
      return successResponse(res, { user, supervisor }, 201);
    } catch (error) {
      // console.error(error);
      errorResponse(res, {});
    }
  },

  // /**
  //  * user login
  //  * @async
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {JSON} - a JSON response
  //  * @memberof AuthController
  //  */
  // async login(req, res) {
  //   try {
  //     const { password } = req.body;
  //     const user = req.userData;
  //     if (!comparePassword(password, user.password)) return errorResponse(res, { code: 401, message: 'incorrect password or email' });
  //     user.token = createToken({
  //       email: user.email,
  //       id: user.id,
  //       role: user.role,
  //       verified: user.verified,
  //       supervisorId: user.supervisorId,
  //       name: user.fullName,
  //     });
  //     res.cookie('token', user.token, { maxAge: 70000000, httpOnly: true });
  //     return successResponse(res, {
  //       message: 'Login Successful',
  //       token: user.token,
  //       firstTimer: user.firstTimer
  //     });
  //   } catch (error) {
  //     errorResponse(res, {});
  //   }
  // },

  //  /**
  //  * verify user email
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {JSON} - a JSON response
  //  * @memberof AuthController
  //  */
  // async verifyEmail(req, res) {
  //   try {
  //     const { token } = req.query;
  //     const tokenData = verifyToken(token);
  //     const { id } = tokenData;
  //     await updateByKey(User, { verified: true }, { id });
  //     const user =  await findByKey(User, { id });
  //     const newToken = createToken({
  //       email: user.email,
  //       id: user.id,
  //       role: user.role,
  //       verified: user.verified
  //     });
  //     res.cookie('token', newToken, { maxAge: 70000000, httpOnly: true });
  //     return res.redirect(`${CLIENT_URL}/staff?token=${newToken}`);
  //   } catch (error) {
  //     if (error.message === 'Invalid Token') {
  //       return errorResponse(res, { code: 400, message: 'We could not verify your email, the token provided was invalid' });
  //     }
  //     if (error.message === 'Not Found') {
  //       return errorResponse(res, { code: 404, message: 'Sorry, we do not recognise this user in our database' });
  //     }
  //     errorResponse(res, {});
  //   }
  // },

  //  /**
  //  * user gets a new email verification link
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {JSON} - a JSON response
  //  * @memberof AuthController
  //  */
  // async resendEmailVerificationLink(req, res) {
  //   try {
  //     const { email } = req.body;
  //     const user = await findByKey(User, { email });
  //     if (!user) return errorResponse(res, { code: 404, message: `user with email ${email} does not exist` });
  //     if (user.role !== "staff") return errorResponse(res, { code: 409, message: `This user is not a staff and does not need to be verified to access the platform` });
  //     // TODO: uncomment for production
  //     // const emailSent = await sendVerificationEmail(req, user);
  //     // TODO: delete bottom line for production
  //     const emailSent = true;
  //     if (emailSent) return successResponse(res, { message: 'An Email Verification link has been resent to your email' });
  //   } catch (error) {
  //     errorResponse(res, {});
  //   }
  // },


  // /**
  //  * get user profile
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {JSON} - A jsom response with user details
  //  * @memberof UserController
  //  */
  // async getProfile(req, res) {
  //   try {
  //     const { id } = req.tokenData;
  //     const user = await findByKey(User, { id });
  //     successResponse(res, { user });
  //   } catch (error) {
  //     errorResponse(res, {});
  //   }
  // },


  // // /**
  // //  * update user profile
  // //  * @param {object} req
  // //  * @param {object} res
  // //  * @returns {JSON} - A jsom response with user details
  // //  * @memberof UserController
  // //  */
  // // async updateSupervisor(req, res) {
  // //   try {
  // //     const { id, supervisorId } = req.tokenData;
  // //     // return console.log(supervisorId);
  // //     let supervisor = await updateByKey(Supervisor, { name: req.body.name }, { id: supervisorId });
  // //     supervisor = await findByKey(Supervisor, { id: supervisorId });
  // //     successResponse(res, { message:'Supervisor updated successfully', supervisor });
  // //   } catch (error) {
  // //     // console.error(error);
  // //     errorResponse(res, {});
  // //   }
  // // },

  // // /**
  // //  * update user profile
  // //  * @param {object} req
  // //  * @param {object} res
  // //  * @returns {JSON} - A jsom response with user details
  // //  * @memberof UserController
  // //  */
  // // async updateUserDetails(req, res) {
  // //   try {
  // //     // const { id } = req.tokenData;
  // //     const user = await findByKey(User, { email: req.body.email });
  // //     const id = user.id;
  // //     // return console.log(supervisorId);
  // //     let supervisor = await updateByKey(User, { email: req.body.newEmail }, { id });
  // //     supervisor = await findByKey(User, { id });
  // //     successResponse(res, { message:'User updated successfully', supervisor });
  // //   } catch (error) {
  // //     // console.error(error);
  // //     errorResponse(res, {});
  // //   }
  // // },

  // //  /**
  // //  * reset user password
  // //  * @param {object} req
  // //  * @param {object} res
  // //  * @returns {JSON} - a JSON response
  // //  * @memberof AuthController
  // //  */
  // // async resetPassword(req, res) {
  // //   try {
  // //     const { oldPassword, newPassword } = req.body;
  // //     const { id } = req.tokenData;
  // //     let user = await findByKey(User, { id });
  // //     if (!user) return errorResponse(res, { code: 404, message: 'Sorry, user in token does not exist' });
  // //     if (!comparePassword(oldPassword, user.password)) return errorResponse(res, { code: 401, message: 'Old password is incorrect' });
  // //     const hashedPassword = hashPassword(newPassword);
  // //     user = await updateByKey(User, { password: hashedPassword, firstTimer: false }, { id });
  // //     successResponse(res, { message: 'Password has been changed successfully' });
  // //   } catch (error) {
  // //     errorResponse(res, {});
  // //   }
  // // },

  // //  /**
  // //  * user reset password email
  // //  * @param {object} req
  // //  * @param {object} res
  // //  * @returns {JSON} - a JSON response
  // //  * @memberof AuthController
  // //  */
  // // async resetPasswordEmailLink(req, res) {
  // //   try {
  // //     const { email } = req.body;
  // //     let user = await findByKey(User, { email });
  // //     if (!user) return errorResponse(res, { code: 404, message: 'email does not match anything in our database' });
  // //     // TODO: uncomment for production
  // //     const emailSent = await sendPasswordResetEmail(req, user);
  // //     // TODO: delete bottom line for production
  // //     // const emailSent = true;
  // //     if (emailSent) return successResponse(res, { message: 'A password reset link has been sent to your email' });
  // //   } catch (error) {
  // //     // console.error(error);
  // //     errorResponse(res, {});
  // //   }
  // // },

  // //   /**
  // //  * verify reset password link
  // //  * @param {object} req
  // //  * @param {object} res
  // //  * @returns {JSON} - a JSON response
  // //  * @memberof AuthController
  // //  */
  // // async verifyResetPasswordLink(req, res) {
  // //   try {
  // //     const { token } = req.query;
  // //     const tokenData = (token);
  // //     if (tokenData) {
  // //       res.cookie('token', token, { maxAge: 70000000, httpOnly: true });
  // //       // const url = `${req.protocol}s://${req.get('host')}/v1.0/api/auth/set-password`;
  // //       // successResponse(res, { message: `success, redirect to api route ${url} with password objects` });
  // //       return res.redirect(`${CLIENT_URL}/set-password?token=${token}`);
  // //     }
  // //   } catch (error) {
  // //     if (error.message === 'Invalid Token') {
  // //       return errorResponse(res, { code: 400, message: 'The token provided was invalid' });
  // //     }
  // //     const status = error.status || 500;
  // //     errorResponse(res, { code: status, message: `could not verify, ${error.message}` });
  // //   }
  // // },

  // // /**
  // //  * one time password set
  // //  * @param {object} req
  // //  * @param {object} res
  // //  * @returns {JSON} - a JSON response
  // //  * @memberof AuthController
  // //  */
  // // async setPassword(req, res) {
  // //   try {
  // //     const { newPassword } = req.body;
  // //     const { id } = req.tokenData;
  // //     let user = await findByKey(User, { id });
  // //     if (!user) return errorResponse(res, { code: 404, message: 'Sorry, user in token does not exist' });
  // //     const hashedPassword = hashPassword(newPassword);
  // //     user = await updateByKey(User, { password: hashedPassword }, { id });
  // //     successResponse(res, { message: 'Password has been set successfully' });
  // //   } catch (error) {
  // //     errorResponse(res, {});
  // //   }
  // // },


  // // /**
  // //  * logs user out
  // //  * @param {object} req
  // //  * @param {object} res
  // //  * @returns {JSON} - a JSON response
  // //  * @memberof AuthController
  // //  */
  // // async logoutUser(req, res) {
  // //   try {
  // //     const token = '';
  // //     res.cookie('token', token, { maxAge: 0, httpOnly: true });
  // //     return successResponse(res, { message: 'Logout Successful', token });
  // //   } catch (error) {
  // //     errorResponse(res, {});
  // //   }
  // // },

  // /**
  //  * deactivate a user by an admin
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {JSON} - a JSON response
  //  * @memberof AuthController
  //  */
  // async deactivateUsers(req, res) {
  //   try {
  //     const { id, email, vendorId } = req.query;
  //     let user;
  //     if (id) user = await deleteByKey(User, { id });
  //     if (email) user = await deleteByKey(User, { email });
  //     if (vendorId) user = await deleteByKey(User, { vendorId });
  //     return successResponse(res, { message: 'User Deleted Successfully', user });
  //   } catch (error) {
  //     errorResponse(res, {});
  //   }
  // },
};

export default AuthController;
