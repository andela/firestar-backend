import { checkIfExistsInDb } from '../utils/checkDb';
import { Resource, Permission, Role } from '../models';
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
    const { roleId } = req.params;
    const { resourceId, ...permissions } = req.body;
    try {
      // Check if Role Exists
      await checkIfExistsInDb(Role, roleId, 'Role does not exist');
      // Check if Resource Exists
      await checkIfExistsInDb(Resource, resourceId, 'Resource does not exist');
      // Update Permission

      const updatedPermissions = await Permission.update({
        edit: permissions.edit,
        read: permissions.read
      }, {
        returning: true,
        where: {
          resourceId,
          roleId
        }
      });
      return res.status(200).json({
        status: 'success',
        data: updatedPermissions[1][0]
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
