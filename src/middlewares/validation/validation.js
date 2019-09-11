/* eslint-disable import/prefer-default-export */
import { signUpValidationSchema, validateData } from '../../helpers/validation/signupValidation';
import Util from '../../utils/response';
import { isEmptyBody, isMissingBodyProperty, isMissingBodyPropertyValue } from '../../utils/index';


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

export const EmptySignUpBodyPropertyValue = async (req, res, next) => {
  const response = await isMissingBodyPropertyValue(req.body);
  let missingDetails;
  switch (response.length) {
  case 2:
    missingDetails = response.join(' and ');
    break;
  case 3:
    missingDetails = `${response.slice(0, 2).join(' , ')} and ${response[2]}`;
    break;
  case 4:
    missingDetails = `${response.slice(0, 3).join(' , ')} and ${response[3]}`;
    break;
  default:
    missingDetails = response.join('');
    break;
  }

  const errMessage = `${missingDetails} field cannot be Empty`;

  if (response.length > 0) {
    util.setError(400, errMessage);
    return util.send(res);
  }
  return next();
};

export const ValidateEmptySignUpBodyProperty = async (req, res, next) => {
  const response = await isMissingBodyProperty(req.body);
  let missingDetails;
  switch (response.length) {
  case 2:
    missingDetails = response.join(' and ');
    break;
  case 3:
    missingDetails = `${response.slice(0, 2).join(' , ')} and ${response[2]}`;
    break;
  default:
    missingDetails = response.join('');
    break;
  }

  const errMessage = `${missingDetails} field is missing`;

  if (response.length > 0) {
    util.setError(400, errMessage);
    return util.send(res);
  }
  return next();
};
