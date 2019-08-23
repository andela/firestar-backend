import { Router } from 'express';
import moment from 'moment';
import crypto from 'crypto';
import Validation from '../validation';
import { sendResetMail, sendSignupMail } from '../services/sendMail';
import { errorResponse, successResponse } from '../utils/response';
import Hash from '../utils/hash';
import models from '../models';

const { User, Login, Reset } = models;

const forgotPassword = (req, res) => {
  const { errors, isValid } = Validation.validateEmail(req.body);

  // Check validation
  if (!isValid) {
    return errorResponse(res, 400, errors);
  }

  const { email } = req.body;

  // Find user by email
  User.findOne({ where: { email } }).then((user) => {
    // Check for user
    if (!user) {
      return sendSignupMail(user);
    }

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
    const resetToken = crypto.randomBytes(32).toString('hex');
    Hash.hash(resetToken).then((resetHash) => {
      newReset.reset_token = resetHash;
      // Remove all reset token for this user if it exists
      Reset.findOne({
        where: {
          email: newReset.dataValues.email
        }
      }).then(() => {
        return Reset.destroy({
          where: { email: newReset.dataValues.email }
        })
          .then(() => {
            newReset
              .save()
              // Send reset link to user email
              .then(() => {
                sendResetMail(user.dataValues, resetToken);
              });
          })
          .then(() =>
            successResponse(res, 200, 'Check your mail for further instruction')
          )
          .catch(error => errorResponse(res, 500, error));
      });
    });
  });
};

/**
 * @description Resets a user password
 * @static
 * @param {*} req
 * @param {*} res
 * @returns Promise {UserController} A new password record
 * @memberof UserController
 */
const resetPassword = (req, res) => {
  const { errors, isValid } = Validation.validatePassword(req.body);

  // Check validation
  if (!isValid) {
    return errorResponse(res, 400, errors);
  }

  const { id } = req.params;
  const resetToken = req.query.token;
  const { password } = req.body;

  // Find user by email
  Reset.findOne({ where: { id } }).then(user => {
    // Check if user has requested password reset
    if (user) {
      // Check if reset token is not expired
      const expireTime = moment.utc(user.expire_time);

      // If reset link is valid and not expired
      if (
        moment().isBefore(expireTime) &&
        Hash.compareWithHash(resetToken, user.reset_token)
      ) {
        // Store hash of new password in login
        Hash.hash(password)
          .then(hashed => {
            Login.update(
              {
                token: '',
                password: hashed,
                logged_in: false,
                last_login: new Date()
              },
              { where: { email: user.email } }
            );
          })
          // Delete reset request from database
          .then(() => Reset.destroy({ where: { email: user.email } }))
          .catch(error => errorResponse(res, 500, error));
        return successResponse(res, 200, 'Password Updated successfully');
      }
      return errorResponse(res, 400, 'Invalid or expired reset token');
    }
    return errorResponse(res, 400, 'Invalid or expired reset token');
  });
};

export default {
  forgotPassword,
  resetPassword
};
