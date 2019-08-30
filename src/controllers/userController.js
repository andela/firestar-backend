import moment from 'moment';
import crypto from 'crypto';
import Validation from '../validation';
import { sendResetMail, sendSignupMail } from '../services/sendMail';
import { errorResponse, successResponse } from '../utils/response';
import Hash from '../utils/hash';
import models from '../models';

const { User, Login, Reset } = models;

export default class UserController {
  /**
   * @description Generate link to reset a user password
   * @static
   * @param {*} req
   * @param {*} res
   * @returns Promise {UserController} A reset link for new password
   * @memberof UserController
   */
  static async forgotPassword(req, res) {
    try {
      const { errors, isValid } = Validation.validateEmail(req.body);

      // Check validation
      if (!isValid) {
        return errorResponse(res, 400, errors);
      }

      const { email } = req.body;

      // Find user by email
      req.user = await User.findOne({ where: { email } });
      const { user } = req;
      // Check for user
      if (!user) {
        sendSignupMail(email);
      } else {
        const newReset = new Reset({
          id: user.id,
          email: req.body.email,
          reset_token: '',
          created_on: new Date(),
          expire_time: moment
            .utc()
            .add(process.env.TOKENEXPIRY, 'seconds')
            .toLocaleString()
        });

        // Generate Reset token
        const resetToken = await crypto.randomBytes(32).toString('hex');
        newReset.reset_token = await Hash.hash(resetToken);
        // Remove all reset token for this user if it exists
        await Reset.destroy({
          where: { email: newReset.dataValues.email }
        });
        await newReset.save();
        // Send reset link to user email
        await sendResetMail(user.dataValues, resetToken);
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
   */
  static async resetPassword(req, res) {
    try {
      const { errors, isValid } = Validation.validatePassword(req.body);

      // Check validation
      if (!isValid) {
        if (errors.password && errors.password === 'Passwords must match') {
          return errorResponse(res, 401, errors);
        }
        return errorResponse(res, 400, errors);
      }

      const { id } = req.params;
      const resetToken = req.query.token;
      const { password } = req.body;
      // Find user reset request by email
      req.data = {};
      req.data.userRequest = await Reset.findOne({ where: { id } });

      const { userRequest } = req.data;
      // Check if user has requested password reset

      if (userRequest) {
        // Check if reset token is not expired
        const { expire_time } = userRequest;
        const expireTime = moment.utc(expire_time);

        // If reset link is valid and not expired
        req.data.validReset =
          moment().isBefore(expireTime) &&
          Hash.compareWithHash(resetToken, req.data.userRequest.reset_token);
        const { validReset } = req.data;

        if (validReset) {
          // Store hash of new password in login
          const hashed = await Hash.hash(password);
          await Login.update(
            {
              token: '',
              password: hashed,
              logged_in: false,
              last_login: new Date()
            },
            { where: { email: userRequest.email } }
          );
          // Delete reset request from database
          await Reset.destroy({ where: { email: userRequest.email } });
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
