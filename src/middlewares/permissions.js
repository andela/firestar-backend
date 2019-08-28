import Joi from '@hapi/joi';
import { Resource } from '../models';
import { permissionType, checkPermission, setPermissionSchema } from '../validation/permissions';

export const permit = async (req, res, next) => {
  const { roleId } = req.user;
  const permission = permissionType(req);
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
