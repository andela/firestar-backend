import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import 'chai/register-should';

import app from '../index';
import userMock from './mocks/userMock';
chai.use(chaiHttp);
const { expect } = chai;

const BASE_URL = '/api/v1';

let request;

describe('User Profile Route', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
  });

  afterEach(() => sinon.restore());

  describe('GET /users/:id', () => {
    it('should get user details', async () => {
      const response = await chai
        .request(app)
        .patch(`${BASE_URL}/users/${userMock.userId}`)
        .set('Content-Type', 'application/json')
        .send(userMock.updateUser);
      expect(response.status).to.equal(202);
      expect(response.body.status).to.equal('success');
    });
  });

  describe('GET /users/:id', () => {
    it('It should throw error response invalid user', async () => {
      const response = await chai
        .request(app)
        .patch(`${BASE_URL}/users/${userMock.wrongId}`)
        .set('Content-Type', 'application/json')
        .send(userMock.updateUser);
      expect(response.status).to.equal(401);
      expect(response.body.status).to.equal('error');
      expect(response.body.message).to.equal(
        `User with id: ${userMock.wrongId} not found`
      );
    });
  });

  describe('PATCH /users/:id', () => {
    it('should update users profile', async () => {
      const response = await chai
        .request(app)
        .patch(`${BASE_URL}/users/${userMock.userId}`)
        .set('Content-Type', 'application/json')
        .send(userMock.updateUser);
      expect(response.status).to.equal(202);
      expect(response.body.status).to.equal('success');
      expect(response.body.data.firstName).to.equal(
        userMock.updateUser.firstName
      );
    });
  });

  describe('PATCH /users/:id', () => {
    it('It should give a successful message', async () => {
      const response = await chai
        .request(app)
        .patch(`${BASE_URL}/users/${userMock.userId}`)
        .set('Content-Type', 'application/json')
        .send(userMock.updateUser);
      expect(response.status).to.equal(202);
      expect(response.body.status).to.equal('success');
      expect(response.body.message).to.equal(
        'You ve successfully updated your profile'
      );
    });
  });

  describe('PATCH /users/:id', () => {
    it('It should throw error User is not in db', async () => {
      const response = await chai
        .request(app)
        .patch(`${BASE_URL}/users/${userMock.wrongId}`)
        .set('Content-Type', 'application/json')
        .send(userMock.updateUser);
      expect(response.status).to.equal(401);
      expect(response.body.status).to.equal('error');
      expect(response.body.message).to.equal(
        `User with id: ${userMock.wrongId} not found`
      );
    });
  });
});
