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

const validateRole = async (body) => {
  await Joi.validate(body, setRoleSchema);
};
export default validateRole;
