import moment from 'moment';
import crypto from 'crypto';
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
      const { email } = req.body;

      // Find user by email
      req.user = await User.findOne({ where: { email } });
      const { user } = req;
      // Check for user
      if (!user) {
        sendSignupMail(email);
      } else {
        const newReset = new Reset({
          email: user.email,
          resetToken: '',
          expireTime: moment
            .utc()
            .add(process.env.TOKENEXPIRY, 'seconds')
            .toLocaleString()
        });

        // Generate Reset token
        const resetToken = await crypto.randomBytes(32).toString('hex');
        newReset.resetToken = await Hash.hash(resetToken);
        // Remove all reset token for this user if it exists
        await Reset.destroy({
          where: { email: newReset.dataValues.email }
        });
        const resetDetails = await newReset.save();
        // Send reset link to user email
        await sendResetMail(resetDetails, resetToken);
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
        const { expireTime } = userRequest;
        const tokenExpireTime = moment.utc(expireTime);

        // If reset link is valid and not expired
        req.data.validReset =
          moment().isBefore(tokenExpireTime) &&
          Hash.compareWithHash(resetToken, userRequest.resetToken);
        const { validReset } = req.data;

        if (validReset) {
          // Store hash of new password in login
          const hashed = await Hash.hash(password);
          await Login.update(
            {
              token: '',
              password: hashed,
              logged_in: false,
              lastLogin: new Date()
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
