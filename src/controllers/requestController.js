import models from '../models';
/**
 * @description A class for requests
 */
export default class Requests {
  static async createTrip(req, res, next) {
    const {
      tripType, departmentId, reason, trips
    } = req.body;
    const requesterId = 'abc123@gmail.com';
    const { managerId } = req;
    try {
      const newRequest = await models.requests.create({
        tripType,
        requesterId,
        departmentId,
        managerId,
        reason
      });

      const a = trips.map(async (trip) => {
        console.log(trip);
        trip.requestId = newRequest.id;
        const createdTrip = await models.trips.create(trip);
        return createdTrip.dataValues;
      });
      const an = await Promise.all(a);
      const ab = await models.requests.findOne(
        {
          include: [
            {
              model: models.trips,
            }
          ],
          where: {
            id: newRequest.dataValues.id
          },
        }

      );
      res.send(ab);
    } catch (error) {
      console.log(error);
    }
  }

  static async getRequest(req, res, next) {
    try {
      const requests = await models.requests.findOne(
        {
          include: [
            {
              model: models.trips,
            }
          ],
          where: {
            id: 24
          }
        }
      );
      res.send(requests);
    } catch (error) {
      console.log(error);
    }
  }
}
