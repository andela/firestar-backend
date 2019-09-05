/* eslint-disable camelcase */
import userService from '../services/userservice';
import Util from '../utils/response';
import { jwtSignUser } from '../utils/index';
import { hashPassword } from '../helpers/hashpassword';


const util = new Util();
/**
 * @param { class } provide response to user signup activity.
 */
class userController {
  /**
 * @param {req} req that contains the req body object.
 * @param {res} res content to be rendered.
 * @returns {object} Success or failure response on adding a specific user
 */
  static async addUser(req, res) {
    const { user, emailToken } = req;
    try {
      const hashpassword = await hashPassword(user.password);
      user.password = hashpassword;
      const {
        id, email, firstName, lastName,
      } = await userService.addUser(user);
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
      util.setError(400, error.message);
      return util.send(res);
    }
  }
}

export default userController;
