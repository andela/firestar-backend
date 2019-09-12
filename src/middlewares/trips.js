import models from '../models';
import { checkIfExistsInDb } from '../utils/searchDb';
import emailValidation from '../helpers/validation';

const stringRegex = /^[a-z\s-.]+$/i;

const validateTripObj = (arr, err) => {
  const dateRegex = /([0-9]{4}-|\/(0[1-9]|1[0-2])-|\(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/;
  if (!Array.isArray(arr)) {
    err.trips = 'Invalid Trips';
    return err;
  }
  if (!arr.length) {
    err.trips = 'No trip selected';
    return err;
  }
  const ans = arr.map((obj, index) => {
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
    if (!validateInteger(obj.to) && obj.to) {
      err[`trip ${index + 1} to`] = `Invalid destination id provided for the trip number ${index + 1}`;
    }
    if (!validateInteger(obj.from) && obj.from) {
      err[`trip ${index + 1} from`] = `Invalid departure location id provided for the trip number ${index + 1}`;
    }
    if (!validateInteger(obj.accommodationId) && obj.accommodationId) {
      err[`trip ${index + 1} accommodation`] = `Invalid accommodation id provided for the trip number ${index + 1}`;
    }
    if (!obj.tripDate) {
      err[`trip ${index + 1} tripDate`] = `Trip date not provided for trip ${index + 1}`;
    }
    else if (!dateRegex.test(obj.tripDate)) {
      obj.tripDate = obj.tripDate.trim();
      err[`trip ${index + 1} tripDate`] = `Invalid Trip date/time format for trip ${index + 1}`;
    } else if ((Date.parse(Date.now() - Date.parse(obj.tripDate))) < 432000000) {
      err[`trip ${index + 1} tripDate`] = `Give at least a week's notice for trip ${index + 1}`;
    }
    console.log(obj.tripdate);
    return obj;
  });
  console.log(ans)
  return ans
};
export const validateInput = async (req, res, next) => {
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
  if (!departmentId) {
    errors.department = 'No department provided';
  }
  req.body.tripType = req.body.tripType.trim();
  req.body.reason = req.body.reason.trim();
  if (!stringRegex.test(reason) && reason) {
    errors.reason = 'Invalid travel reason';
  }
  if (!typeOfTrip.includes(tripType)) {
    errors.reason = 'Invalid trip type';
  }
  if (!validateInteger(departmentId) && !errors.department) {
    errors.department = 'Invalid department provided';
  }
  const trips = await validateTripObj(req.body.trips, errors);
  if (Object.keys(errors).length) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }
  next();
};

const validateInteger = (id) => {
  if (typeof id !== 'number' && !parseInt(id, 10)) {
    return false;
  }
  return true;
};

export const setManager = async (req, res, next) => {
  try {
    const foundDepartment = await checkIfExistsInDb(models.Department, req.body.departmentId, 'Department does not exist');
    console.log(foundDepartment);
    if (foundDepartment) {
      req.managerId = foundDepartment.managerId;
    }
    next();
  } catch (error) {
    console.log(error);
  }

};


export const validateLogic = (req, res, next) => {
  req.id = req.body.userId;

  try {
    const foundRequest = models.Request.findOne({
      where: {
        requesterId: req.id,
        status: 'open'
      }
    });
    if (foundRequest.dataValues) {
      throw new Error('You still have a pending request');
    }
    const { tripType, trips } = req.body;
    if (tripType === 'oneWay' && trips.length > 1) {
      throw new Error('Single trips can only have one trip');
    }
    if (tripType === 'return' && trips.length < 1) {
      throw new Error('Return trip not provided');
    } else if (tripType === 'return' && trips.length > 2) {
      throw new Error('Return trip can only be a two way trip');
    } else if (tripType === 'return' && trips.length === 2) {
      const currentLocation = trips[0].from;
      const returningLocation = trips[1].to;
      if (currentLocation !== returningLocation) {
        throw new Error('Depature location of the initial trip must be the same as the destination of the reurn trip');
      }
    }
    if (tripType === 'multiCity' && trips.length < 2) {
      throw new Error('Multi-city must have more than a trip ');
    }
    next();
  } catch (error) {
    return res.status(422).json({
      success: false,
      message: error.message,
    });
  }
}
;