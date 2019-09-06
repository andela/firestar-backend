// import Helper from '../helpers/helperUtils';
import userService from '../services/userService';
import { jwtSignUser } from '../utils/index';
import { comparePassword } from '../helpers/comparePassword';
import { logins } from '../models';
/**
 * @class UsersController
 */
class UserController {
  /** Login User
   * @static
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * @returns {string} loginUsers
   */
  static async loginAUser(req, res) {
    const { email, password } = req.body;
    try {
      const loggedUser = await userService.loginAUser(email);
      const userDetail = {
        id: loggedUser.dataValues.id,
        email: loggedUser.dataValues.email,
      };
      if (loggedUser) {
        const validPassword = await comparePassword(
          loggedUser.password,
          password
        );
        if (validPassword) {
          const lastLogin = await userService.findLastLogin(
            loggedUser.dataValues.email
          );
          if (!lastLogin) {
            const saveUserLoggedTime = {
              email: loggedUser.dataValues.email,
              password: loggedUser.password,
            };
            await userService.addLoggedInUser(saveUserLoggedTime);
          } else {
            await logins.update({ lastLogin: new Date(), }, {
              where: {
                email: loggedUser.email
              }
            });
          }
          const token = await jwtSignUser(userDetail);
          const { id } = loggedUser.dataValues;
          return res.status(200).json({
            data: {
              token,
              id,
            },
            message: 'Welcome back, your login was successful',
          });
        }
        return res.status(401).json({
          error: 'Incorrect password.',
        });
      }
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message });
    }
  }
}

export default UserController;
