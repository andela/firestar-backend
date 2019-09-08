import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
// import sinonchai from 'sinon-chai';

import 'chai/register-should';

import app from '../index'
import {
  userId, wrongId, updateUser, validToken,
  inValidToken2, inValidRequest, invalidSyntax,
  updateUser2
} from '../__mocks__/userMock';

chai.use(chaiHttp);
// chai.use(sinonchai)
const { expect } = chai;

const BASE_URL = '/api/v1/users';

// let request;

describe('User Profile Route', () => {
  before(async () => {
    // request = chai.request(app).keepOpen();
  });

  // afterEach(() => sinon.restore());

  describe('GET /users/:id/profile', () => {
    it('should get user details', async () => {
      const response = await chai
        .request(app)
        .get(`${BASE_URL}/${userId}/profile`)
        .set('Content-Type', 'application/json')
        .send(updateUser);
      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal('success');
      expect(response.body.message).to.equal('Succesfully found user');
    });
  });

  describe('GET /users/:id/profile', () => {
    it('It should check if user exist', async () => {
      const response = await chai
        .request(app)
        .get(`${BASE_URL}/${wrongId}/profile`)
        .set('Content-Type', 'application/json')
        .send(updateUser);
      expect(response.status).to.equal(401);
      expect(response.body.status).to.equal('error');
      expect(response.body.message).to.equal(`User with id: ${wrongId} not found`);
    });
  });

  describe('GET /users/:id/profile', () => {
    it('It should throw a not found', async () => {
      const response = await chai
        .request(app)
        .get(`${BASE_URL}/${wrongId}/profile`)
        .set('Content-Type', 'application/json')
        .send(updateUser);
      expect(response.status).to.equal(401);
      expect(response.body.status).to.equal('error');
      expect(response.body.message).to.equal(`User with id: ${wrongId} not found`);
    });
  });

  describe('GET /users/:id/profile', () => {
    it('It should throw error for invalid syntax', async () => {
      const response = await chai
        .request(app)
        .get(`${BASE_URL}/${invalidSyntax}/profile`)
        .set('Content-Type', 'application/json')
        .send(updateUser);
      expect(response.status).to.equal(500);
      expect(response.body.status).to.equal('error');
      expect(response.body.message).to.equal(`invalid input syntax for integer: "${invalidSyntax}"`);
    });
  });

  describe('PATCH /users/:id/profile', () => {
    it('It should return Provide user token', async () => {
      const response = await chai
        .request(app)
        .patch(`${BASE_URL}/${userId}/profile`)
        .set('Content-Type', 'application/json')
        .send(updateUser);
      expect(response.status).to.equal(401);
      expect(response.body.status).to.equal('error');
      expect(response.body.message).to.equal('Provide user token');
    });
  });

  describe('PATCH /users/:id/profile', () => {
    it('It should check if token is available', async () => {
      const response = await chai
        .request(app)
        .patch(`${BASE_URL}/${wrongId}/profile`)
        .set('token', '')
        .send(updateUser);
      expect(response.status).to.equal(401);
      expect(response.body.status).to.equal('error');
      expect(response.body.message).to.equal('Provide user token');
    });
  });

  describe('PATCH /users/:id/profile', () => {
    it('should update users', async () => {
      const response = await chai
        .request(app)
        .patch(`${BASE_URL}/${userId}/profile`)
        .set('token', validToken)
        .send(updateUser);
      expect(response.status).to.equal(201);
      expect(response.body.status).to.equal('success');
      expect(response.body.message).to.equal('You ve successfully updated your profile');
    });
  });

  describe('PATCH /users/:id/profile', () => {
    it('It should return Unauthorised message', async () => {
      const response = await chai
        .request(app)
        .patch(`${BASE_URL}/${wrongId}/profile`)
        .set('token', validToken)
        .send(updateUser);
      expect(response.status).to.equal(403);
      expect(response.body.status).to.equal('error');
      expect(response.body.message).to.equal('Unauthorized');
    });
  });

  describe('PATCH /users/:id/profile', () => {
    it('It should throw for invalid token', async () => {
      const response = await chai
        .request(app)
        .patch(`${BASE_URL}/${wrongId}/profile`)
        .set('token', inValidToken2)
        .send(updateUser);
      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal('error');
      expect(response.body.message).to.equal('You are not logged in');
    });
  });

  describe('PATCH /users/:id/profile', () => {
    it('It should throw undefined error', async () => {
      const response = await chai
        .request(app)
        .patch(`${BASE_URL}/${userId}/profile`)
        .set('token', validToken)
        .send(inValidRequest);
      expect(response.status).to.equal(403);
      expect(response.body.status).to.equal('error');
      expect(response.body.message).to.equal('undefined property');
    });
  });

  describe('PATCH /users/:id/profile', () => {
    it('check request body length', async () => {
      const response = await chai
        .request(app)
        .patch(`${BASE_URL}/${userId}/profile`)
        .set('token', validToken)
        .send(updateUser2);
      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal('error');
      expect(response.body.message[0]).to.equal('firstName length must be at least 2 characters long');
    });
  });
});
