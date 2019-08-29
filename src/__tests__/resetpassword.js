import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import models from '../models';
import app from '../index';
import { sendResetMail, sendSignupMail } from '../services/sendMail';
import UserController from '../controllers/userController';
import { sequelize } from '../models';

const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);

const { resetPassword } = UserController;

const apiVersion = '/api/v1';
const forgotPasswordURL = `${apiVersion}/forgotpassword`;
const resetPasswordURL = `${apiVersion}/resetpassword`;
const validId = 2;
const resetToken = '12ererfbuib23iub328o7rg8hbiuva';

// Create table and seed database
const seedTestDb = async () => {
  await models.User.create({
    email: 'youremail@andela.com',
    role: 'passenger'
  });

  await models.User.create({
    email: process.env.YOUR_EMAIL,
    role: 'driver'
  });

  await models.Login.create({
    email: 'youremail@andela.com',
    password: 'password'
  });

  await models.Login.create({
    email: process.env.YOUR_EMAIL,
    password: process.env.SOME_PASSWORD
  });

  await models.Reset.create({
    email: 'youremail@andela.com',
    password: 'password'
  });
};

before(async () => {
  try {
    sequelize.sync({ force: false }).then(async () => {
      await seedTestDb();
    });
  } catch (err) {
    throw err;
  }
});

describe('Forgot Password validations', () => {
  describe('POST /api/forgetpassword', () => {
    it('should not generate reset link without an email of an existing user', done => {
      chai
        .request(app)
        .post(`${forgotPasswordURL}`)
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.error.email).to.be.equal('Email is required');
          done();
        });
    });
    it('should send reset mail to the email of an existing user', done => {
      chai
        .request(app)
        .post(`${forgotPasswordURL}`)
        .send({ email: 'youremail@andela.com' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.equal('success');
          expect(res.body.message).to.be.equal(
            'Check your mail for further instruction'
          );
          done();
        });
    });

    it('should not generate reset link without a valid email', done => {
      chai
        .request(app)
        .post(`${forgotPasswordURL}`)
        .send({ email: '123xy' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.error.email).to.be.equal('Email is invalid');
          done();
        });
    });
  });

  describe('POST /api/resetpassword', () => {
    it('should not reset password without new password from existing user', done => {
      chai
        .request(app)
        .post(`${resetPasswordURL}/${validId}?token=${resetToken}`)
        .send({ confirmPassword: '' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.error.password).to.be.equal('Password is required');
          done();
        });
    });

    it('should not reset password without valid password', done => {
      chai
        .request(app)
        .post(`${resetPasswordURL}/${validId}?token=${resetToken}`)
        .send({
          password: '1',
          confirmPassword: '1'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.error.password).to.be.equal('Password is invalid');
          done();
        });
    });

    it('should not reset password if passwords do not match', done => {
      chai
        .request(app)
        .post(`${resetPasswordURL}/${validId}?token=${resetToken}`)
        .send({
          password: 'password10',
          confirmPassword: 'password9'
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.error.password).to.be.equal('Passwords must match');
          done();
        });
    });

    it('should not reset password if reset password link is invalid', done => {
      chai
        .request(app)
        .post(`${resetPasswordURL}/${validId}?token=${resetToken}`)
        .send({
          password: 'password10',
          confirmPassword: 'password10'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.error).to.be.equal('Invalid or expired reset token');
          done();
        });
    });
    it('should return invalid reset token', done => {
      chai
        .request(app)
        .post(`${resetPasswordURL}/${validId}?token=${resetToken}`)
        .send({
          password: 'password10',
          confirmPassword: 'password10'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.error).to.be.equal('Invalid or expired reset token');
          done();
        });
    });
  });
});

describe('Forgot Password validations', () => {
  const user = {
    id: 1,
    email: 'youremail@andela.com',
    reset_token: 'theResetToken'
  };

  const user2 = {
    id: 1,
    email: 'youremail34@andela.com',
    reset_token: 'theResetToken'
  };

  it('should send reset mail to the email of an existing user', done => {
    // stub send mail functions
    const resetMailStub = sinon.stub(sendResetMail(user, user.reset_token));

    resetMailStub.yields();

    chai
      .request(app)
      .post(`${forgotPasswordURL}`)
      .send({ email: user.email })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal('success');
        expect(res.body.message).to.be.equal(
          'Check your mail for further instruction'
        );
        done();
      });
  });
  it('should send signup mail to the email of a non user', done => {
    const signupMailStub = sinon.stub(sendSignupMail(user2.email));
    signupMailStub.yields();
    chai
      .request(app)
      .post(`${forgotPasswordURL}`)
      .send({ email: user2.email })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal('success');
        expect(res.body.message).to.be.equal(
          'Check your mail for further instruction'
        );
        done();
      });
  });
});

describe('Reset Password', () => {
  const resetTokenLink =
    'bc8e65f7ac1e686746fcfac23101fd56408b1267b697c5e41d90ec26e82dd341';
  const userId = 1;
  const user2Id = 3;

  it('should reset user password', async () => {
    const mockRequest = body => {
      return {
        data: { userRequest: body.userRequest, validReset: body.validReset },
        params: { id: body.id },
        body: {
          password: body.password,
          confirmPassword: body.confirmPassword
        },
        query: { token: body.token }
      };
    };

    const mockResponse = () => {
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      return res;
    };

    const req = mockRequest({
      userRequest: true,
      validReset: true,
      id: userId,
      password: 'password10',
      confirmPassword: 'password10',
      token: resetTokenLink
    });

    const res = mockResponse();

    Object.keys(req.data).forEach(data =>
      sinon.stub(req.data, data).returnsThis(true)
    );
    sinon.stub(req.data, 'validReset').yields(true);
    await resetPassword(req, res);
  });

  it('should not reset password for user that did not request password reset', async () => {
    const mockRequest = body => {
      return {
        data: { userRequest: body.userRequest, validReset: body.validReset },
        params: { id: body.id },
        body: {
          password: body.password,
          confirmPassword: body.confirmPassword
        },
        query: { token: body.token }
      };
    };

    const mockResponse = () => {
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      return res;
    };

    const req = mockRequest({
      userRequest: false,
      validReset: true,
      id: user2Id,
      password: 'password10',
      confirmPassword: 'password10',
      token: resetTokenLink
    });

    const res = mockResponse();
    sinon.stub(req.data, 'validReset').yields(false);

    await resetPassword(req, res);
  });
});
