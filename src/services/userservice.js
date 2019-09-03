/* eslint-disable no-useless-catch */
import db from '../models/index';
/**
 * @param { class } provide response to user signup activity.
 */
class userService {
  /**
 * @returns {object} of all query data from databas
 */
  static async getAllUser() {
    try {
      return await db.users.findAll();
    } catch (error) {
      throw error;
    }
  }

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

  /**
   * @param { id } id of user to be updated.
   * @param { updateUser } updateUser of user to be updated.
 * @returns {object} object containing recently details of user.
 */
  static async updateUser(id, updateUser) {
    try {
      const userToUpdate = await db.users.findOne({
        where: { id: Number(id) },
      });

      if (userToUpdate) {
        await db.users.update(updateUser, { where: { id: Number(id) } });

        return updateUser;
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

  /**
   * @param { id } id of user to get.
 * @returns {object} object of user detail returned by the given id.
 */
  static async getAUser(id) {
    try {
      const theUser = await db.users.findOne({
        where: { id: Number(id) },
      });

      return theUser;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param { id } id of user to delete.
 * @returns {object} object of user deleted from the database.
 */
  static async deleteUser(id) {
    try {
      const userToDelete = await db.users.findOne({ where: { id: Number(id) } });

      if (userToDelete) {
        const deletedUser = await db.users.destroy({
          where: { id: Number(id) },
        });
        return deletedUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default userService;
