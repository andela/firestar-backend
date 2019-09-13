import moment from 'moment';
import Validator from '../validation';
import models from '../../models';

export const validateTripObj = async (arr, type, err) => {
  let presentLocation = '';
  let date = '';
  if (!Array.isArray(arr)) {
    err.trips = 'Invalid Trips';
  }
  if (!arr.length) {
    err.trips = 'No trip selected';
  }
  const trips = arr.map(async (obj, index) => {
    const isValidDate = moment(obj.departureDate, 'YYYY-|/MM-|/DD hh:mm-ss').isValid();
    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
      err.trip = `Invalid Trip ${index + 1}`;
    }
    if (!obj.destinationLocationId) {
      err[`trip ${index + 1} destination`] = `No destination provided for the trip ${index + 1}`;
    } else if (!Validator.validateInteger(obj.destinationLocationId) && obj.destinationLocationId) {
      err[`trip ${index + 1} destination`] = `Invalid destination provided for the trip number ${index + 1}`;
    }
    if (!obj.departureLocationId) {
      err[`trip ${index + 1} departure`] = `No depature location provided for the trip number ${index + 1}`;
    } else if (!Validator.validateInteger(obj.departureLocationId)) {
      err[`trip ${index + 1} departure`] = `Invalid departure location id provided for the trip number ${index + 1}`;
    }
    if (!obj.accommodationId && type !== 'return' && index < 1) {
      err[`trip ${index + 1} accommodation`] = `No accommodation provided for the trip number ${index + 1}`;
    } else if (!Validator.validateInteger(obj.accommodationId) && obj.accommodationId) {
      err[`trip ${index + 1} accommodation`] = `Invalid accommodation id provided for the trip number ${index + 1}`;
    } else if (obj.accommodationId && type === 'return ' && index > 1) {
      err.returnTrip = 'Return trip should have no accommodation';
    }
    if (obj.departureLocationId === obj.destinationLocationId) {
      err[`trip ${index + 1}`] = 'A trip\'s destination cannot be the same as the departure location';
    }
    if (!obj.departureDate) {
      err[`trip ${index + 1} departureDate`] = `Trip date not provided for trip ${index + 1}`;
    } else {
      obj.departureDate = obj.departureDate.trim();
      if (!isValidDate) {
        err[`trip ${index + 1} departureDate`] = `Invalid Trip date/time format for trip ${index + 1}`;
      } else if (Date.parse(obj.departureDate) - Date.now() < 432000000 && index === 0) {
        err[`trip ${index + 1} departureDate`] = 'Invalid Trip Date. Give at least a week\'s notice for initial trip';
      } else if (Date.parse(obj.departureDate) - Date.parse(date) < 86400000) {
        err[`trip ${index + 1} departureDate`] = 'Invalid Trip Date. Give at least a day difference from previous trip';
      } else {
        date = obj.departureDate;
      }
    }
    if ((type === 'multiCity' || type === 'return') && presentLocation && obj.departureLocationId !== presentLocation) {
      err[`trip ${index + 1} departure`] = `Invalid departure Location in trip ${index + 1}`;
    } else {
      presentLocation = obj.destinationLocationId;
    }
    if (type !== 'return' && obj.accommodationId && index !== 1) {
      const accommodation = await models.accommodations.findOne(
        { where: { id: obj.accommodationId } }
      );
      if (accommodation && obj.destinationLocationId !== accommodation.destinationId) {
        err[`trip ${index + 1} accomodation`] = 'Selected accommodation does not belong to the trip destination';
      }
    }

    return obj;
  });
  return trips;
};


export const validateRequestObj = (body, errors) => {
  const stringRegex = /^[a-z\s]+$/i;
  const typeOfTrip = ['oneWay', 'return', 'multiCity'];
  body.tripType = !body.tripType ? null : body.tripType.trim();
  body.reason = !body.reason ? null : body.reason.trim();
  const {
    reason, departmentId, tripType
  } = body;
  if (!reason) {
    errors.reason = 'Trip reason not provided';
  } else if (!stringRegex.test(reason) && reason) {
    errors.reason = 'Invalid travel reason';
  }
  if (!tripType) {
    errors.tripType = 'Type of trip not provided';
  } else if (!typeOfTrip.includes(tripType)) {
    errors.tripType = 'Invalid trip type';
  }
  if (!departmentId) {
    errors.department = 'No department provided';
  }
  if (!Validator.validateInteger(departmentId) && !errors.department) {
    errors.department = 'Invalid department provided';
  }
  return body;
};

export const validateTrip = (body, error) => {
  const { tripType, trips } = body;
  if (tripType === 'oneWay' && trips.length > 1) {
    throw new Error('One-way trips can only have one trip');
  }
  if (tripType === 'return' && trips.length < 2) {
    error.returnTrip = 'Return trip not provided';
  } else if (tripType === 'return' && trips.length > 2) {
    error.returnTrip = 'Return trip can only be a two way trip';
  } else if (tripType === 'return' && trips.length === 2) {
    const currentLocation = trips[0].departureLocationId;
    const returningLocation = trips[1].destinationLocationId;
    const initialDestination = trips[0].destinationLocationId;
    const returningDestination = trips[1].departureLocationId;
    if (currentLocation !== returningLocation) {
      error.returnTripDeapature = 'Departure location of the initial trip must be the same as the destination of the return trip';
    }
    if (initialDestination !== returningDestination) {
      error.returnTripDestination = 'Departure location of the return trip must be the same as the destination of the initial trip';
    }
  }
  if (tripType === 'multiCity' && trips.length < 2) {
    throw new Error('Multi-city must have more than a trip ');
  }
};
