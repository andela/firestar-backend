import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../index';
import models from '../../../models';
import {
  requests, users, token, departments, destinations, accommodations
} from '../../../__mocks__/createRequest';

chai.use(chaiHttp);

const { assert } = chai;
const route = '/api/v1/requests';

describe.only('REQUESTS', () => {
  before(async () => {
    try {
      await models.users.sync({ force: true });
      await models.destinations.sync({ force: true });
      await models.accommodations.sync({ force: true });
      await models.departments.sync({ force: true });
      await models.requests.sync({ force: true });
      await models.trips.sync({ force: true });
      await models.users.bulkCreate(users);
      await models.destinations.bulkCreate(destinations);
      await models.accommodations.bulkCreate(accommodations);
      await models.departments.bulkCreate(departments);

    } catch (error) {
      console.log(error);
    }
  });
  after(async () => {
    await models.destinations.destroy({ where: {} });
    await models.accommodations.destroy({ where: {} });
    await models.trips.destroy({ where: {} });
    await models.requests.destroy({ where: {} });
    await models.departments.destroy({ where: {} });
    await models.users.destroy({ where: {} });
  });
  describe('Should validate token', () => {
    it('Returns 401 if no token is provided ', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', '')
        .send(requests.oneWay);

      assert.equal(res.status, 401);
      assert.equal(res.body.success, false);
    });
    it('Returns 401 for invalid Token ', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', 'hgvy565eheu3y87d2dhb2vdu62276t72gd7')
        .send(requests.oneWay);
      assert.equal(res.status, 401);
      assert.equal(res.body.success, false);
    });
  });

  describe('Should Return error non permitted roles', () => {
    it('Returns 401 if user is not permitted', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.nonRequester)
        .send(requests.oneWay);

      assert.equal(res.status, 401);
      assert.equal(res.body.success, false);
    });
    // it('Calls next for permitted role ', async () => {
    //     const res = await chai.request(server)
    //         .post(route)
    //         .set('authorization', 'hgvy565eheu3y87d2dhb2vdu62276t72gd7')
    //         .send(requests.oneWay);
    //     assert.equal(res.status, 400);
    //     assert.equal(res.body.success, false);
    //     assert.ca
    // });
  });

  describe('Should validate user input', () => {
    it('Returns 400 if no reason is provided', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester)
        .send(requests.noReason);
        console.log(res.body)
      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for invalid trip request reason ', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester)
        .send(requests.invalidReason);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for no request trip type ', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester)
        .send(requests.noTripType);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for invalid request trip type ', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester)
        .send(requests.invalidTripType);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for no department', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester)
        .send(requests.noDepartment);
      console.log(res.body);
      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for invalid department ', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester)
        .send(requests.invalidDepartment);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for no trips ', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester)
        .send(requests.noTrips);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for no trips ', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester)
        .send(requests.noTrips);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for no destination ', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester)
        .send(requests.noDestination);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
      assert.isNotNull(res.body.errors);
    });
    it('Returns 400 for invalid destination ', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester)
        .send(requests.invalidDestination);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for no departure ', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester)
        .send(requests.noDeparture);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for invalid departure ', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester)
        .send(requests.invalidDeparture);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for no accommodation Id', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester)
        .send(requests.noAccommodation);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for invalid accommodation Id ', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester)
        .send(requests.invalidAccommodation);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for no departure date', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester)
        .send(requests.noDate);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for invalid departure date', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester)
        .send(requests.invalidDate);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 if destination is the same as present location', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester)
        .send(requests.invalidReturn);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for a return trip if user is not returning from travelled location', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester)
        .send(requests.invalidReturn2);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for a return trip if no return trip was given', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester)
        .send(requests.invalidReturn3);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for a trip with past date', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester)
        .send(requests.invalidRequest);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for a trip with past date', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester)
        .send(requests.invalidRequest);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for a muti-city/return trip where all trips have the same date', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester)
        .send(requests.invalidRequest2);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
      it('Returns 400 for a one way trip having more than on trip', async () => {
          const res = await chai.request(server)
              .post(route)
              .set('authorization', token.requester)
              .send(requests.invalidOneWay);

          assert.equal(res.status, 400);
          assert.equal(res.body.success, false);
      });
      it('Returns 400 for a request without trips array', async () => {
          const res = await chai.request(server)
              .post(route)
              .set('authorization', token.requester)
              .send(requests.invalidRequest3);

          assert.equal(res.status, 400);
          assert.equal(res.body.success, false);
      });
      it('Returns 400 for a request without a trip object', async () => {
          const res = await chai.request(server)
              .post(route)
              .set('authorization', token.requester)
              .send(requests.invalidRequest4);

          assert.equal(res.status, 400);
          assert.equal(res.body.success, false);
      });
      it('Returns 400 if return trip has more than two trips', async () => {
          const res = await chai.request(server)
              .post(route)
              .set('authorization', token.requester)
              .send(requests.invalidReturn4);

          assert.equal(res.status, 400);
          assert.equal(res.body.success, false);
      });
      it('Returns 400 if multi-city trip has less than two trips', async () => {
          const res = await chai.request(server)
              .post(route)
              .set('authorization', token.requester)
              .send(requests.invalidMultiCity);

          assert.equal(res.status, 400);
          assert.equal(res.body.success, false);
      });
  });

  describe('Should Create Trip Request', () => {
    it('should create a one-way trip request', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester)
        .send(requests.oneWay);

      assert.equal(res.status, 201);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.tripType, 'oneWay');
      assert.hasAnyKeys(res.body.data, ['id', 'requesterId', 'managerId', 'trips', 'status']);
      assert.isArray(res.body.data.trips);
      assert.equal(res.body.data.trips.length, 1);
    });
    it('should create a return trip request', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester)
        .send(requests.return);

      assert.equal(res.status, 201);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.tripType, 'return');
      assert.hasAnyKeys(res.body.data, ['id', 'requesterId', 'managerId', 'trips', 'status']);
      assert.isArray(res.body.data.trips);
      assert.isAbove(res.body.data.trips.length, 1);
    });
    it('should create a multi city trip request', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester)
        .send(requests.multiCity);

      assert.equal(res.status, 201);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.tripType, 'multiCity');
      assert.hasAnyKeys(res.body.data, ['id', 'requesterId', 'managerId', 'trips', 'status']);
      assert.isArray(res.body.data.trips);
      assert.isAbove(res.body.data.trips.length, 1);
    });
  });

  describe('Should Create Trip Request', () => {
      it('should return 404 id departure does not exist', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester)
        .send(requests.nonExistentDeparture);

      assert.equal(res.status, 404);
      assert.equal(res.body.success, false);
    });
    it('should return 404 id destination does not exist', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester1)
        .send(requests.nonExistentDestination);

      assert.equal(res.status, 404);
      assert.equal(res.body.success, false);
    });
    it('should return 404 if accommodation does not exist', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(requests.noExistentAccommodation);

      assert.equal(res.status, 404);
      assert.equal(res.body.success, false);
    });
  });
});
