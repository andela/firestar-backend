/* eslint-disable import/prefer-default-export */
import { signUpValidationSchema, validateData } from '../../helpers/validation/signupValidation';
import Util from '../../utils/response';
import { isEmptyBody, isMissingBodyProperty } from '../../utils/index';


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

export const ValidationForEmptySignUpBody = (req, res, next) => {
  if (isEmptyBody(req.body)) {
    util.setError(400, 'Email, firstname, lastname and password is required');
    return util.send(res);
  }
  return next();
};

export const ValidateEmptySignUpBodyProperty = async (req, res, next) => {
  const response = await isMissingBodyProperty(req.body);
  const missingDetails = response.length < 3 ? response.join(' and ') : response.join(' , ');
  const errMessage = `${missingDetails} is missing`;
  if (response.length > 0) {
    util.setError(400, errMessage);
    return util.send(res);
  }
  return next();
};
