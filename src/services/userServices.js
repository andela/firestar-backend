/* eslint-disable no-useless-catch */
/* eslint-disable require-jsdoc */
import db from '../models';

class UserService {
    static async getUser(id) {
        try {
            const theUser = await db.Users.findOne({
                where: { id }
            });
            return theUser;
        } catch (error) {
            throw error;
        }
    }

    static async updateUser(id, user) {
        try {
            const userToUpdate = await db.Users.findOne({
                where: { id }
            });
            if (userToUpdate) {
                const Users = await db.Users.update(user, {
                    where: { id },
                    returning: true
                });
                console.log(Users[1])
                return Users[1][0].dataValues;
            }
            return null;
        } catch (error) {
            console.log('the error is here', error)
            throw error;
        }
    }
}

export default UserService;
