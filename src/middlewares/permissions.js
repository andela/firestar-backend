import Joi from '@hapi/joi';
import { Resource, Role, Permission } from '../models';

const checkPermission = async (roleId, resourceId, permission) => {
  try {
    // Base case to check if there is no roleId given
    if (!roleId) return false;
    // Find Permission if exists
    const foundPermission = await Permission.findOne({
      attributes: [permission],
      where: {
        roleId,
        resourceId
      }
    });
    if (!foundPermission || !foundPermission.dataValues[permission]) {
      throw new Error('You are not authorized to perform this operation');
    }
    // If Permission exists return the value of the permission
    const isPermitted = foundPermission.dataValues[permission];
    if (isPermitted) return isPermitted;
    // If permission does not exist
    // Get Role's ParentId
    const role = await Role.findOne({
      where: {
        id: roleId
      }
    });
    const { parentId } = role.dataValues;
    // Check via recursion if parent role has the permission
    return checkPermission(parentId, resourceId, permission);
  } catch (error) {
    throw new Error(error.message);
  }
};

const permissiontype = (param) => {
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
export const permit = async (req, res, next) => {
  const { roleId } = req.user;
  const permission = permissiontype(req);
  try {
    // Find resource by name in the db if it exists
    const resource = await Resource.findOne({
      where: {
        name: req.url.split('/')[1]
      }
    });
    const resourceId = resource.dataValues.id;
    const authorized = await checkPermission(roleId, resourceId, permission);
    if (authorized) {
      return next();
    }
    throw new Error('You are not authorized to perform this operation');
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: error.message
    });
  }
};

const setPermissionSchema = Joi.object().keys({
  id: Joi.number()
    .integer()
    .positive()
    .optional(),
  resourceId: Joi.number()
    .integer()
    .positive()
    .max(15)
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

export const validateSetPermission = async (req, res, next) => {
  const { resourceId } = req.body;
  const { roleId } = req.params;
  try {
    if (!resourceId) throw new Error('Resource not provided');
    if (!roleId) throw new Error('No Role provided');
    await Joi.validate(req.body, setPermissionSchema);
    next();
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};
