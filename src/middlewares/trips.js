import models from '../models';
import { checkIfExistsInDb } from '../utils/searchDb';
import { validateTripObj, validateRequestObj, validateTrip } from '../helpers/validation/tripValidation';

export const validateRequestInput = async (req, res, next) => {
  try {
    const errors = {};
    const { trips, tripType } = req.body;
    req.body = validateRequestObj(req.body, errors);
    validateTrip(req.body, errors);
    req.body.trips = await Promise.all(await validateTripObj(trips, tripType, errors));
    if (Object.keys(errors).length) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }
    return next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const validateTripData = async (req, res, next) => {
  try {
    const validatedData = req.body.trips.map(async (trip, index) => {
      if (req.body.tripType !== 'return' && index !== 1) {
        await checkIfExistsInDb(models.accommodations, parseInt(trip.accommodationId, 10), 'The accommodation in trip does not exist');
      }
      await checkIfExistsInDb(models.destinations, parseInt(trip.destinationLocationId, 10), 'Trip  destination does not exist');
      await checkIfExistsInDb(models.destinations, parseInt(trip.departureLocationId, 10), 'Trip  departure location does not exist');
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
