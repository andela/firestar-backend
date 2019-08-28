import { checkIfExistsInDb } from '../utils/searchDb';
import { Resource, Permission } from '../models';
/**
 * @class
 * @description Class based Permissions Controller
 */
class Permissions {
  /**
   * @description Sets the permission for a given role to a particular resource
   * @static
   * @param {object} req object
   * @param {object} res object
   * @returns {object } Updated Role information
   * @memberof Permissions
   * @type {object}
   */
  static async setPermissions(req, res) {
    let updatedPermissions;
    const { roleId } = req.params;
    const { resourceId, ...permissions } = req.body;
    try {
      // Check if Resource Exists
      await checkIfExistsInDb(Resource, resourceId, 'Resource does not exist');
      // Check If Permission alreday exists in Db
      const userPermission = await Permission.findOne({
        where: {
          roleId,
          resourceId,
        }
      });
      // Update Permission
      if (!userPermission) {
        updatedPermissions = await Permission.create({
          resourceId,
          roleId,
          ...permissions
        });
      } else {
        updatedPermissions = await Permission.update({
          ...permissions
        }, {
          returning: true,
          where: {
            resourceId,
            roleId
          }
        });
      }
      return res.status(200).json({
        status: 'success',
        data: updatedPermissions.dataValues
      });
    } catch (error) {
      res.status(404).json({
        status: 'error',
        mesage: error.message
      });
    }
  }
}

export default Permissions;
