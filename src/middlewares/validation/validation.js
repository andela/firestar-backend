/* eslint-disable import/prefer-default-export */
import { signInValidationSchema, validateData } from '../../validation/loginValidation';
import Util from '../../utils/response';

const util = new Util();

export const validationForSignIn = (req, res, next) => {
  const {
    email, password
  } = req.body;
  const signupBody = {
    email, password
  };
  try {
    const { error, value } = validateData(signupBody, signInValidationSchema);
    const errMessage = error ? error.details[0].message : null;
    if (error) {
      util.setError(400, errMessage);
      return util.send(res);
    }

    req.user = value;
    return next();
  } catch (error) {
    util.setError(500, error);
    return util.send(res);
  }
};
