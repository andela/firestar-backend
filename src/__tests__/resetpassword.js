import chai from 'chai';
import chaiHttp from 'chai-http';
import user from '../controllers/userController';
import app from '../index';

// const app = `localhost:${process.env.PORT}`;

const { expect } = chai;
chai.use(chaiHttp);

const { forgotPassword, resetPassword } = user;

const apiVersion = '/api';
const forgotPasswordURL = `${apiVersion}/forgotpassword`;
const resetPasswordURL = `${apiVersion}/resetpassword`;
const validId = 2;
const resetToken = '12ererfbuib23iub328o7rg8hbiuva';

let request;
describe('Reset Password', () => {
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

    it('should not generate reset link without a valid email', done => {
      chai
        .request(app)
        .post(`${forgotPasswordURL}`)
        .send({
          email: '123xy'
        })
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
        .send({
          confirmPassword: ''
        })
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

    // it('should not reset password if reset password link is invalid', done => {
    //   chai
    //     .request(app)
    //     .post(`${resetPasswordURL}/${validId}?token=${resetToken}`)
    //     .send({
    //       password: 'password10',
    //       confirmPassword: 'password10'
    //     })
    //     .end((err, res) => {
    //       done();
    //       expect(res).to.have.status(400);
    //       expect(res.body.status).to.be.equal('error');
    //       expect(res.body.error).to.be.equal('Invalid or expired reset token');
    //     });
    //  });
  });
});
