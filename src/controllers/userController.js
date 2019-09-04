import moment from 'moment';
import crypto from 'crypto';
import { sendResetMail, sendSignupMail } from '../services/sendMail';
import Response from '../utils/response';
import Hash from '../utils/hash';
import models from '../models';

const { User, Login, Reset } = models;
const { errorResponse, successResponse } = Response;

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
      const user = await User.findOne({ where: { email } });
      // Check for user
      if (!user) {
        const mailSent = sendSignupMail(email);
        if (!mailSent) {
          return errorResponse(res, 500, 'Error in sending email');
        }
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
        // console.log('newReset', newReset);
        await newReset.save();
        // Send reset link to user email
        const mailSent = sendResetMail(user, resetToken);
        if (!mailSent) {
          return errorResponse(res, 500, 'Error in sending email');
        }
      }
      successResponse(res, 200, 'Check your mail for further instruction');
    } catch (error) {
      // return errorResponse(res, 500, error);
      throw error;
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
      const { userId } = req.params;
      const resetToken = req.query.token;
      const { password } = req.body;

      // Find user by user id
      const user = await User.findOne({ where: { id: userId } });
      let userRequestReset;

      // Find user reset request by email
      user
        ? (userRequestReset = await Reset.findOne({
            where: { email: user.email }
          }))
        : null;

      // Check if user has requested password reset
      if (user && userRequestReset) {
        // Check if reset token is not expired
        const { expireTime } = userRequestReset;
        const tokenExpireTime = moment.utc(expireTime);

        // If reset link is valid and not expired
        const validReset =
          moment().isBefore(tokenExpireTime) &&
          Hash.compareWithHash(resetToken, userRequestReset.resetToken);

        if (validReset) {
          // Store hash of new password in login
          const hashed = await Hash.hash(password);
          await Login.update(
            {
              token: '',
              password: hashed,
              lastLogin: new Date()
            },
            { where: { email: userRequestReset.email } }
          );
          // Delete reset request from database
          await Reset.destroy({ where: { email: userRequestReset.email } });
          return successResponse(res, 200, 'Password updated successfully');
        }
        return errorResponse(res, 400, 'Invalid or expired reset token');
      }
      return errorResponse(res, 400, 'Invalid or expired reset token');
    } catch (error) {
      // return errorResponse(res, 500, error);
      throw error;
    }
  }
}
