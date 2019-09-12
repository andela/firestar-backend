import models from '../models';
import { checkIfExistsInDb } from '../utils/searchDb';
import { validateTripObj, validateRequestObj, validateTrip } from '../helpers/validation/tripValidation';

// /CROSS CHECK DATE REGEX!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export const validateRequestInput = async (req, res, next) => {
  const errors = {};
  const { trips, tripType } = req.body;
  validateRequestObj(req.body, errors);
  req.body.trips = await validateTripObj(trips, tripType, errors);
  if (Object.keys(errors).length) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }
  return next();
};

export const validateTripData = async (req, res, next) => {
  try {
    const validatedData = req.body.trips.map(async (trip, index) => {
      await checkIfExistsInDb(models.accommodations, trip.accommodationId, `The accommodation in trip ${index + 1} does not exist`);
      await checkIfExistsInDb(models.destinations, trip.to, `Trip ${index + 1} destination does not exist`);
      await checkIfExistsInDb(models.destinations, trip.from, `Trip ${index + 1} departure location does not exist`);
      return trip;
    });
    await Promise.all(validatedData);
    const foundDepartment = await checkIfExistsInDb(models.departments, req.body.departmentId, 'Department does not exist');
    if (foundDepartment) {
      req.managerId = foundDepartment.managerId;
    }
    next();
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

export const validateTripInput = async (req, res, next) => {
  req.id = req.body.userId;

  try {
    const foundRequest = await models.requests.findOne({
      where: {
        requesterId: req.id,
        status: 'open'
      }
    });
    if (foundRequest) {
      throw new Error('You still have a pending request');
    }
    validateTrip(req.body);
    next();
  } catch (error) {
    return res.status(422).json({
      success: false,
      message: error.message,
    });
  }
};
