/* eslint-disable no-useless-catch */
/* eslint-disable require-jsdoc */
import db from '../models';

class UserService {
  static async updateUser(id, updateduser) {
    try {
      const userToUpdate = await db.Users.findOne({
        where: { id }
      });
      if (userToUpdate) {
        await db.Users.update(updateduser, {
          where: { id }
        });
        return updateduser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
