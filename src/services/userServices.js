import db from '../models';
const { Users } = db;
import Util from '../utils/index'

const util = new Util()
class UserService {
  static async findUserById(id) {
    try {
      const user = await Users.findOne({
        where: { id }
      });
      return user;
    } catch (error) {
      throw error
    }
  }

  static async updateUser(id, user) {
    try {
      const userToUpdate = await Users.findOne({
        where: { id }
      });
      if (userToUpdate) {
        const Users = await db.Users.update(user, {
          where: { id },
          returning: true
        });
        return Users[1][0].dataValues;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
