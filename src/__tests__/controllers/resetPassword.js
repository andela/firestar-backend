import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import moment from 'moment';
import app from '../../index';
import models, { sequelize } from '../../models';
import { sendResetMail, sendSignupMail } from '../../services/sendMail';

const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);

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

    await models.Login.create({
        email: 'youremail3@andela.com',
        password: 'password'
    });

    await models.Login.create({
        email: 'youremail4@andela.com',
        password: 'password'
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
    try {
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
    try {
        return sequelize.sync({ force: true }).then(async () => {
            await clearTestDb();
        });
    } catch (err) {
        throw err;
    }
});

before(() => {
    chai.request(app).keepOpen();
});

afterEach(() => sinon.restore());

describe('Forgot Password Controller', () => {
    const newReset = {
        id: 2,
        email: 'youremail2@andela.com',
        resetToken: 'theResetToken'
    };

    const newReset2 = {
        id: 2,
        email: 'youremail34@andela.com',
        resetToken: 'theResetToken'
    };

    it('should send reset mail to the email of an existing user', async () => {
        // stub send mail functions
        const resetMailStub = sinon.stub(await sendResetMail());
        resetMailStub.returns(true);
        chai
            .request(app)
            .post(`${forgotPasswordURL}`)
            .send({ email: newReset.email })
            .end(async () => {
                expect(await resetMailStub).to.be.true;
            });
    });

    it('should send signup mail to the email of a non user', async () => {
        const signupMailStub = sinon.stub(await sendSignupMail());
        chai
            .request(app)
            .post(`${forgotPasswordURL}`)
            .send({ email: newReset2.email })
            .end(async (err, res) => {
                expect(await signupMailStub).to.be.true;
                expect(await signupMailStub.firstCall.args[0]).to.equal(newReset2.email);
                expect(res).to.have.status(200);
                expect(res.body.status).to.be.equal('success');
                expect(res.body.message).to.be.equal(
                    'Check your mail for further instruction'
                );
                done();
            });
    });
})

describe('Reset Password Controller', () => {
    describe('POST /api/users/passwords/reset', () => {
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

        it('should return invalid reset token if user did not request password reset', (done) => {
            chai
                .request(app)
                .post(`${resetPasswordURL}/10?token=${resetToken}`)
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
