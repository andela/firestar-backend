import Validator from '../validation';
import models from '../../models';

export const validateTripObj = (arr, type, err) => {
  let presentLocation = '';
  let date = '';
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
    } else if (!Validator.validateInteger(obj.to) && obj.to) {
      err[`trip ${index + 1} to`] = `Invalid destination provided for the trip number ${index + 1}`;
    }
    if (!obj.from) {
      err[`trip ${index + 1} from`] = `No depature location provided for the trip number ${index + 1}`;
    } else if (!Validator.validateInteger(obj.from)) {
      err[`trip ${index + 1} from`] = `Invalid departure location id provided for the trip number ${index + 1}`;
    }
    if (!obj.accommodationId) {
      err[`trip ${index + 1} accommodation`] = `No accommodation provided for the trip number ${index + 1}`;
    } else if (!Validator.validateInteger(obj.accommodationId) && obj.accommodationId) {
      err[`trip ${index + 1} accommodation`] = `Invalid accommodation id provided for the trip number ${index + 1}`;
    }
    if (!obj.tripDate) {
      err[`trip ${index + 1} tripDate`] = `Trip date not provided for trip ${index + 1}`;
    } else if (!dateRegex.test(obj.tripDate)) {
      obj.tripDate = obj.tripDate.trim();
      err[`trip ${index + 1} tripDate`] = `Invalid Trip date/time format for trip ${index + 1}`;
    } else if (Date.parse(obj.tripDate) - Date.now() < 432000000 && index === 0) {
      err[`trip ${index + 1} tripDate`] = 'Invalid Trip Date. Give at least a week\'s notice for initial trip';
    } else if (Date.parse(obj.tripDate) - Date.parse(date) < 86400000) {
      err[`trip ${index + 1} tripDate`] = 'Invalid Trip Date. Give at least a day difference from previous trip';
    }
    if (type === 'multiCity' && presentLocation && obj.from !== presentLocation) {
      err[`trip ${index + 1} from`] = `Invalid departure Location in trip ${index + 1}`;
    } else {
      presentLocation = obj.to;
    }
    date = obj.tripDate;
    return obj;
  });
  return ans;
};


export const validateRequestObj = (body, errors) => {
  const stringRegex = /^[a-z\s]+$/i;
  const typeOfTrip = ['oneWay', 'return', 'multiCity'];
  const {
    reason, tripType, departmentId
  } = body;
  if (!reason) {
    errors.reason = 'Trip reason not provided';
  }
  if (!tripType) {
    errors.tripType = 'Type of trip not provided';
  }
  if (!departmentId) {
    errors.department = 'No department provided';
  }
  body.tripType = body.tripType.trim();
  body.reason = body.reason.trim();
  if (!stringRegex.test(reason) && reason) {
    errors.reason = 'Invalid travel reason';
  }
  if (!typeOfTrip.includes(tripType)) {
    errors.reason = 'Invalid trip type';
  }
  if (!Validator.validateInteger(departmentId) && !errors.department) {
    errors.department = 'Invalid department provided';
  }
};

export const validateTrip = (body) => {
  const { tripType, trips } = body;
  if (tripType === 'oneWay' && trips.length > 1) {
    throw new Error('One-way trips can only have one trip');
  }
  if (tripType === 'return' && trips.length < 2) {
    throw new Error('Return trip not provided');
  } else if (tripType === 'return' && trips.length > 2) {
    throw new Error('Return trip can only be a two way trip');
  } else if (tripType === 'return' && trips.length === 2) {
    const currentLocation = trips[0].from;
    const returningLocation = trips[1].to;
    const initialDestination = trips[0].to;
    const returningDestination = trips[1].from;
    if (currentLocation !== returningLocation) {
      throw new Error('Depature location of the initial trip must be the same as the destination of the return trip');
    }
    if (initialDestination !== returningDestination) {
      throw new Error('Depature location of the return trip must be the same as the destination of the initial trip');
    }
  }
  if (tripType === 'multiCity' && trips.length < 2) {
    throw new Error('Multi-city must have more than a trip ');
  }
};
