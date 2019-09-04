/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import { signUpValidationSchema, validateData } from '../../helpers/validation/signupValidation';
import Util from '../../utils/response';

const util = new Util();

export const validationForSignUp = (req, res, next) => {
  const {
    email, password, firstName, lastName
  } = req.body;
  const signupBody = {
    email, password, firstName, lastName
  };
  try {
    const { error, value } = validateData(signupBody, signUpValidationSchema);
    const errMessage = error ? error.details[0].message : null;
    if (error) {
      util.setError(400, errMessage);
      return util.send(res);
    }

    req.user = value;
    return next();
  } catch (error) {
    util.setError(400, error);
    return util.send(res);
  }
};
