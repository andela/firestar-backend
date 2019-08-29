import { findByEmail, checkIfExistsInDb } from '../utils/searchDb';
import { User, Role } from '../models';

/**
 * @description Class based Controller for Roles
 */
class Users {
/**
 * @description Sets the permission for a given role to a particular resource
 * @static
 * @param {object} req object
 * @param {object} res object
 * @param {method} next method
 * @returns {object } Sets Role for a given user
 * @memberof Roles
 * @type {object}
 */
  static async changeRole(req, res, next) {
    const { email, roleId } = req.body;
    try {
      await findByEmail(email);
      await checkIfExistsInDb(Role, roleId, 'Role does not exist');
      const updatedUser = await User.update(
        { roleId },
        {
          returning: true,
          where: {
            email
          }
        }
      );
      return res.status(200).json({
        status: 'success',
        data: updatedUser[1][0]
      });
    } catch (error) {
      error.status = 404;
      next(error);
    }
  }
}

export default Users;
