import { permission } from '../models';
/**
 * @class
 * @description Class based Permissions Controller
 */
class Roles {
  /**
   * @description Sets the permission for a given role to a particular resource
   * @static
   * @param {object} req object
   * @param {object} res object
   * @param {method} next method
   * @returns {object } Updated Role information
   * @memberof Permissions
   * @type {object}
   */
  static async setPermissions(req, res, next) {
    let updatedPermissions;
    const { roleId } = req.params;
    const { resourceId, ...permissions } = req.body;
    try {
      // Check If Permission alreday exists in Db
      const userPermission = await permission.findOne({
        where: {
          roleId,
          resourceId,
        }
      });
      // Create Permissions if does not exists
      if (!userPermission) {
        updatedPermissions = await permission.create({
          resourceId,
          roleId,
          ...permissions
        });
        return res.status(201).json({
          status: 'success',
          data: updatedPermissions.dataValues
        });
      }
      // Update Permission
      updatedPermissions = await permission.update({
        ...permissions
      }, {
        returning: true,
        where: {
          resourceId,
          roleId
        }
      });
      return res.status(200).json({
        status: 'success',
        data: updatedPermissions[1][0].dataValues
      });
    } catch (error) {
      error.status = 404;
      next(error);
    }
  }
}

export default Roles;
