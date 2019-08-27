/* eslint-disable no-unused-vars */
import chai from 'chai';
import chaiHttp from 'chai-http';
// import Helper from '../helpers/helperUtils';

import app from '../index';

chai.use(chaiHttp);
chai.should();

const loginUrl = '/api/users/login';
let userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImZpcnN0X25hbWUiOiJUZXNzIiwibGFzdF9uYW1lIjoiR290dGxpZWIiLCJlbWFpbCI6ImFsaW1pLmttYXJ1ZkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRQUjlCZkNxeDJVQ2hBejVNNHB4bU4uT1ZweGRnWVB2dWN3and2ZXdpZkhUOS82Vi9OaUh2cSIsImNyZWF0ZWRBdCI6IjIwMTktMDgtMjZUMTk6NTA6MzQuMjA0WiIsInVwZGF0ZWRBdCI6IjIwMTktMDgtMjZUMTk6NTA6MzQuMjA0WiIsImlhdCI6MTU2Njg2MDQxOX0.G9kSz4ZiLkaf3NMKv_pJClB7NjFsMMMub38_oklopt4';

const userLoginDetails = {
  email: 'alimi.kmaruf@gmail.com',
  password: 'barefoot2019',
};

describe('Login Users', () => {
  it('should login a user', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send(userLoginDetails)
      .end((err, res) => {
        userToken = res.body.data.token;
        done();
      });
  });
  it('should return 401 for incorrect password login detail', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send({
        email: 'alimi.kmaruf@gmail.com',
        password: 'barefoot2020',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have
          .property('error');
        res.body.error.should.equal('Password does not match.');
        done();
      });
  });
});
