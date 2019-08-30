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
    const { email, password } = req.body;
    try {
      const loggedUser = await userService.loginAUser(email);
      if (loggedUser) {
        const validPassword = Helper.verifyPassword(loggedUser.password, password);
        if (validPassword) {
          const token = Helper.generateToken(loggedUser.dataValues);
          const { id } = loggedUser.dataValues;
          return res.status(200).json({
            data: {
              token,
              id
            },
            message: 'Welcome back, your login was successful',
          });
        }
        return res.status(401).json({
          error: 'Password does not match.',
        });
      }
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message });
    }
  }
}

export default UserController;
