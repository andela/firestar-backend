import database from '../models/User';

class userService {
  static async getAllBUser() {
    try {
      return await database.user.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addUser(newUser) {
    try {
      return await database.user.create(newUser);
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(id, updateBook) {
    try {
      const bookToUpdate = await database.user.findOne({
        where: { id: Number(id) },
      });

      if (bookToUpdate) {
        await database.user.update(updateBook, { where: { id: Number(id) } });

        return updateBook;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAUser(id) {
    try {
      const theBook = await database.user.findOne({
        where: { id: Number(id) },
      });

      return theBook;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      const bookToDelete = await database.user.findOne({ where: { id: Number(id) } });

      if (bookToDelete) {
        const deletedBook = await database.user.destroy({
          where: { id: Number(id) },
        });
        return deletedBook;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default userService;
