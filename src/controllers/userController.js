/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
import userService from '../services/userService';
/**
 * @class UsersController
 */
class UserController {
  /** Login User
   * @static
   * @returns {object} loginUsers
   * @params {*} req
   * @params {*} res
   */
  static async loginAUser(req, res) {
    const { email } = req.body;
    try {
      const loggedUser = await userService.loginAUser(email);
      // console.log(loggedUser.dataValues);
      if (!loggedUser) {
        return res.status(404).json({
          status: 404,
          message: `cannot find user with this ${email}`,
        });
      }
      return res.status(200).json({
        status: 200,
        message: `Welcome back ${loggedUser.first_name}, your login was successful`,
      });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message });
    }
  }
}

export default UserController;
