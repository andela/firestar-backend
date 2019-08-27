import chai from 'chai';
import chaiHttp from 'chai-http';
import models from '../models';
import app from '../index';

// const app = `localhost:${process.env.PORT}`;
const { expect } = chai;
chai.use(chaiHttp);

const apiVersion = '/api/v1';
const forgotPasswordURL = `${apiVersion}/forgotpassword`;
const resetPasswordURL = `${apiVersion}/resetpassword`;
const validId = 2;
const resetToken = '12ererfbuib23iub328o7rg8hbiuva';

const seedTestDb = async () => {
  await models.User.create({
    email: 'youremail@andela.com',
    role: 'passenger'
  });

  await models.Login.create({
    email: 'youremail@andela.com',
    password: 'password'
  });

  await models.Reset.create({
    email: 'youremail@andela.com',
    password: 'password'
  });
};

before(async () => {
  try {
    await seedTestDb();
  } catch (err) {
    //
  }
});

describe('Forgot Password', () => {
  // before(async () => {
  //   request = chai.request(app).keepOpen();
  // });
  // afterEach(() => sinon.restore());

  describe('POST /api/forgetpassword', () => {
    it('should not generate reset link without an email of an existing user', (done) => {
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
    it('should send reset mail to the email of an existing user', (done) => {
      chai
        .request(app)
        .post(`${forgotPasswordURL}`)
        .send({ email: 'youremail@andela.com' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.equal('success');
          expect(res.body.message).to.be.equal('Check your mail for further instruction');
          done();
        });
    });
    it('should send signup mail to the email of a non user', (done) => {
      chai
        .request(app)
        .post(`${forgotPasswordURL}`)
        .send({ email: 'youremail2@andela.com' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.equal('success');
          expect(res.body.message).to.be.equal('Check your mail for further instruction');
          done();
        });
    });

    it('should not generate reset link without a valid email', (done) => {
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
    it('should not reset password without new password from existing user', (done) => {
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

    it('should not reset password without valid password', (done) => {
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

    it('should not reset password if passwords do not match', (done) => {
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

    it('should not reset password if reset password link is invalid', (done) => {
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
    it('should return invalid reset token', (done) => {
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

describe('Reset Password', () => {
  let resetTokenLink = '';
  let userId = '';
  beforeEach(async () => {
    const res = await chai
      .request(app)
      .post(`${forgotPasswordURL}`)
      .send({ email: 'youremail@andela.com' });
    resetTokenLink = res.body.data.resetToken;
    userId = res.body.data.id;
  });
  it('should return reset user password', (done) => {
    chai
      .request(app)
      .post(`${resetPasswordURL}/${userId}?token=${resetTokenLink}`)
      .send({
        password: 'password10',
        confirmPassword: 'password10'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal('success');
        expect(res.body.message).to.be.equal('Password updated successfully');
        done();
      });
  });
});
