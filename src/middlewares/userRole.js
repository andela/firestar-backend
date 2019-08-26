import Joi from '@hapi/joi';

const setRoleSchema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .error(new Error('Invalid Email Provided')),
  roleId: Joi.number()
    .integer()
    .positive()
    .max(5)
    .error(new Error('Invalid Role ID Provided')),
  id: Joi.number()
    .integer()
    .positive()
    .optional(),
});

const validateSetRole = async (req, res, next) => {
  const { email, roleId } = req.body;
  try {
    if (!email) throw new Error('Email not provided');
    if (!roleId) throw new Error('No Role provided');
    await Joi.validate(req.body, setRoleSchema);
    next();
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export default validateSetRole;
