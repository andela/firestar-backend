import datastore from '../models';

const { users, logins } = datastore;
/**
 * @class
 */
class userService {
  /**
   * @static
   * @param {string} email
   * @returns {string} loginAUser
   */
  static async loginAUser(email) {
    try {
      const loggedUser = await users.findOne({
        where: {
          email
        }
      });
      return loggedUser;
    } catch (error) {
      return error.message;
    }
  }

  /**
   * @static
   * @param {string} email
   * @returns {string} findLastLogin
   */
  static async findLastLogin(email) {
    try {
      const lastLogin = await logins.findOne({
        where: {
          email
        }
      });
      return lastLogin;
    } catch (error) {
      return error.message;
    }
  }

  /**
   * @static
   * @param {string} addUser
   * @returns {string} addLoggedInUser
   */
  static async addLoggedInUser(addUser) {
    try {
      return await logins.create(addUser);
    } catch (error) {
      return error.message;
    }
  }
}


export default userService;
