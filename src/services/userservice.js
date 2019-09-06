/* eslint-disable no-useless-catch */
import db from '../models/index';
/**
 * @param { class } provide response to user signup activity.
 */
class userService {
  /**
   * @param { newUser } newUser to be added to user table.
 * @returns {object} containing newly added user to the database
 */
  static async addUser(newUser) {
    try {
      return await db.users.create(newUser);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param { newUser } newUser to be added to login table.
 * @returns {object} containing newly added user to login table.
 */
  static async addLogin(email, userlogged) {
    try {
      const userToLogin = await db.users.findOne({
        where: { email }
      });

      if (userToLogin) {
        const createdLoginUser = await db.logins.create(userlogged);
        return createdLoginUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param { email } email of user to be updated.
   * @param { updateUser } updateUser of user to be updated.
 * @returns {object} object containing recently details of user.
 */
  static async updateUserByEmail(email, updateUser) {
    try {
      const userToUpdate = await db.users.findOne({
        where: { email },
      });

      if (userToUpdate) {
        await db.users.update(updateUser, { where: { email } });

        return updateUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default userService;
