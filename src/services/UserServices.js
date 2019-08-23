/* eslint-disable no-useless-catch */
/* eslint-disable require-jsdoc */
import db from '../models';

class UserService {
  static async getAuser(id) {
    try {
      const theUser = await db.Users.findOne({
        where: { id: Number(id) }
      });
      return theUser;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
