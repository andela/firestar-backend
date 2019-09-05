import { user } from '../models';

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
 * @returns { object } Sets Role for a given user
 * @memberof Roles
 * @type {object}
 */
  static async changeRole(req, res, next) {
    const { email, roleId } = req.body;
    try {
      const updatedUser = await user.update({ roleId },
        {
          returning: true,
          plain: true,
          where: {
            email: email.trim()
          }
        });
      return res.status(200).json({
        status: 'success',
        data: updatedUser[1].dataValues
      });
    } catch (error) {
      error.status = 404;
      return next(error);
    }
  }
}

export default Users;
