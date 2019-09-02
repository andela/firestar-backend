import Helper from '../helpers/helperUtils';
import authService from '../services/authService';
/**
 * @class UsersController
 */
class AuthController {
  /** Login User
   * @static
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * @returns {string} loginUsers
   */
  static async loginAUser(req, res) {
    const { email, password } = req.body;
    try {
      const loggedUser = await authService.loginAUser(email);
      const userDetail = {
        id: loggedUser.dataValues.id,
        email: loggedUser.dataValues.email
      };
      if (loggedUser) {
        const validPassword = Helper.verifyPassword(loggedUser.password, password);
        if (validPassword) {
          const token = Helper.generateToken(userDetail);
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
          error: 'Incorrect password.',
        });
      }
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message });
    }
  }
}

export default AuthController;
