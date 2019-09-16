import models from '../models';
import { checkIfExistsInDb } from '../utils/searchDb';
import {
  validateRequestObj, validateOnewayTrip, validateReturnTrip, validateMuticityTrip, findTripData
} from '../helpers/validation/tripValidation';

export const validateTripRequest = async (req, res, next) => {
  req.body.tripType = !req.body.tripType ? null : req.body.tripType.trim();
  req.body.reason = !req.body.reason ? null : req.body.reason.trim();
  try {
    const errors = {};
    const { tripType, reason, departmentId } = req.body;
    const requestObj = {
      reason,
      departmentId,
      tripType
    };
    validateRequestObj(requestObj, errors);
    if (tripType === 'oneWay') {
      validateOnewayTrip(req.body.trip, errors);
    } else if (tripType === 'return') {
      validateOnewayTrip(req.body.initialTrip, errors);
      validateReturnTrip(req.body.initialTrip, req.body.returnTrip, errors);
    } else if (tripType === 'multiCity') {
      validateMuticityTrip(req.body.trips, errors);
    }
    if (Object.keys(errors).length) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }
    return next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const validateTripData = async (req, res, next) => {
  const errors = {};
  try {
    const { tripType } = req.body;
    if (tripType === 'oneWay') {
      await findTripData(req.body.trip, tripType, errors, 'The selected accommodation is not available at the choosen destination');
    } else if (tripType === 'return') {
      const { initialTrip, returnTrip } = req.body;
      await findTripData(initialTrip, tripType, errors, 'The selected accommodation is not available at the choosen initial trip destination');
      await findTripData(returnTrip, tripType, errors, 'The selected accommodation is not available at the choosenreturn trip destination');
    } else if (tripType === 'multiCity') {
      const { trips } = req.body;
      const tripsPromise = trips.map(async (trip, index) => {
        await findTripData(trip, tripType, errors, `The selected accommodation for trip ${index + 1} is not available at the choosen destination`);
        return trip;
      });
      await Promise.all(tripsPromise);
    }
    if (Object.keys(errors).length) {
      return res.status(404).json({
        success: false,
        errors
      });
    }
    const foundDepartment = await checkIfExistsInDb(models.departments, req.body.departmentId, 'Department does not exist');
    if (foundDepartment) {
      req.managerId = foundDepartment.managerId;
    }
    next();
  } catch (error) {
    res.status(errors.status || 404).json({
      success: false,
      message: error.message
    });
  }
};

export const checkPreviousRequest = async (req, res, next) => {
  try {
    const foundRequest = await models.requests.findOne({
      where: {
        requesterId: req.user.id,
        status: 'open'
      }
    });
    if (foundRequest) {
      throw new Error('You still have a pending request');
    }
    return next();
  } catch (error) {
    return res.status(422).json({
      success: false,
      message: error.message,
    });
  }
};
