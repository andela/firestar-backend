import { Router } from "express";
import moment from "moment";
import crypto from "crypto";
import Validation from "../validation";
import { sendResetMail, sendSignupMail } from "../services/sendMail";
import { errorResponse, successResponse } from "../utils/response";
import Hash from "../utils/hash";
import models from "../models";

const { User, Login, Reset } = models;

export default class UserController {
  static async forgotPassword(req, res) {
    try {
      const { errors, isValid } = Validation.validateEmail(req.body);

      // Check validation
      if (!isValid) {
        return errorResponse(res, 400, errors);
      }

      const { email } = req.body;

      // Find user by email
      let user = await User.findOne({ where: { email } });
      // Check for user
      if (!user) {
        return sendSignupMail(user);
      }

      const newReset = new Reset({
        id: user.id,
        email: req.body.email,
        reset_token: "",
        created_on: new Date(),
        expire_time: moment
          .utc()
          .add(process.env.TOKENEXPIRY, "seconds")
          .toLocaleString()
      });

      // Generate Reset token
      const resetToken = await crypto.randomBytes(32).toString("hex");
      newReset.reset_token = await Hash.hash(resetToken);
      // Remove all reset token for this user if it exists
      await Reset.destroy({
        where: { email: newReset.dataValues.email }
      });
      await newReset.save();
      // Send reset link to user email
      await sendResetMail(user.dataValues, resetToken);
      successResponse(res, 200, "Check your mail for further instruction");
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
        if (errors.password && errors.password === "Passwords must match") {
          return errorResponse(res, 409, errors);
        }
        return errorResponse(res, 400, errors);
      }

      const { id } = req.params;
      const resetToken = req.query.token;
      const { password } = req.body;

      // Find user by email
      const user = await Reset.findOne({ where: { id } });
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
          const hashed = await Hash.hash(password);
          await Login.update(
            {
              token: "",
              password: hashed,
              logged_in: false,
              last_login: new Date()
            },
            { where: { email: user.email } }
          );
          // Delete reset request from database
          await Reset.destroy({ where: { email: user.email } });
          return successResponse(res, 200, "Password Updated successfully");
        }
        return errorResponse(res, 400, "Invalid or expired reset token");
      }
      return errorResponse(res, 400, "Invalid or expired reset token");
    } catch (error) {
      return errorResponse(res, 500, error);
    }
  }
}
