/* eslint-disable valid-jsdoc */
import Helper from '../helpers/helperUtils';
import userService from '../services/userService';
/**
 * @class UsersController
 */
class UserController {
  /** Login User
   * @static
   * @params {*} req
   * @params {*} res
   * @returns {object} loginUsers
   */
  static async loginAUser(req, res) {
    const { email } = req.body;
    try {
      const loggedUser = await userService.loginAUser(email);
      if (loggedUser) {
        const validatePassword = Helper.verifyPassword(loggedUser.password, req.body.password);
        if (validatePassword) {
          const token = Helper.generateToken(loggedUser.dataValues);
          const { id } = loggedUser.dataValues;
          return res.status(200).json({
            status: 200,
            data: {
              token,
              id
            },
            message: 'Welcome back, your login was successful',
          });
        }
        return res.status(401).json({
          status: 401,
          error: 'Password does not match.',
        });
      }
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message });
    }
  }
}

export default UserController;
