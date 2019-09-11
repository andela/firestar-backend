import chai from 'chai';
import chaiHttp from 'chai-http';
import sinonChai from 'sinon-chai';
import dotenv from 'dotenv';
import { sendResetMail, sendSignupMail } from '../../services/sendMail';

dotenv.config();


const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);

describe('Email services', () => {
  describe('Should fail to send mail', async () => {

    const user = {
      id: 2000000,
      email: '',
      firstName: 'Fake',
      lastName: 'Somebody'
    };
    const resetToken = '12122123afvvrerbreer';

    it('should not send reset mail if email is not provided', async () => {
      expect(await sendResetMail(user, resetToken)).to.be.equal(false);
    });

    it('should not send forgot mail if email is not provided', async () => {
      expect(await sendSignupMail(user.email)).to.be.equal(false);
    });
  });

  describe('Should send reset mail', async () => {

    const user = {
      id: 2000000,
      email: 'akp.ania@yahoo.com',
      firstName: 'Fake',
      lastName: 'Somebody'
    };
    const resetToken = '12122123afvvrerbreer';

    it('should send reset mail if email service is configured with proper information', async () => {
      expect(await sendResetMail(user, resetToken)).to.be.equal(true);
    });

    it('should send signup mail if email service is configured with proper information', async () => {
      expect(await sendSignupMail(user.email)).to.be.equal(true);
    });
  });
});
