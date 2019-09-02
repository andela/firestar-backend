import chai from 'chai';
import chaiHttp from 'chai-http';
import Helper from '../helpers/helperUtils';

import app from '../index';

chai.use(chaiHttp);
chai.should();

const loginUrl = '/api/v1/users/login';

const userLoginDetails = {
  email: 'example@gmail.com',
  password: 'firestar2019',
};
const userToken = '';

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
        res.body.data.should.have.property('id');
        const validUser = Helper.verifyToken(userToken, res.body.data);
        validUser.should.be.an('boolean');
        done();
      });
  });
  it('should return 200 for successful Login', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send({
        email: 'example1@gmail.com',
        password: 'firestar2019',
      })
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('id');
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
        email: 'example@gmail.com'
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
        email: 'example@gmail.com',
        password: 'barefoot2020',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error');
        res.body.error.should.equal('Incorrect password.');
        done();
      });
  });
  it('should return 401 for email not exist for login detail', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send({
        email: 'sample@gmail.com',
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
