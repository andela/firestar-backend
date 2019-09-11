import models from '../models';
import emailValidation from '../helpers/validation';

const stringRegex = /^[a-z\s-.]+$/i;

const validateTripObj = (arr, err) => {
    const dateRegex = /([12]\d{3}-|\/(0?[1-9]|1[0-2])-|\/(0?[1-9]|[12]\d|3[01]))/;
  if (!Array.isArray(arr)) {
    err.trips = 'Invalid Trips';
    return err;
  }
  if (!arr.length) {
    err.trips = 'No trip selected';
    return err;
  }
  arr.forEach((obj, index) => {
    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
      err.trip = `Invalid Trip ${index + 1}`;
      return err;
    }
    if (!obj.to) {
      err[`trip ${index + 1} to`] = `No destination provided for the trip number ${index + 1}`;
    }
    if (!obj.from) {
      err[`trip ${index + 1} from`] = `No depature location provided for the trip number ${index + 1}`;
    }
    if (!obj.accommodationId) {
      err[`trip ${index + 1} accommodation`] = `No accommodation provided for the trip number ${index + 1}`;
    }
    if(!obj.tripDate){
        err[`trip ${index + 1} tripDate`] = `Trip date not provided for trip ${index + 1}`;
    }
    if (!validateInteger(obj.to) && obj.to) {
      err[`trip ${index + 1} to`] = `Invalid destination id provided for the trip number ${index + 1}`;
    }
    if (!validateInteger(obj.from) && obj.from) {
      err[`trip ${index + 1} from`] = `Invalid departure location id provided for the trip number ${index + 1}`;
    }
    if (!validateInteger(obj.accommodationId) && obj.accommodationId) {
      err[`trip ${index + 1} accommodation`] = `Invalid accommodation id provided for the trip number ${index + 1}`;
    }
      if (!dateRegex.test(obj.tripdate) && obj.tripDate) {
          err[`trip ${index + 1} tripDate`] = `Invalid Trip date format for trip ${index + 1}`;
      }
  });
};
const validateInput = async (req, res, next) => {
  req.body.reason = req.body.reason.trim();
  req.body.tripType = req.body.tripType.trim();
  const errors = {};
  const typeOfTrip = ['oneWay', 'return', 'multiCity'];
  const {
    reason, tripType, departmentId
  } = req.body;

  if (!reason) {
    errors.reason = 'Trip reason not provided';
  }
  if (!tripType) {
    errors.tripType = 'Type of trip not provided';
  }
  if(!departmentId){
      errors.department = `No department provided`
  }
  if (!stringRegex.test(reason) && reason) {
    errors.reason = 'Invalid travel reason';
  }
  if (!typeOfTrip.includes(tripType)) {
    errors.reason = 'Invalid trip type';
  }
  if (!validateInteger(departmentId) && !errors.departmentId){
      errors.department = `Invalid department provided`
  }
  await validateTripObj(req.body.trips, errors);
  if (Object.keys(errors).length) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }
  console.log(errors);
  next();
};

const validateInteger = (id) => {
  if (typeof id !== 'number' || !parseInt(id, 10)) {
    return false;
  }
  return true;
};

export default validateInput;
