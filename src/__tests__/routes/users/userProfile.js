// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import 'chai/register-should';

// import app from '../../../index'
// import {
//   userId, wrongId, updateUser, validToken,
//   inValidToken2, inValidRequest, invalidSyntax,
//   updateUser2
// } from '../../../__mocks__/userMock';

// chai.use(chaiHttp);

// const { expect } = chai;

// const BASE_URL = '/api/v1/users';

// describe('User Profile Route', () => {
//   describe('GET /users/:id/profile', () => {
//     it('should get user details', async () => {
//       const response = await chai
//         .request(app)
//         .get(`${BASE_URL}/${userId}/profile`)
//         .set('Content-Type', 'application/json')
//         .send(updateUser);
//       expect(response.status).to.equal(200);
//       expect(response.body.status).to.equal('success');
//       expect(response.body.message).to.equal('Succesfully found user');
//     });
//   });

//   describe('GET /users/:id/profile', () => {
//     it('It should check if user exist', async () => {
//       const response = await chai
//         .request(app)
//         .get(`${BASE_URL}/${wrongId}/profile`)
//         .set('Content-Type', 'application/json')
//         .send(updateUser);
//       expect(response.status).to.equal(401);
//       expect(response.body.status).to.equal('error');
//       expect(response.body.message).to.equal(`User with id: ${wrongId} not found`);
//     });
//   });

//   describe('GET /users/:id/profile', () => {
//     it('It should throw a not found', async () => {
//       const response = await chai
//         .request(app)
//         .get(`${BASE_URL}/${wrongId}/profile`)
//         .set('Content-Type', 'application/json')
//         .send(updateUser);
//       expect(response.status).to.equal(401);
//       expect(response.body.status).to.equal('error');
//       expect(response.body.message).to.equal(`User with id: ${wrongId} not found`);
//     });
//   });

//   describe('GET /users/:id/profile', () => {
//     it('It should throw error for invalid syntax', async () => {
//       const response = await chai
//         .request(app)
//         .get(`${BASE_URL}/${invalidSyntax}/profile`)
//         .set('Content-Type', 'application/json')
//         .send(updateUser);
//       expect(response.status).to.equal(500);
//       expect(response.body.status).to.equal('error');
//       expect(response.body.message).to.equal(`invalid input syntax for integer: "${invalidSyntax}"`);
//     });
//   });

//   describe('PATCH /users/:id/profile', () => {
//     it('It should return Provide user token', async () => {
//       const response = await chai
//         .request(app)
//         .patch(`${BASE_URL}/${userId}/profile`)
//         .set('Content-Type', 'application/json')
//         .send(updateUser);
//       expect(response.status).to.equal(401);
//       expect(response.body.status).to.equal('error');
//       expect(response.body.message).to.equal('Provide user token');
//     });
//   });

//   describe('PATCH /users/:id/profile', () => {
//     it('It should check if token is available', async () => {
//       const response = await chai
//         .request(app)
//         .patch(`${BASE_URL}/${wrongId}/profile`)
//         .set('token', '')
//         .send(updateUser);
//       expect(response.status).to.equal(401);
//       expect(response.body.status).to.equal('error');
//       expect(response.body.message).to.equal('Provide user token');
//     });
//   });

//   describe('PATCH /users/:id/profile', () => {
//     it('should update users', async () => {
//       const response = await chai
//         .request(app)
//         .patch(`${BASE_URL}/${userId}/profile`)
//         .set('token', validToken)
//         .send(updateUser);
//       expect(response.status).to.equal(201);
//       expect(response.body.status).to.equal('success');
//       expect(response.body.message).to.equal('You ve successfully updated your profile');
//     });
//   });

//   describe('PATCH /users/:id/profile', () => {
//     it('It should return Unauthorised message', async () => {
//       const response = await chai
//         .request(app)
//         .patch(`${BASE_URL}/${wrongId}/profile`)
//         .set('token', validToken)
//         .send(updateUser);
//       expect(response.status).to.equal(403);
//       expect(response.body.status).to.equal('error');
//       expect(response.body.message).to.equal('Unauthorized');
//     });
//   });

//   describe('PATCH /users/:id/profile', () => {
//     it('It should throw for invalid token', async () => {
//       const response = await chai
//         .request(app)
//         .patch(`${BASE_URL}/${wrongId}/profile`)
//         .set('token', inValidToken2)
//         .send(updateUser);
//       expect(response.status).to.equal(400);
//       expect(response.body.status).to.equal('error');
//       expect(response.body.message).to.equal('You are not logged in');
//     });
//   });

//   // describe('PATCH /users/:id/profile', () => {
//   //   it('It should throw undefined error', async () => {
//   //     const response = await chai
//   //       .request(app)
//   //       .patch(`${BASE_URL}/${userId}/profile`)
//   //       .set('token', validToken)
//   //       .send(inValidRequest);
//   //     expect(response.status).to.equal(403);
//   //     expect(response.body.status).to.equal('error');
//   //     expect(response.body.message).to.equal('undefined property');
//   //   });
//   // });

//   describe('PATCH /users/:id/profile', () => {
//     it('check request body length', async () => {
//       const response = await chai
//         .request(app)
//         .patch(`${BASE_URL}/${userId}/profile`)
//         .set('token', validToken)
//         .send(updateUser2);
//       expect(response.status).to.equal(400);
//       expect(response.body.status).to.equal('error');
//       expect(response.body.message[0]).to.equal('firstName length must be at least 2 characters long');
//     });
//   });
// });


import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../../../index';

import { jwtVerifyUserToken } from '../../../utils/index';
// import { validateData, validateProfileData } from '../../../middlewares/validation/validation';
import { jwtVerify, authorization } from '../../../middlewares/auth/auth';
// import userController from '../../../controllers/userController';
import db from '../../../models';
import { roles } from '../../../__mocks__/userRoles';
import { decode } from 'punycode';


chai.use(chaiHttp);
chai.use(sinonChai);

const { expect } = chai;

let request;
let token;
let tokenEmail;
let UserId;

describe('USER PROFILE', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
    const {
      superAdmin, travelAdmin, travelTeamMember, manager, requester
    } = roles;
    await db.roles.sync({ force: true });
    await db.users.sync({ force: true });
    await db.logins.sync({ force: true });
    await db.roles.bulkCreate([superAdmin, travelAdmin, travelTeamMember, manager, requester]);
  });

  afterEach(async () => {
    sinon.restore();
  });
  after(async () => {
    await db.logins.destroy({ where: {} });
    await db.users.destroy({ where: {} });
    await db.roles.destroy({ where: {} });
  });

  // {
  //   user:
  //   {
  //     id: 1,
  //       email: 'akps.i@yahoo.com',
  //         firstName: 'Aniefiok',
  //           lastName: 'Akpan'
  //   },
  //   iat: 1568310112
  // }

  describe('SIGN UP USER FIRST', () => {
    it('should sign up user first to get user credentials', async () => {
      const body = {
        email: 'akps.i@yahoo.com',
        firstName: 'Aniefiok',
        lastName: 'Akpan',
        password: 'ADsd23$$'
      };

      const response = await request.post(`/api/v1/users/auth/register`).send(body);

      token = response.body.data.token;

      const decodeToken = await jwtVerifyUserToken(token);
      console.log(decodeToken)
      UserId = decodeToken.user.id;

      expect(response.status).to.equal(201);
      expect(response.body).to.be.a('object');
    }).timeout(0)
  })


  describe('GET USER PROFILE', () => {
    it('should get user profile with a status of 200', async () => {

      const tokenHeader = `Bearer ${token}`

      const response = await request.get(`/api/v1/users/${UserId}/profile`)
        .set('Authorization', tokenHeader)
      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal('success');
      expect(response.body.message).to.equal('Succesfully found user');
    }).timeout(0)
  });

  describe('GET USER PROFILE', () => {
    it('should throw unauthorized error', async () => {

      const tokenHeader = `Bearer ${token}`
      const response = await request.get(`/api/v1/users/2/profile`)
        .set('Authorization', tokenHeader)
      expect(response.status).to.equal(403);
      expect(response.body.status).to.equal('error');
      expect(response.body.message).to.equal('Unauthorized');
    }).timeout(0)
  });

  describe('PATCH USER PROFILE', () => {
    it('should update user profile', async () => {
      const body = {
        firstName: 'Adewale',
        lastName: 'Olaoye',
        department: 'Mathematics'
      };
      const tokenHeader = `Bearer ${token}`
      const response = await request.patch(`/api/v1/users/${UserId}/profile`).send(body)
        .set('Authorization', tokenHeader)
      expect(response.status).to.equal(201);
      expect(response.body.status).to.equal('success');
      expect(response.body.message).to.equal('You ve successfully updated your profile');
    }).timeout(0)
  });

  describe('PATCH USER PROFILE', () => {
    it('should allow user to update his profile only', async () => {

      const tokenHeader = `Bearer ${token}`
      const response = await request.patch(`/api/v1/users/2/profile`)
        .set('Authorization', tokenHeader)
      expect(response.status).to.equal(403);
      expect(response.body.status).to.equal('error');
      expect(response.body.message).to.equal('Unauthorized');
    }).timeout(0)
  });

  describe('PATCH USER PROFILE', () => {
    it('should validate user details', async () => {
      const body = {
        firstName: 'a',
        lastName: 'Olaoye'
      };
      const tokenHeader = `Bearer ${token}`
      const response = await request.patch(`/api/v1/users/${UserId}/profile`).send(body)

        .set('Authorization', tokenHeader)
      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal('error');
      expect(response.body.message[0]).to.equal('firstName length must be at least 2 characters long');
    }).timeout(0)
  });

  // describe('VALIDATE USING JOI LIBRARY', () => {
  //   it('should validate joi schema', () => {
  //     const body = {
  //       firstName: 'a'
  //     };
  //     const response = validateData(body, validateProfileData);
  //     expect(response).to.be.a('object');
  //     expect(response).to.have.property('error').equal(null);
  //   }).timeout(0);
  // });
});
