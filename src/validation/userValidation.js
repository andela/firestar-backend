import joiValidator from './joiValidator';
import Joi from '@hapi/joi';
import Util from '../utils/index';
const util = new Util();

export const validateProfileData = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      firstName: Joi.string().min(2),
      lastName: Joi.string().min(2),
      gender: Joi.string(),
      company: Joi.string(),
      lineManager: Joi.string(),
      birthDate: Joi.string(),
      department: Joi.string(),
      countryCode: Joi.string().min(2),
      preferredLanguage: Joi.string(),
      preferredCurrency: Joi.string(),
      residentialLocation: Joi.string().min(5).max(100)
    });
    const error = joiValidator(req.body, schema);
    if (!error) {
      return next();
    }
    util.setError(400, error[0])
    return util.send(res)
  } catch (error) {
    util.setError(500, 'Error processing data')
    return util.send(res)
  }
};
