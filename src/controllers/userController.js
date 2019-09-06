import moment from 'moment';
import crypto from 'crypto';
import { sendResetMail, sendSignupMail } from '../services/sendMail';
import Response from '../utils/response';
import Hash from '../utils/hash';
import db from '../models';
import userService from '../services/userservice';
import { jwtSignUser } from '../utils/index';
import { hashPassword } from '../helpers/hashpassword';


const util = new Response();

const { users, logins, resets } = db;
const { errorResponse, successResponse } = Response;

/**
 * @param { class } provide response to email request.
 */
export default class UserController {
  /**
 * @param {req} req that contains the req body object.
 * @param {res} res content to be rendered.
 * @returns {object} Success or failure response on adding a specific user
 */
  static async addUser(req, res) {
    const { user, emailToken } = req;
    const lastLogin = new Date();
    try {
      const hashpassword = await hashPassword(user.password);
      user.password = hashpassword;
      const {
        id, email, firstName, lastName
      } = await userService.addUser(user);
      const newLoggedDetails = { email, password: user.password, lastLogin };
      await userService.addLogin(email, newLoggedDetails);
      const token = await jwtSignUser(id);
      util.setSuccess(201, 'user Added!', {
        token, emailToken, id, email, firstName, lastName,
      });
      return util.send(res);
    } catch (error) {
      if (error.original.routine === '_bt_check_unique') {
        util.setError(409, 'Email already exist');
        return util.send(res);
      }
      util.setError(400, error);
      return util.send(res);
    }
  }

  /**
   * @description Generate link to reset a user password
   * @static
   * @param {*} req
   * @param {*} res
   * @returns Promise {UserController} A reset link for new password
   * @memberof UserController
   * @returns {object} Success or failure response on adding a specific user
   */
  static async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      // Find user by email
      const user = await users.findOne({ where: { email } });

      // Check for user
      if (!user) {
        const mailSent = sendSignupMail(email);
        if (!mailSent) {
          return errorResponse(res, 500, 'Error in sending email');
        }
      } else {
        const newReset = new resets({
          email: user.email,
          resetToken: '',
          expireTime: moment
            .utc()
            .add(process.env.TOKENEXPIRY, 'seconds')
            .toLocaleString()
        });

        // Generate Reset token
        const resetToken = await crypto.randomBytes(32).toString('hex');
        newresets.resetToken = await Hash.hash(resetToken);

        // Remove all reset token for this user if it exists
        await resets.destroy({
          where: { email: newresets.dataValues.email }
        });
        // console.log('newReset', newReset);
        await newresets.save();
        // Send reset link to user email
        const mailSent = sendResetMail(user, resetToken);
        if (!mailSent) {
          return errorResponse(res, 500, 'Error in sending email');
        }
      }
      successResponse(res, 200, 'Check your mail for further instruction');
    } catch (error) {
      return errorResponse(res, 500, error);
    }
  }

  /**
   * @description Resets a user password
   * @static
   * @param {*} req
   * @param {*} res
   * @returns Promise {UserController} A new password record
   * @memberof UserController
   * @returns {object} Success or failure response on adding a specific user
   */
  static async resetPassword(req, res) {
    try {
      const { userId } = req.params;
      const resetToken = req.query.token;
      const { password } = req.body;

      // Find user by user id
      const user = await users.findOne({ where: { id: userId } });
      let userRequestReset;

      // Find user reset request by email
      user
        ? (userRequestReset = await resets.findOne({
          where: { email: users.email }
        }))
        : null;

      // Check if user has requested password reset
      if (user && userRequestReset) {
        // Check if reset token is not expired
        const { expireTime } = userRequestReset;
        const tokenExpireTime = moment.utc(expireTime);

        // If reset link is valid and not expired
        const validReset = moment().isBefore(tokenExpireTime)
          && Hash.compareWithHash(resetToken, userRequestresets.resetToken);

        if (validReset) {
          // Store hash of new password in login
          const hashed = await Hash.hash(password);
          await logins.update(
            {
              token: '',
              password: hashed,
              lastLogin: new Date()
            },
            { where: { email: userRequestresets.email } }
          );
          // Delete reset request from database
          await resets.destroy({ where: { email: userRequestresets.email } });
          return successResponse(res, 200, 'Password updated successfully');
        }
        return errorResponse(res, 400, 'Invalid or expired reset token');
      }
      return errorResponse(res, 400, 'Invalid or expired reset token');
    } catch (error) {
      return errorResponse(res, 500, error);
    }
  }
}
