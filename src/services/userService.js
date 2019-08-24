/* eslint-disable no-useless-catch */
/* eslint-disable require-jsdoc */
import datastore from '../models';

const { Users } = datastore;
/**
 * @class
 */
class UserService {
  /**
   * @param {*} email
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
