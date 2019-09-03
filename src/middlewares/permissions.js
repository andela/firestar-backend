import Joi from '@hapi/joi';
import { resource } from '../models';
import { checkIfExistsInDb } from '../utils/searchDb';
import { permissionType, checkPermission, setPermissionSchema } from '../helpers/validation/permissions';

export const permit = async (req, res, next) => {
  const { roleId } = req.user;
  const permission = permissionType(req);
  try {
    // Find resource by name in the db if it exists
    const foundResource = await resource.findOne({
      where: {
        name: req.route.path
      }
    });
    const resourceId = foundResource.dataValues.id;
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


export const validateSetPermission = async (req, res, next) => {
  const { resourceId, ...permissions } = req.body;
  const { roleId } = req.params;
  try {
    // Check if Resource Exists
    if (Object.keys(permissions).length < 1) throw new Error('No permission provided');
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

export const checkResource = async (req, res, next) => {
  const { resourceId } = req.body;
  try {
    await checkIfExistsInDb(resource, resourceId, 'Resource does not exist');
    next();
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
