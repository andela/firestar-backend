/* eslint-disable require-jsdoc */
import validator from 'validatorjs';
import userService from '../services/userService';


/**
 * UsersValidation
 */

class UsersValidation {
  /**
   * @returns {object} ValidateUserSignInInput
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async ValidateUserSignIn(req, res, next) {
    let { email, password } = req.body;
    const constraint = {
      email: 'required|email',
      password: 'required',
    };

    // eslint-disable-next-line new-cap
    const validation = new validator(req.body, constraint);
    if (validation.fails()) {
      return res.status(400).json({
        status: 400,
        error: validation.errors.errors,
      });
    }
    email = email.toLowerCase().trim();
    try {
      const findIfUserExist = await userService.loginAUser(email);
      // const foundEmail = rows[0].email;
      if (!findIfUserExist) {
        return res.status(401).json({
          status: 401,
          error: `${req.body.email} does not exist, Please register an account or signup`,
        });
      }
      password = password.trim();
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
    req.body.email = email;
    req.body.password = password;
    return next();
  }
}
export default UsersValidation;
