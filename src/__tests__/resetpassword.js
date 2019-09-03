import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import moment from 'moment';
import app from '../index';
import models, { sequelize } from '../models';
import { sendResetMail, sendSignupMail } from '../services/sendMail';
import UserController from '../controllers/userController';

const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);

let request;
let { Reset, User } = models;
const { resetPassword } = UserController;

const apiVersion = '/api/v1';
const forgotPasswordURL = `${apiVersion}/users/passwords/forgot`;
const resetPasswordURL = `${apiVersion}/users/passwords/reset`;
const validId = 2;
const resetToken = '12ererfbuib23iub328o7rg8hbiuva';

// Create table and seed database
const seedTestDb = async () => {
  await models.User.create({
    email: 'youremail3@andela.com',
    role: 'passenger'
  });

  await models.User.create({
    email: 'youremail4@andela.com',
    role: 'passenger'
  });

  await models.User.create({
    email: process.env.YOUR_EMAIL,
    role: 'driver'
  });

  await models.Login.create({
    email: 'youremail3@andela.com',
    password: 'password'
  });

  await models.Login.create({
    email: 'youremail4@andela.com',
    password: 'password'
  });

  await models.Login.create({
    email: process.env.YOUR_EMAIL,
    password: process.env.SOME_PASSWORD
  });

  await models.Reset.create({
    email: 'youremail3@andela.com',
    expireTime: new Date(),
    resetToken: '$2a$10$Yc4fNidn3ih0Z0wRajFhq.AwneQLYR2RWWYQT7PGJdJj4UN1BGJ1K'
  }),

  await models.Reset.create({
    email: 'youremail4@andela.com',
    expireTime: moment
      .utc()
      .add(process.env.TOKENEXPIRY, 'seconds')
      .toLocaleString(),
    resetToken: '$2a$10$Yc4fNidn3ih0Z0wRajFhq.AwneQLYR2RWWYQT7PGJdJj4UN1BGJ1K'
  });
};

// Clear tables of seed
const clearTestDb = async () => {
  try{
    return await Promise.all(
      Object.keys(models).map((key) => {
        if (['sequelize', 'Sequelize'].includes(key)) return null;
        return models[key].destroy({ where: {}, force: true });
      })
    );
  } catch (err) {
    throw err;
  }
};

// clear database and seed data before test
before(async () => {
  try {
    return sequelize.sync({ force: false }).then(async () => {
      await clearTestDb();
      await seedTestDb();
    });
  } catch (err) {
    throw err;
  }
});

// clear database after test
after(async () => {
  sequelize.sync({ force: true });
});



describe('Forgot Password validations', () => {
  describe('POST /api/users/passwords/forgot', () => {
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

    it('should not generate reset link without a valid email', done => {
      chai
        .request(app)
        .post(`${forgotPasswordURL}`)
        .send({ email: '123xyz' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.error.email).to.be.equal('Email is invalid');
          done();
        });
    });
  });

  describe('POST /api/users/passwords/reset', () => {
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

    it('should not reset password without confirm password', done => {
      chai
        .request(app)
        .post(`${resetPasswordURL}/${validId}?token=${resetToken}`)
        .send({
          password: '123456',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.error.password).to.be.equal('Confirm password is required');
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
          expect(res).to.have.status(401);
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
          console.log(res.body);
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

describe(' Valid Forgot Password Request', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
  });

  afterEach(() => sinon.restore());

  after(() => request.close());

  const stubUser = {
    id: 2,
    email: 'youremail2@andela.com',
    role: 'passenger'
  }

  const user = {
    id: 2,
    email: 'youremail2@andela.com',
    resetToken: 'theResetToken'
  };

  const user2 = {
    id: 2,
    email: 'youremail34@andela.com',
    resetToken: 'theResetToken'
  };

  it('should send reset mail to the email of an existing user', done => {
    // stub send mail functions
    
    Reset = sinon.stub(Reset);
    User = sinon.stub(User);
    sinon.stub(sendResetMail(user, user.resetToken));

    chai
      .request(app)
      .post(`${forgotPasswordURL}`)
      .send({ email: user.email })
      .end(() => {
        done();
      });
  });
  it('should send signup mail to the email of a non user', done => {
    sinon.stub(sendSignupMail(user2.email));
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
    '12ererfbuib23iub328o7rg8hbiuva';
  const resetId = 3;
  const resetId2 = 3;

  it('should reset user password', async () => {
    chai
      .request(app)
      .post(`${resetPasswordURL}/${resetId}?token=${resetTokenLink}`)
      .send({
        password: '123456',
        confirmPassword: '123456'
      })
      .end((err, res) => {
      });
  });

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
      id: resetId,
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
      id: resetId2,
      password: 'password10',
      confirmPassword: 'password10',
      token: resetTokenLink
    });

    const res = mockResponse();
    sinon.stub(req.data, 'validReset').yields(false);

    await resetPassword(req, res);
  });
});
