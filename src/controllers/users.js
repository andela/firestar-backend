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
 * @returns {object } Sets Role for a given user
 * @memberof Roles
 * @type {object}
 */
  static async changeRole(req, res) {
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
      res.status(404).json({
        status: 'error',
        message: error.message
      });
    }
  }
}


export default Users;
