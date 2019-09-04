/* eslint-disable no-useless-catch */
import db from '../models/index';
/**
 * @param { class } provide response to user signup activity.
 */
class userService {
  /**
   * @param { newUser } newUser to be added to database.
 * @returns {object} containing newly added user to the database
 */
  static async addUser(newUser) {
    try {
      return await db.users.create(newUser);
    } catch (error) {
      throw error;
    }
  }
}

export default userService;
