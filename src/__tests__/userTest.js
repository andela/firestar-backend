import chai from 'chai';
import chaiHttp from 'chai-http';
import Helper from '../helpers/helperUtils';

import app from '../index';

chai.use(chaiHttp);
// const should = chai.should();
chai.should();

const loginUrl = '/api/users/login';

const userLoginDetails = {
  email: 'alimi.kmaruf@gmail.com',
  password: 'barefoot2019',
};
let userToken = '';

describe('Login Users', () => {
  it('should login a user and generatetoken for user', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send({
        ...userLoginDetails
      })
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('first_name');
        res.body.data.should.have.property('last_name');
        res.body.data.should.have.property('email');
        userToken = res.body.data.token;
        const validUser = Helper.verifyToken(userToken, res.body.data);
        validUser.should.be.an('object');
        done();
      });
  });
  it('should return 200 for successful Login', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send({
        email: 'alimi.kmaruf@gmail.com',
        password: 'barefoot2019',
      })
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('first_name');
        res.body.data.should.have.property('last_name');
        res.body.data.should.have.property('email');
        // res.body.data.should.have.property('message');
        res.body.message.should.equal('Welcome back, your login was successful');
        done();
      });
  });

  it('should return 400 for undefined Login details', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send({
        email: '',
        password: '',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('should return 400 for undefined Login password detail', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send({
        email: 'alimi.kmaruf@gmail.com'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
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
        res.body.should.have.property('error');
        res.body.error.should.equal('Password does not match.');
        done();
      });
  });
  it('should return 401 for email not exist for login detail', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send({
        email: 'kmaruf@gmail.com',
        password: 'barefoot2019',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error');
        res.body.error.should.equal(
          'Email does not exist, Please register an account or signup'
        );
        done();
      });
  });
});
