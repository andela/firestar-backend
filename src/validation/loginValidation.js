/* eslint-disable no-unused-vars */
import Joi from '@hapi/joi';

export const signInValidationSchema = Joi.object().keys({
  password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required()
    .error((errors) => ({
      message: 'Password must be at leat 8 character long, with at least an uppercase, lowercase, digit and special character'
    })),
  email: Joi.string().email({ minDomainSegments: 2 }).required()
    .error((errors) => ({
      message: 'Invalid login credentials'
    }))
});

export const validateData = (data, schema) => {
  const { error, value } = Joi.validate(data, schema);
  const values = { error, value };
  return values;
};
