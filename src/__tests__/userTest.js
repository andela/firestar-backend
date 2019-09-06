import chai from 'chai';
import chaiHttp from 'chai-http';
import Helper from '../helpers/helperUtils';

import app from '../index';

chai.use(chaiHttp);
chai.should();

const loginUrl = '/api/v1/users/auth/login';

const userLoginDetails = {
  email: 'example1@gmail.com',
  password: 'firestar2019@K',
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
        const validUser = Helper.verifyToken(userToken);
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
        password: 'firestar2019@K',
      })
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
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
        done();
      });
  });

  it('should return 401 for incorrect password login detail', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send({
        email: 'example1@gmail.com',
        password: 'barefoot2019@Kkk',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error');
        res.body.error.should.equal('Email or password incorrect.');
        done();
      });
  });

  it('should return 400 for email not exist for login detail', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send({
        email: 'example1@gmail.com111',
        password: 'barefoot2019@K',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
