/* eslint-disable require-jsdoc */
/* eslint-disable no-useless-catch */
import datastore from '../models';

const { Users } = datastore;
/**
 * @class
 */
class UserService {
  /**
   * @param {string} email
   */

  static async loginAUser(email) {
    try {
      const loggedUser = await Users.findOne({
        where: {
          email
        }
      });
      return loggedUser;
    } catch (error) {
      throw error;
    }
  }
}
export default UserService;
