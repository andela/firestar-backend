import moment from 'moment';
import crypto from 'crypto';
import { sendResetMail, sendSignupMail } from '../services/sendMail';
import Response from '../utils/response';
import Hash from '../utils/hash';
import models from '../models';
import userService from '../services/userService';
import { jwtSignUser } from '../utils/index';

const { User, Login, Reset } = models;
const { errorResponse, successResponse } = Response;
const { findUserInUsersDb } = userService;
const { compareWithHash } = Hash;


/**
 * @class UsersController
 * @description Class based Controller for Roles
*/
export default class UserController {
  /** Login User
   * @description Logins a user
   * @static
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * @returns {string} loginUsers
   */
  static async loginAUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await findUserInUsersDb(email);
      if (!user) {
        return errorResponse(res, 404, 'You don\'t have have an account. Please signup');
      }

      const loggedUser = await Login.findOne({ where: { email } });

      if (loggedUser) {
        const correctPassword = await compareWithHash(password, loggedUser.password);
        if (!correctPassword) {
          return errorResponse(res, 401, 'Email or password incorrect');
        }
        const loginData = {
          lastLogin: new Date(),
        };

        const token = await jwtSignUser({
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isVerified: user.isVerified,
          lastLogin: loggedUser.lastLogin
        });

        await userService.updateLogins(loginData);
        return res.status(200).json({
          message: 'Welcome back, your login was successful',
          token,
        });
      }
      return errorResponse(res, 401, 'Email or password incorrect');
    } catch (error) {
      return errorResponse(res, 500, error);
    }
  }

  /**
   * @description Generate link to reset a user password
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {UserController} A reset link for new password
   * @memberof UserController
   * @type {object} return an object
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
      return errorResponse(res, 500, error);
    }
  }

  /**
   * @description Resets a user password
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {UserController} A new password record
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
        const validReset = moment().isBefore(tokenExpireTime)
          && Hash.compareWithHash(resetToken, userRequestReset.resetToken);

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
      return errorResponse(res, 500, error);
    }
  }

  /**
 * @description Sets the permission for a given role to a particular resource
 * @static
 * @param {object} req object
 * @param {object} res object
 * @param {method} next method
 * @returns { object } Sets Role for a given user
 * @memberof Roles
 * @type {object}
 */
  static async changeRole(req, res, next) {
    const { email, roleId } = req.body;
    try {
      const updatedUser = await models.User.update({ roleId },
        {
          returning: true,
          plain: true,
          where: {
            email
          }
        });
      return res.status(200).json({
        status: 'success',
        data: updatedUser[1].dataValues
      });
    } catch (error) {
      error.status = 404;
      return next(error);
    }
  }
}
