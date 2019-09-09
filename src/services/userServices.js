import db from '../models';
const { users } = db;

/** Class representing user controller */
class UserService {
  /**
 * Helper function to find a user by id
 * @param {Integer} id - user's id
 * @returns {Promise} - sequelize response
*/
  static async findUserById(id) {
    try {
      const user = await users.findOne({
        where: { id }
      });
      return user;
    } catch (error) {
      throw error
    }
  }

  /**
 * Helper function to find and update user
 * @returns {Promise} - sequelize response
 * @param {Integer} id - user's id
 * @param {Object} user
*/
  static async updateUser(id, user) {
    try {
      const userToUpdate = await users.findOne({
        where: { id }
      });
      if (userToUpdate) {
        const newProfile = await db.users.update(user, {
          where: { id },
          returning: true
        });
        return newProfile[1][0].dataValues;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
