import validateRole from '../helpers/validation/roles';
import { role } from '../models';
import { checkIfExistsInDb, findByEmail } from '../utils/searchDb';

export const validateSetRole = async (req, res, next) => {
  const { email, roleId } = req.body;
  try {
    if (!email) throw new Error('Email not provided');
    if (!roleId) throw new Error('No Role provided');
    await validateRole(req.body);
    await checkIfExistsInDb(role, roleId, 'Role does not exist');
    await findByEmail(email);
    next();
  } catch (error) {
    return res.status(error.status || 400).json({
      success: false,
      message: error.message
    });
  }
};

export const permit = (roles = []) => (req, res, next) => {
  const { roleId } = req.user;
  try {
    // Find resource by name in the db if it exists
    if (roles.length > 0 && !roles.includes(roleId)) {
      throw new Error('You are not authorized to perform this operation');
    }
    next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: error.message
    });
  }
};
