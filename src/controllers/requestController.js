import models from '../models';
import Response from '../utils/response';

const response = new Response();
/**
 * @description A class for requests
 */
export default class Requests {
  /**
   *
   * @param {*} req request object
   * @param {*} res response object
   * @param {*} next next method
   * @returns {object} returns response object
   */
  static async createTrip(req, res, next) {
    const {
      tripType, departmentId, reason
    } = req.body;
    const requesterId = req.user.id;
    const { managerId } = req;
    try {
      const newRequest = await models.requests.create({
        tripType,
        requesterId,
        departmentId,
        managerId,
        reason
      });
      if (tripType === 'oneWay') {
        const { trip } = req.body;
        trip.requestId = newRequest.id;
        await models.trips.create(trip);
      } else if (tripType === 'return') {
        const { initialTrip, returnTrip } = req.body;
        initialTrip.requestId = newRequest.id;
        returnTrip.requestId = newRequest.id;
        await models.trips.create(initialTrip);
        await models.trips.create(returnTrip);
      } else {
        const { trips } = req.body;
        const createdTrips = trips.map(async (trip) => {
          trip.requestId = newRequest.id;
          const createdTrip = await models.trips.create(trip);
          return createdTrip.dataValues;
        });
        await Promise.all(createdTrips);
      }
      const request = await models.requests.findOne(
        {
          include: [
            {
              model: models.trips,
              include: [models.accommodations]
            }
          ],
          where: {
            id: newRequest.dataValues.id
          },
        }
      );
      response.setSuccess(201, 'Request Created Successfully', request.dataValues);
      return response.send(res);
    } catch (error) {
      error.status = 500;
      next(error);
    }
  }
}
