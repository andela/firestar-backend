import validateRole from '../validation/roles';

const validateSetRole = async (req, res, next) => {
  const { email, roleId } = req.body;
  try {
    if (!email) throw new Error('Email not provided');
    if (!roleId) throw new Error('No Role provided');
    await validateRole(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export default validateSetRole;
