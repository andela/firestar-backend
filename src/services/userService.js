import models from '../models';

const { User, Login } = models;
/**
 * @class
 */
class userService {
  /**
   * @static
   * @param {string} email
   * @returns {string} loginAUser
   */
  static async findUserInUsersDb(email) {
    try {
      const loggedUser = await User.findOne({
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
  static async findUserInLoginsDb(email) {
    try {
      const lastLogin = await Login.findOne({
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
  static async addUserInLogins(addUser) {
    try {
      return await Login.create(addUser);
    } catch (error) {
      return error.message;
    }
  }

  /**
   * @static
   * @param {string} addUser
   * @returns {string} addLoggedInUser
   */
  static async updateLogins(addUser) {
    try {
      return await Login.update({
        where: {
          email: addUser.email
        }
      });
    } catch (error) {
      return error.message;
    }
  }
}

export default userService;
