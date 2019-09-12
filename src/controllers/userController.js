import moment from 'moment';
import crypto from 'crypto';
import { sendResetMail, sendSignupMail } from '../services/sendMail';
import Response from '../utils/response';
import Hash from '../utils/hash';
import db from '../models';
import userService from '../services/userservice';
import { jwtSignUser } from '../utils/index';
import { hashPassword } from '../helpers/hashpassword';

import Helper from '../middlewares/index';
const { findUserById, updateUser } = userService;

const util = new Response();

const { users, logins, resets } = db;
const { errorResponse, successResponse } = Response;

/**
 @description Class based Controller for Roles
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
    // user.roleId = 5;
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
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        util.setError(500, 'roles Table must be seeded with all roles value before a user can signup');
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
   * @returns {UserController} A reset link for new password
   * @memberof UserController
   * @type {object} return an object
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
        newReset.resetToken = await Hash.hash(resetToken);

        // Remove all reset token for this user if it exists
        await resets.destroy({
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
          await logins.update(
            {
              token: '',
              password: hashed,
              lastLogin: new Date()
            },
            { where: { email: userRequestReset.email } }
          );
          // Delete reset request from database
          await resets.destroy({ where: { email: userRequestReset.email } });
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
      const updatedUser = await db.users.update({ roleId },
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

  /**
   * get user profile
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @returns {Object} - custom response
   * @description get details of registered user
   */
  static async getUserProfile(req, res) {

    const { id } = req.params;
    const converToString = req.result.id.toString()
    if (converToString !== id) {
      util.setError(403, 'Unauthorized')
      return util.send(res)
    }
    try {
      const user = await findUserById(id);
      const token = await jwtSignUser(id);

      if (!user) {
        util.setError(401, `User with id: ${id} not found`);
        return util.send(res);
      }
      util.setSuccess(200, 'Succesfully found user', {
        user,
        token
      });
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  /**
  * update user profile
  * @param {Object} req - server request
  * @param {Object} res - server response
  * @returns {Object} - custom response
  * @description get's details of registered user
  */
  static async updateUserProfile(req, res) {
    const { id } = req.params;

    if (req.result.id !== id) {
      util.setError(403, 'Unauthorized')
      return util.send(res)
    }

    const {
      firstName, lastName, username, dateOfBirth, preferredLanguage,
      preferredCurrency, gender, company, lineManager,
      residentialLocation, countryCode, department, phoneNumber
    } = req.body;

    try {
      const userDetails = {
        firstName, lastName, username, dateOfBirth, preferredLanguage,
        preferredCurrency, gender, company, lineManager,
        residentialLocation, countryCode, department, phoneNumber
      };
      const updatedUser = await updateUser(id, userDetails);

      delete updatedUser.saveProfile
      delete updatedUser.isVerified

      util.setSuccess(
        201,
        'You ve successfully updated your profile',
        updatedUser
      );
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }
}
