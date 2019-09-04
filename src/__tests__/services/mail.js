import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import { sendResetMail, sendSignupMail } from '../../services/sendMail';

dotenv.config();

const apiKey = process.env.SENDGRID_API_KEY;
const fakeApiKey = 'wefrfarr34tq43t543tg4';

const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);

describe('Email services', () => {
    describe('Should fail to send mail', async () => {
        beforeEach(async () => {
            try {
                sgMail.setApiKey(fakeApiKey);
            } catch (err) {
                throw err;
            }
        });

        afterEach(async () => {
            try {
                sgMail.setApiKey(apiKey);
            } catch (err) {
                throw err;
            }
        });

        const user = {
            id: 2000000,
            email: 'example@example.com',
            firstName: 'Fake',
            lastName: 'Somebody'
        };
        const resetToken = '12122123afvvrerbreer';

        it('should not send reset mail if email service is not configured with right API key', async () => {
            expect(await sendResetMail(user, resetToken)).to.be.equal(false);
        });

        it('should not send forgot mail if email service is not configured with right API key', async () => {
            expect(await sendSignupMail(user.email)).to.be.equal(false);
        });
    });

    describe('Should send reset mail', async () => {
        const newReset = {
            id: 2,
            email: 'youremail2@andela.com',
            resetToken: 'theResetToken'
        };

        const resetMailStub = sinon.stub(await sendResetMail(newReset, newReset.resetToken));
        const signupMailStub = sinon.stub(await sendSignupMail(newReset.email));
        resetMailStub.callsFake(msg => msg);

        beforeEach(() => {
            try {
                sgMail.setApiKey(apiKey);
                resetMailStub;
                signupMailStub;
            } catch (err) {
                throw err;
            }
        });
        afterEach(() => resetMailStub.restore());

        it('should send reset mail if email service is configured with right API key', async () => {
            expect(await sendResetMail(user, resetToken)).to.be.equal(true);
        });

        it('should send signup mail if email service is configured with right API key', async () => {
            expect(await sendSignupMail(user.email)).to.be.equal(true);
        });
        
    });
});
