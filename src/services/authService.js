import datastore from '../models';

const { logins } = datastore;
/**
 * @class
 */
class AuthService {
  /**
   * @static
   * @param {string} email
   * @returns {string} loginAUser
   */
  static async loginAUser(email) {
    try {
      const loggedUser = await logins.findOne({
        where: {
          email
        }
      });
      return loggedUser;
    } catch (error) {
      return error.message;
    }
  }
}
export default AuthService;
