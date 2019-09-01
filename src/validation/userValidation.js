/* eslint-disable require-jsdoc */
import Validator from 'validatorjs';
import userService from '../services/userService';


/**
 * UsersValidation
 */

class UsersValidation {
  /**
   * @returns {object} ValidateUserSignIn
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async ValidateUserSignIn(req, res, next) {
    let { email, password } = req.body;
    const constraint = {
      email: 'required|email|min:12|max:30',
      password: 'required|min:8|max:14|alpha_num',
    };
    const validation = new Validator(req.body, constraint);
    if (validation.fails()) {
      return res.status(400).json({
        error: validation.errors.errors,
      });
    }
    email = email.toLowerCase().trim();
    try {
      const findIfUserExist = await userService.loginAUser(email);
      if (!findIfUserExist) {
        return res.status(401).json({
          error: 'Email does not exist, Please register an account or signup',
        });
      }
      password = password.trim();
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
    req.body.email = email;
    req.body.password = password;
    return next();
  }
}
export default UsersValidation;