/* eslint-disable import/prefer-default-export */
import {
  signUpValidationSchema, validateData, signInValidationSchema, validateSignInData
} from '../../helpers/validation/signupValidation';
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
    missingDetails = [`${response[0]} field cannot be Empty`, `${response[1]} field cannot be Empty`];
    break;
  case 3:
    missingDetails = [`${response[0]} field cannot be Empty`, `${response[1]} field cannot be Empty`, `${response[2]} field cannot be Empty`];
    break;
  case 4:
    missingDetails = [`${response[0]} field cannot be Empty`,
      `${response[1]} field cannot be Empty`, `${response[2]} field cannot be Empty`,
      `${response[3]} field cannot be Empty`];
    break;
  default:
    missingDetails = [`${response[0]} field cannot be Empty`];
    break;
  }

  if (response.length > 0) {
    util.setError(400, missingDetails);
    return util.send(res);
  }
  return next();
};

export const ValidateEmptySignUpBodyProperty = async (req, res, next) => {
  const response = await isMissingBodyProperty(req.body);

  let missingDetails;
  switch (response.length) {
  case 2:
    missingDetails = [`${response[0]} field is missing`, `${response[1]} field is missing`];
    break;
  case 3:
    missingDetails = [`${response[0]} field is missing`, `${response[1]} field is missing`, `${response[2]} field is missing`];
    break;
  case 4:
    missingDetails = [`${response[0]} field is missing`,
      `${response[1]} field is missing`, `${response[2]} field is missing`, `${response[3]} field is missing`];
    break;
  default:
    missingDetails = `${response[0]} field is missing`;
    break;
  }
  if (response.length > 0) {
    util.setError(400, missingDetails);
    return util.send(res);
  }
  return next();
};

export const validationForSignIn = (req, res, next) => {
  let {
    email, password
  } = req.body;

  if (req.body.email) {
    email = email.trim();
  }
  if (req.body.password) {
    password = password.trim();
  }

  const signInBody = {
    email, password
  };

  try {
    const { error, value } = validateSignInData(signInBody, signInValidationSchema);
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
