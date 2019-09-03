import Joi from '@hapi/joi';
import { permission } from '../../models';

export const checkPermission = async (roleId, resourceId, permissions) => {
  try {
    // Base case to check if there is no roleId given
    if (!roleId) throw new Error('You are not authorized to perform this operation');
    // Find Permission if exists
    const foundPermission = await permission.findOne({
      attributes: [permissions],
      where: {
        roleId,
        resourceId
      }
    });
    if (!foundPermission) {
      throw new Error('You are not authorized to perform this operation');
    }
    // If Permission exists return the value of the permission
    const isPermitted = foundPermission.dataValues[permissions];
    if (isPermitted) return isPermitted;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const permissionType = (param) => {
  switch (param.method.toLowerCase()) {
    case 'get':
      return 'read';
    case 'post':
      return 'add';
    case 'delete':
      return 'delete';
    default:
      return 'edit';
  }
};

export const setPermissionSchema = Joi.object().keys({
  id: Joi.number()
    .integer()
    .positive()
    .optional(),
  resourceId: Joi.number()
    .integer()
    .required()
    .positive()
    .error(new Error('Invalid Resource ID Provided')),
  roleId: Joi.number()
    .integer()
    .positive()
    .max(5)
    .error(new Error('Invalid Role ID Provided')),
  edit: Joi.boolean()
    .optional()
    .error(new Error('Invalid permission type')),
  read: Joi.boolean()
    .optional()
    .error(new Error('Invalid permission type')),
  add: Joi.boolean()
    .optional()
    .error(new Error('Invalid permission type')),
  delete: Joi.boolean()
    .optional()
    .error(new Error('Invalid permission type'))
});
